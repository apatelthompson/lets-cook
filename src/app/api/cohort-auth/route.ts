import { NextRequest, NextResponse } from 'next/server';

async function sign(level: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(level));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const secret = process.env.COHORT_SECRET;
  const p101 = process.env.COHORT_101_PASSWORD;
  const p201 = process.env.COHORT_201_PASSWORD;

  if (!secret) return NextResponse.json({ error: 'misconfigured' }, { status: 500 });

  let level: string | null = null;
  if (p101 && password === p101) level = '101';
  else if (p201 && password === p201) level = '201';

  if (!level) return NextResponse.json({ error: 'wrong password' }, { status: 401 });

  const token = `${level}.${await sign(level, secret)}`;
  const res = NextResponse.json({ level });
  res.cookies.set('cohort-token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('cohort-token', '', { maxAge: 0, path: '/' });
  return res;
}
