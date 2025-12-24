// middleware.js
import { NextResponse } from 'next/server';
import { getJobById } from './lib/jobs';

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Match old ID URLs: /jobs/ followed by 20+ alphanumeric chars (Firestore IDs)
  const idMatch = pathname.match(/^\/jobs\/([A-Za-z0-9]{20,})$/);
  if (idMatch) {
    const id = idMatch[1];
    const job = await getJobById(id);

    if (job && job.slug) {
      const newUrl = new URL(`/jobs/${job.slug}`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  return NextResponse.next();
}

// IMPORTANT: Run middleware on Node.js runtime (not Edge)
export const config = {
  matcher: '/jobs/:path*',
  // This forces Node.js runtime (allows Firestore)
  runtime: 'nodejs',
};