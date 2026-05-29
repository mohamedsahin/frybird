import { NextResponse } from 'next/server';
import { getProducts, getProductBySlug, upsertProduct, normalizeProduct } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getProducts());
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const slug = (body.slug || '').toString().trim();
  const name = (body.name || '').toString().trim();
  if (!slug || !name) {
    return NextResponse.json({ error: 'Name and slug are required.' }, { status: 422 });
  }
  if (await getProductBySlug(slug)) {
    return NextResponse.json({ error: 'A product with that slug already exists.' }, { status: 409 });
  }

  const product = normalizeProduct(body);
  await upsertProduct(product);
  return NextResponse.json({ ok: true, product });
}
