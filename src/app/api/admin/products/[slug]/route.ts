import { NextResponse } from 'next/server';
import { getProductBySlug, upsertProduct, deleteProduct, normalizeProduct } from '@/lib/store';
import { isUploadThingUrl } from '@/lib/media';

export const dynamic = 'force-dynamic';

export async function PUT(req, { params }) {
  const originalSlug = params.slug;
  const existing = await getProductBySlug(originalSlug);
  if (!existing) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const newSlug = (body.slug || originalSlug).toString().trim();
  if (!newSlug || !(body.name || '').toString().trim()) {
    return NextResponse.json({ error: 'Name and slug are required.' }, { status: 422 });
  }
  // If slug changed, make sure the new one is free.
  if (newSlug !== originalSlug && (await getProductBySlug(newSlug))) {
    return NextResponse.json({ error: 'A product with that slug already exists.' }, { status: 409 });
  }

  const product = normalizeProduct({ ...body, slug: newSlug });
  if (product.img && !isUploadThingUrl(product.img)) {
    return NextResponse.json(
      { error: 'Product images must be uploaded to UploadThing.' },
      { status: 422 }
    );
  }
  await upsertProduct(product, originalSlug);
  return NextResponse.json({ ok: true, product });
}

export async function DELETE(req, { params }) {
  const existing = await getProductBySlug(params.slug);
  if (!existing) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }
  await deleteProduct(params.slug);
  return NextResponse.json({ ok: true });
}
