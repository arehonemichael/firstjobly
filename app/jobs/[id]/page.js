// app/jobs/[id]/page.js  ← Permanent redirect for old URLs
import { redirect } from 'next/navigation';
import { getJobById } from '@/lib/jobs';  // or '../../../lib/jobs'

export default async function OldJobRedirect({ params }) {
  const job = await getJobById(params.id);

  if (job && job.slug) {
    redirect(`/jobs/${job.slug}`, 'permanent'); // 301 redirect
  } else {
    redirect('/jobs'); // or notFound() for 404
  }
}