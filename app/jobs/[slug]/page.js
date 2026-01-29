import { notFound } from "next/navigation";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";

export const revalidate = 600;

/* ---------------- METADATA ---------------- */
export async function generateMetadata({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);

  if (!job) {
    return { title: "Job Not Found | FirstJobly" };
  }

  return {
    title: `${job.title} at ${job.company || "Confidential"} | FirstJobly`,
    description: (job.description || job.requirements || "")
      .slice(0, 155)
      .concat("..."),
  };
}

/* ---------------- PAGE ---------------- */
export default async function JobDetailPage({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);

  if (!job) notFound();

  /* -------- CLEAN LIST (REMOVES NUMBERING) -------- */
  const cleanList = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((l) =>
        l
          .replace(/^\d+\.\s*/, "")
          .replace(/^[-•*]\s*/, "")
          .trim()
      )
      .filter(Boolean);

    return (
      <ul className="space-y-3">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-pink-600 mt-1">✓</span>
            <span className="text-gray-700 leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-gray-600">
            <span>{job.company || "Confidential"}</span>
            <span></span>
            {job.category && (
              <>
                <span>•</span>
                <span className="text-pink-600 font-medium">
                  {job.category}
                </span>
              </>
            )}
          </div>
        </div>

        {/* REQUIREMENTS */}
        {job.requirements && (
          <section className="bg-white rounded-2xl border p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-6">
              Requirements
            </h2>
            {cleanList(job.requirements)}
          </section>
        )}

        {/* DESCRIPTION */}
        {job.description && (
          <section className="bg-white rounded-2xl border p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-6">
              About This Role
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              {job.description
                .replace(/^\d+\.\s*/gm, "")
                .split("\n")
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </section>
        )}

        {/* APPLY CTA (NON-AD LOOK) */}
        {job.link && (
          <div className="bg-white border border-pink-200 rounded-xl p-6 sm:p-8 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to apply?
            </h3>

            <p className="text-gray-600 mb-4 text-sm">
              Apply directly on {job.company || "the employer"}’s website.
            </p>

            <ApplyButton
              link={job.link}
              className="inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Apply Now
            </ApplyButton>
          </div>
        )}

      </main>
    </div>
  );
}
