import JobsClient from "./JobsClient";
import { getJobs } from "../../lib/jobs";

export const dynamic = "force-dynamic";

export default async function JobsPage({ searchParams }) {
  const allJobsRaw = await getJobs();

  const allJobs = allJobsRaw.map((job) => ({
    ...job,
    // createdAt is already a JS Date from getJobs(), no need to convert again
    createdAt: job.createdAt || null,
  }));

  return <JobsClient allJobs={allJobs} searchParams={searchParams} />;
}
