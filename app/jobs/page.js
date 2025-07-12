import Link from "next/link";
import { getJobs } from "../../lib/jobs";

export const dynamic = "force-dynamic"; // Force fresh fetch on deploy/live

// Helper: Convert Firestore timestamp to "x days ago"
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days < 1) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default async function JobsPage({ searchParams }) {
  const allJobs = await getJobs();
  const page = parseInt(searchParams?.page || "1");
  const perPage = 10;
  const totalPages = Math.ceil(allJobs.length / perPage);
  const start = (page - 1) * perPage;
  const jobs = allJobs.slice(start, start + perPage);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center py-12">No jobs found.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => {
            const date = job.createdAt?.toDate?.();
            const posted = date ? timeAgo(date) : "Unknown";

            return (
              <article
                key={job.id}
                className="border p-4 rounded shadow flex items-center justify-between"
              >
                <div>
                  <Link href={`/jobs/${job.id}`}>
                    <h2 className="text-lg font-semibold hover:underline">
                      {job.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {job.company} · {posted}
                  </p>
                </div>
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-10 w-10 object-contain"
                  />
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/jobs?page=${i + 1}`}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
