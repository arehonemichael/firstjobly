import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only run on /jobs/*
  if (!pathname.startsWith('/jobs/')) {
    return NextResponse.next();
  }

  const slug = pathname.replace('/jobs/', '');

  // Firebase-style IDs: long, random, no hyphens
  const isOldFirebaseId =
    slug.length > 20 && !slug.includes('-');

  if (isOldFirebaseId) {
    // Let the page handle redirect logic
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/jobs/:path*'],
};
