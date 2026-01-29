import JobsClient from "./JobsClient";
import { getJobsListing } from "../../lib/jobs";

// ✅ OPTIMIZED: Cache for 5 minutes
export const revalidate = 300;

// ✅ IMPORTANT: Enable static generation for instant loading
export const dynamic = 'force-static';

// ✅ Add metadata
export async function generateMetadata() {
  return {
    title: "Browse Jobs - Internships, Learnerships & Graduate Jobs | FirstJobly",
    description: "Browse the latest internships, learnerships, bursaries, and entry-level jobs in South Africa. Find opportunities for graduates and youth.",
  };
}

export default async function JobsPage({ searchParams }) {
  // ✅ Use optimized listing function
  const allJobs = await getJobsListing();

  return <JobsClient allJobs={allJobs} searchParams={searchParams} />;
}