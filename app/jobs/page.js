"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getJobs } from "../../lib/jobs";
import { formatDistanceToNow } from "date-fns";

const JOBS_PER_PAGE = 7;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const allJobs = await getJobs();
      let filtered = allJobs;

      if (category) {
        filtered = allJobs.filter((job) => job.category === category);
      }

      const start = (page - 1) * JOBS_PER_PAGE;
      const paginated = filtered.slice(start, start + JOBS_PER_PAGE);

      setJobs(paginated);
      setLoading(false);
    }

    fetchJobs();
  }, [category, page]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Browse Jobs</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <>
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-4 shadow rounded mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.category} · {job.location}
                  </p>

                  {job.requirements && (
                    <p className="text-sm mt-1">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  )}

                  {job.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Posted{" "}
                      {formatDistanceToNow(
                        job.createdAt.toDate ? job.createdAt.toDate() : new Date(job.createdAt),
                        { addSuffix: true }
                      )}
                    </p>
                  )}
                </div>

                {job.logo && (
                  <div className="w-16 h-16 ml-4">
                    <img
                      src={job.logo}
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <Link
                href={`/jobs/${job.id}`}
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
