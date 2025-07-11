import { getJobById } from "../../../lib/jobs";

export default async function JobDetailPage({ params }) {
  const job = await getJobById(params.id);

  if (!job) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p>This job may have been removed or doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="bg-white max-w-3xl mx-auto p-6 rounded shadow mt-6">
      {job.logo && (
        <div className="mb-4">
          <img src={job.logo} alt="Company Logo" className="h-16 object-contain" />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.category} · {job.location}
      </p>

      {job.requirements && (
        <div className="mb-4">
          <h2 className="font-semibold">Requirements:</h2>
          <p className="text-sm whitespace-pre-line">{job.requirements}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-semibold">Description:</h2>
        <p className="text-sm whitespace-pre-line">
          {job.description || "No description provided."}
        </p>
      </div>

      <div className="text-sm mb-4">
        {job.company && <p><strong>Company:</strong> {job.company}</p>}
        {job.link && (
          <p className="mt-2">
            <a
              href={job.link}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
