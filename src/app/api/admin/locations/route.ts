import { NextResponse } from 'next/server';
import { getLocationBySlug, upsertLocation, normalizeLocation } from '@/lib/store';
import { isUploadThingUrl } from '@/lib/media';

export const dynamic = 'force-dynamic';

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
  if (await getLocationBySlug(slug)) {
    return NextResponse.json({ error: 'A location with that slug already exists.' }, { status: 409 });
  }

  const location = normalizeLocation(body);
  if (location.img && !isUploadThingUrl(location.img)) {
    return NextResponse.json(
      { error: 'Location images must be uploaded to UploadThing.' },
      { status: 422 }
    );
  }

  await upsertLocation(location);
  return NextResponse.json({ ok: true, location });
}
