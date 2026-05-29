import { NextResponse } from 'next/server';
import { utapi } from '@/lib/uploadthing-server';

// Guarded by middleware.ts (everything under /api/admin requires a session).
export const dynamic = 'force-dynamic';

export async function DELETE(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const key = (body?.key || '').toString().trim();
  if (!key) {
    return NextResponse.json({ error: 'A file key is required.' }, { status: 422 });
  }

  try {
    await utapi.deleteFiles([key]);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete file.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
