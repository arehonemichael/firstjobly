import { NextResponse } from 'next/server';

// Optional: blocklist for known abusive IPs
const BLOCKED_IPS = [
  '1.2.3.4', // example IP
  '5.6.7.8',
];

// Allow Googlebot to crawl sitemaps
const ALLOWED_BOTS = [
  'Googlebot',
  'Bingbot',
];

export function middleware(req) {
  const url = req.nextUrl.clone();
  const ua = req.headers.get('user-agent') || '';
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip;

  // 1️⃣ Allow sitemap access and bots
  if (url.pathname.startsWith('/sitemap') || ALLOWED_BOTS.some(bot => ua.includes(bot))) {
    return NextResponse.next();
  }

  // 2️⃣ Block known abusive IPs
  if (BLOCKED_IPS.includes(ip)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 3️⃣ Simple bot detection: require browser-like User-Agent
  if (!ua.includes('Mozilla')) {
    return new NextResponse('Bots not allowed', { status: 403 });
  }

  // 4️⃣ Optional: rate-limit requests (example: 10 req/min per IP)
  // Implement server-side in API or use Vercel Edge Functions / Redis to track IP counters

  return NextResponse.next();
}

// Apply to all paths except _next/static assets
export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
};
