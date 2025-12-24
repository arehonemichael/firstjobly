// app/api/old-id-redirect/route.js
import { NextResponse } from 'next/server';
import { getJobById } from '../../../lib/jobs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || id.length < 20) {
    return NextResponse.redirect(new URL('/jobs', request.url));
  }

  const job = await getJobById(id);

  if (job && job.slug) {
    return NextResponse.redirect(new URL(`/jobs/${job.slug}`, request.url), 301);
  }

  // If job not found, go to jobs list
  return NextResponse.redirect(new URL('/jobs', request.url));
}