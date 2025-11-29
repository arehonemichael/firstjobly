import { getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";
import AdSlot from "../../../components/AdSlot";

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
      {/* Logo */}
      {job.logo && (
        <div className="mb-3">
          <img
            src={job.logo}
            alt="Company Logo"
            className="h-16 object-contain"
          />
        </div>
      )}

      {/* Title + meta */}
      <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
      <p className="text-gray-600 mb-4">
        {job.category} · {job.location}
      </p>

      {/* AD 1 – directly in flow, no border box */}
      <AdSlot
        slot="2290721371"
        layout="in-article"
        responsive
        style={{ display: "block", minHeight: 250, margin: "16px 0" }}
      />

      {/* Requirements */}
      {job.requirements && (
        <div className="mb-4">
          <h2 className="font-semibold">Requirements:</h2>
          <p className="text-sm whitespace-pre-line">{job.requirements}</p>
        </div>
      )}

      {/* AD 2 – mid-content */}
      <AdSlot
        slot="4489509306"
        layout="in-article"
        responsive
        style={{ display: "block", minHeight: 250, margin: "16px 0" }}
      />

      {/* Description */}
      <div className="mb-4">
        <h2 className="font-semibold">Description:</h2>
        <p className="text-sm whitespace-pre-line">
          {job.description || "No description provided."}
        </p>
      </div>

      {/* Company + Apply */}
      <div className="text-sm mb-4">
        {job.company && (
          <p>
            <strong>Company:</strong> {job.company}
          </p>
        )}
        {job.link && (
          <div className="mt-3">
            <ApplyButton link={job.link} />
          </div>
        )}
      </div>

      {/* AD 3 – near bottom */}
      <AdSlot
        slot="8280865915"
        layout="in-article"
        responsive
        style={{ display: "block", minHeight: 250, margin: "16px 0" }}
      />
    </main>
  );
}
