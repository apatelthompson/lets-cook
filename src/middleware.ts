import { NextRequest, NextResponse } from 'next/server';

// Routes → required cohort level
const PROTECTED: Array<[string, string]> = [
  ['/ai-with-friends/cohort/201', '201'],
  ['/ai-with-friends/cohort/101', '101'],
  ['/ai-with-friends/day-1', '101'],
];

async function verifyToken(token: string, secret: string): Promise<string | null> {
  const dot = token.indexOf('.');
  if (dot < 1) return null;
  const level = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const sigBytes = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(level));
    return valid ? level : null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const match = PROTECTED.find(([prefix]) => path === prefix || path.startsWith(prefix + '/'));
  if (!match) return NextResponse.next();

  const [, requiredLevel] = match;
  const secret = process.env.COHORT_SECRET;
  const token = req.cookies.get('cohort-token')?.value;

  if (!secret || !token) {
    return NextResponse.redirect(new URL('/ai-with-friends/cohort', req.url));
  }

  const level = await verifyToken(token, secret);
  if (level !== requiredLevel) {
    return NextResponse.redirect(new URL('/ai-with-friends/cohort', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/ai-with-friends/cohort/101/:path*',
    '/ai-with-friends/cohort/201/:path*',
    '/ai-with-friends/day-1',
    '/ai-with-friends/day-1/:path*',
  ],
};
