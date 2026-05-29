import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');

function normalizeProduct(input) {
  return {
    slug: String(input?.slug || '').trim(),
    cat: String(input?.cat || 'chicken').trim(),
    name: String(input?.name || '').trim(),
    tag: String(input?.tag || '').trim(),
    price: Number(input?.price) || 0,
    heat: Math.max(0, Math.min(5, Number(input?.heat) || 0)),
    img: input?.img ? String(input.img).trim() : null,
    blurb: String(input?.blurb || '').trim(),
    description: String(input?.desc || '').trim(),
    facts: Array.isArray(input?.facts)
      ? input.facts.map((f) => String(f).trim()).filter(Boolean)
      : [],
  };
}

async function main() {
  let raw = [];
  if (fs.existsSync(productsFile)) {
    raw = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  }

  if (!Array.isArray(raw) || raw.length === 0) {
    console.log('No products found in data/products.json. Skipping seed.');
    return;
  }

  const rows = raw.map(normalizeProduct).filter((p) => p.slug && p.name);

  for (const p of rows) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        cat: p.cat,
        name: p.name,
        tag: p.tag,
        price: p.price,
        heat: p.heat,
        img: p.img,
        blurb: p.blurb,
        description: p.description,
        facts: p.facts,
      },
      create: p,
    });
  }

  console.log(`Seeded ${rows.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
