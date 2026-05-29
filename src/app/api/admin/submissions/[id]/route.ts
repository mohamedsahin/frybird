import { NextResponse } from 'next/server';
import { updateSubmission, deleteSubmission } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function PATCH(req, { params }) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    body = {};
  }
  const patch: { read?: boolean } = {};
  if (typeof body.read === 'boolean') patch.read = body.read;
  const updated = await updateSubmission(params.id, patch);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, submission: updated });
}

export async function DELETE(req, { params }) {
  await deleteSubmission(params.id);
  return NextResponse.json({ ok: true });
}
