import { getJobs } from "../../../lib/jobs";

export default async function CategoryPage({ params }) {
  const allJobs = await getJobs();
  const filtered = allJobs.filter(
    (job) => job.category.toLowerCase() === params.category.toLowerCase()
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Jobs in {params.category}
      </h1>

      {filtered.length === 0 ? (
        <p>No jobs found in this category.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
