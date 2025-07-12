import JobsClient from "./JobsClient";
import { getJobs } from "../../lib/jobs";

export const dynamic = "force-dynamic";

export default async function JobsPage({ searchParams }) {
  const rawJobs = await getJobs();

  const allJobs = rawJobs.map((job) => ({
    ...job,
    createdAt: job.createdAt?.toMillis?.() || null, // Convert Firestore Timestamp to number
  }));

  return <JobsClient allJobs={allJobs} searchParams={searchParams} />;
}
