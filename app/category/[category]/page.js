import { getJobs } from "@/lib/jobs";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const jobs = await getJobs();
  const category = decodeURIComponent(params.category);

  const filteredJobs = jobs.filter(
    (job) => job.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Jobs in: {category}</h1>

      {filteredJobs.length === 0 ? (
        <p>No jobs found for this category.</p>
      ) : (
        <ul className="space-y-6">
          {filteredJobs.map((job) => (
            <li key={job.id} className="border p-4 rounded shadow">
              <Link href={`/jobs/${job.id}`}>
                <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                  {job.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-600">
                {job.category} · {job.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
