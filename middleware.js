// middleware.js
import { NextResponse } from 'next/server';
import { getJobById } from './lib/jobs'; // adjust path if needed

export async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Match old ID URLs: /jobs/someLongId
  const idMatch = pathname.match(/^\/jobs\/([A-Za-z0-9]{20,})$/);
  if (idMatch) {
    const id = idMatch[1];
    const job = await getJobById(id);

    if (job && job.slug) {
      const newUrl = new URL(`/jobs/${job.slug}`, request.url);
      return NextResponse.redirect(newUrl, 301); // Permanent redirect
    }
  }

  return NextResponse.next();
}

// Only run on /jobs/* paths
export const config = {
  matcher: '/jobs/:path*',
};