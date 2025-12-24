import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/jobs/')) {
    const slug = pathname.split('/jobs/')[1];

    if (slug && slug.length > 20 && !slug.includes('-')) {
      return NextResponse.rewrite(new URL(`/jobs/${slug}`, req.url));
    }
  }
}
