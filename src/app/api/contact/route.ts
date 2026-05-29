import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/store';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const message = (body.message || '').toString().trim();
  const topic = (body.topic || 'General').toString().trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 422 });
  }

  const item = await addSubmission({ name, email, topic, message });
  return NextResponse.json({ ok: true, id: item.id });
}
