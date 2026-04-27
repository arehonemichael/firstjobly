import JobsClient from "./JobsClient";
import { getJobsListing } from "../../lib/jobs";

// Fetch fresh data on every request — prevents empty jobs at night
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return {
    title: "Browse Jobs - Internships, Learnerships & Graduate Jobs | FirstJobly",
    description: "Browse the latest internships, learnerships, bursaries, and entry-level jobs in South Africa. Find opportunities for graduates and youth.",
  };
}

export default async function JobsPage({ searchParams }) {
  try {
    const allJobs = await getJobsListing();
    return <JobsClient allJobs={allJobs} searchParams={searchParams} />;
  } catch (error) {
    console.error('Failed to load jobs:', error);
    return <JobsClient allJobs={[]} searchParams={searchParams} />;
  }
}