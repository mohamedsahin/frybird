import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PRODUCTS } from '@/data/menu';
import type { Product, Submission } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

type GlobalDb = typeof globalThis & {
  __frybirdInitPromise?: Promise<void>;
};

const globalDb = globalThis as GlobalDb;

type ProductInput = Omit<Partial<Product>, 'facts'> & { facts?: unknown };

function normalizeFacts(facts: unknown): string[] {
  if (Array.isArray(facts)) {
    return facts.map((f) => String(f).trim()).filter(Boolean);
  }
  if (typeof facts === 'string') {
    return facts.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

// Single source of truth for product shaping — shared with the API routes so
// the two normalization paths can't drift apart.
export function normalizeProduct(input: ProductInput): Product {
  return {
    slug: (input.slug || '').toString().trim(),
    cat: (input.cat || 'chicken').toString().trim(),
    name: (input.name || '').toString().trim(),
    tag: (input.tag || '').toString().trim(),
    price: Number(input.price) || 0,
    heat: Math.max(0, Math.min(5, Number(input.heat) || 0)),
    img: input.img ? input.img.toString().trim() : null,
    blurb: (input.blurb || '').toString().trim(),
    desc: (input.desc || '').toString().trim(),
    facts: normalizeFacts(input.facts),
  };
}

// Maps a normalized Product to the Prisma column shape (desc -> description).
function productData(p: Product) {
  return {
    cat: p.cat,
    name: p.name,
    tag: p.tag,
    price: p.price,
    heat: p.heat,
    img: p.img,
    blurb: p.blurb,
    description: p.desc,
    facts: p.facts,
  };
}

function jsonToFacts(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v).trim()).filter(Boolean);
}

function rowToProduct(row: {
  slug: string;
  cat: string;
  name: string;
  tag: string;
  price: number;
  heat: number;
  img: string | null;
  blurb: string;
  description: string;
  facts: unknown;
}): Product {
  return normalizeProduct({
    slug: row.slug,
    cat: row.cat,
    name: row.name,
    tag: row.tag,
    price: row.price,
    heat: row.heat,
    img: row.img,
    blurb: row.blurb,
    desc: row.description,
    facts: jsonToFacts(row.facts),
  });
}

function readLegacyProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const raw = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
      if (Array.isArray(raw) && raw.length > 0) {
        return raw.map((p) => normalizeProduct(p));
      }
    }
  } catch (e) {
    // ignore parse failures and fall back to defaults
  }
  return DEFAULT_PRODUCTS.map((p) => normalizeProduct(p));
}

async function ensureInitialized() {
  if (!globalDb.__frybirdInitPromise) {
    globalDb.__frybirdInitPromise = initializeData();
  }
  await globalDb.__frybirdInitPromise;
}

async function initializeData() {
  const count = await prisma.product.count();
  if (count > 0) return;

  const seed = readLegacyProducts();
  if (seed.length === 0) return;

  await prisma.$transaction(
    seed.map((p) =>
      prisma.product.upsert({
        where: { slug: p.slug },
        update: productData(p),
        create: { slug: p.slug, ...productData(p) },
      })
    )
  );
}

export async function getProducts(): Promise<Product[]> {
  await ensureInitialized();
  const rows = await prisma.product.findMany({
    orderBy: [{ createdAt: 'asc' }, { slug: 'asc' }],
  });
  return rows.map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureInitialized();
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? rowToProduct(row) : null;
}

export async function saveProducts(list: Product[]) {
  await ensureInitialized();
  const normalized = list.map(normalizeProduct);
  const slugs = normalized.map((p) => p.slug);

  await prisma.$transaction(async (tx) => {
    // Remove only the rows that are no longer present, so surviving products
    // keep their original createdAt (and thus their ordering).
    if (slugs.length === 0) {
      await tx.product.deleteMany();
      return;
    }
    await tx.product.deleteMany({ where: { slug: { notIn: slugs } } });

    // Upsert (not createMany) so existing rows are updated in place and
    // duplicate slugs in the input collapse to last-wins instead of a PK error.
    for (const p of normalized) {
      await tx.product.upsert({
        where: { slug: p.slug },
        update: productData(p),
        create: { slug: p.slug, ...productData(p) },
      });
    }
  });
}

export async function upsertProduct(product: Product, originalSlug?: string): Promise<Product> {
  await ensureInitialized();
  const p = normalizeProduct(product);

  if (originalSlug && originalSlug !== p.slug) {
    await prisma.$transaction(async (tx) => {
      const existingNew = await tx.product.findUnique({ where: { slug: p.slug } });
      if (existingNew) {
        throw new Error('A product with that slug already exists.');
      }

      const updated = await tx.product.updateMany({
        where: { slug: originalSlug },
        data: { slug: p.slug, ...productData(p) },
      });

      if (updated.count === 0) {
        await tx.product.create({
          data: { slug: p.slug, ...productData(p) },
        });
      }
    });

    return p;
  }

  await prisma.product.upsert({
    where: { slug: p.slug },
    update: productData(p),
    create: { slug: p.slug, ...productData(p) },
  });

  return p;
}

export async function deleteProduct(slug: string) {
  await ensureInitialized();
  await prisma.product.deleteMany({ where: { slug } });
}

export async function getSubmissions(): Promise<Submission[]> {
  await ensureInitialized();
  const rows = await prisma.submission.findMany({
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
  });
  return rows.map((row) => ({
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    read: row.read,
    name: row.name,
    email: row.email,
    topic: row.topic,
    message: row.message,
  }));
}

export async function addSubmission(data: Partial<Submission>): Promise<Submission> {
  await ensureInitialized();
  const item: Submission = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    createdAt: new Date().toISOString(),
    read: false,
    name: (data.name || '').toString(),
    email: (data.email || '').toString(),
    topic: (data.topic || 'General').toString(),
    message: (data.message || '').toString(),
  };

  await prisma.submission.create({
    data: {
      id: item.id,
      createdAt: new Date(item.createdAt),
      read: item.read,
      name: item.name,
      email: item.email,
      topic: item.topic,
      message: item.message,
    },
  });

  return item;
}

export async function updateSubmission(id: string, patch: Partial<Submission>): Promise<Submission | null> {
  await ensureInitialized();

  const existing = await prisma.submission.findUnique({ where: { id } });
  if (!existing) return null;

  const updated = await prisma.submission.update({
    where: { id },
    data: {
      ...(typeof patch.read === 'boolean' ? { read: patch.read } : {}),
    },
  });

  return {
    id: updated.id,
    createdAt: updated.createdAt.toISOString(),
    read: updated.read,
    name: updated.name,
    email: updated.email,
    topic: updated.topic,
    message: updated.message,
  };
}

export async function deleteSubmission(id: string) {
  await ensureInitialized();
  await prisma.submission.deleteMany({ where: { id } });
}
