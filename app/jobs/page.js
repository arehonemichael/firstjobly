import { getJobs } from "../../lib/jobs";
import Link from "next/link";

export default async function JobsPage({ searchParams }) {
  const allJobs = await getJobs();
  const categoryFilter = searchParams.category;
  const jobs = categoryFilter
    ? allJobs.filter(
        (job) => job.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    : allJobs;

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {categoryFilter
          ? `Jobs in ${categoryFilter}`
          : "All Available Jobs"}
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
  <div
    key={job.id}
    className="border p-4 rounded shadow flex items-center justify-between"
  >
    <div>
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-blue-600">{job.category}</p>
      <Link
        href={`/jobs/${job.id}`}
        className="text-blue-700 hover:underline text-sm"
      >
        View Details
      </Link>
    </div>
    <img
      src={job.logo}
      alt={`${job.company} logo`}
      className="w-12 h-12 object-contain ml-4"
    />
  </div>
))}

       
        </div>
      )}
    </main>
  );
}
