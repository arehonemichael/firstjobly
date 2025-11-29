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
    <main className="bg-white max-w-3xl mx-auto p-6 rounded shadow mt-6 space-y-6">
      {/* Logo */}
      {job.logo && (
        <div className="mb-2">
          <img
            src={job.logo}
            alt="Company Logo"
            className="h-16 object-contain"
          />
        </div>
      )}

      {/* Title + meta */}
      <div>
        <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
        <p className="text-gray-600">
          {job.category} · {job.location}
        </p>
      </div>

      {/* 🔹 AD 1 – high-visibility, after title */}
      <div className="border rounded-md p-2">
        <AdSlot
          slot="2290721371"        // use one of your display slots
          layout="in-article"
          responsive
          style={{ display: "block", minHeight: 250 }}
        />
      </div>

      {/* Requirements */}
      {job.requirements && (
        <section className="space-y-2">
          <h2 className="font-semibold">Requirements:</h2>
          <p className="text-sm whitespace-pre-line">
            {job.requirements}
          </p>
        </section>
      )}

      {/* 🔹 AD 2 – mid-content, strong RPM position */}
      <div className="border rounded-md p-2">
        <AdSlot
          slot="4489509306"        // another slot (or reuse if needed)
          layout="in-article"
          responsive
          style={{ display: "block", minHeight: 250 }}
        />
      </div>

      {/* Description */}
      <section className="space-y-2">
        <h2 className="font-semibold">Description:</h2>
        <p className="text-sm whitespace-pre-line">
          {job.description || "No description provided."}
        </p>
      </section>

      {/* Company + Apply */}
      <section className="text-sm space-y-2">
        {job.company && (
          <p>
            <strong>Company:</strong> {job.company}
          </p>
        )}

        {job.link && (
          <div className="mt-2">
            <ApplyButton link={job.link} />
          </div>
        )}
      </section>

      {/* 🔹 AD 3 – exit ad near bottom */}
      <div className="border rounded-md p-2">
        <AdSlot
          slot="8280865915"        // e.g. your autorelaxed/feed slot
          layout="in-article"
          responsive
          style={{ display: "block", minHeight: 250 }}
        />
      </div>
    </main>
  );
}
