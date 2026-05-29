import { NextResponse } from 'next/server';
import { getLocationBySlug, upsertLocation, deleteLocation, normalizeLocation } from '@/lib/store';
import { isUploadThingUrl } from '@/lib/media';

export const dynamic = 'force-dynamic';

export async function PUT(req, { params }) {
  const originalSlug = params.slug;
  const existing = await getLocationBySlug(originalSlug);
  if (!existing) {
    return NextResponse.json({ error: 'Location not found.' }, { status: 404 });
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
  if (newSlug !== originalSlug && (await getLocationBySlug(newSlug))) {
    return NextResponse.json({ error: 'A location with that slug already exists.' }, { status: 409 });
  }

  const location = normalizeLocation({ ...body, slug: newSlug });
  if (location.img && !isUploadThingUrl(location.img)) {
    return NextResponse.json(
      { error: 'Location images must be uploaded to UploadThing.' },
      { status: 422 }
    );
  }

  await upsertLocation(location, originalSlug);
  return NextResponse.json({ ok: true, location });
}

export async function DELETE(req, { params }) {
  const existing = await getLocationBySlug(params.slug);
  if (!existing) {
    return NextResponse.json({ error: 'Location not found.' }, { status: 404 });
  }
  await deleteLocation(params.slug);
  return NextResponse.json({ ok: true });
}
