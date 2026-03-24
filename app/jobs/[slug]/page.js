import { notFound } from "next/navigation";
import Image from "next/image";
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

  const cleanList = (text) => {
    if (!text) return null;
    const lines = text
      .split("\n")
      .map((l) =>
        l.replace(/^\d+\.\s*/, "").replace(/^[-•*]\s*/, "").trim()
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
        <div className="bg-white rounded-2xl border shadow-sm p-8 mb-6">
          <div className="flex items-center gap-6">

            {/* Company Logo */}
            {job.logo ? (
              <div className="w-20 h-20 rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                <Image
                  src={job.logo}
                  alt={`${job.company || "Company"} logo`}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl border border-gray-100 shadow-sm flex-shrink-0 bg-pink-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-pink-600">
                  {(job.company || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Title + Meta */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-gray-600">
                <span>{job.company || "Confidential"}</span>
                {job.location && (
                  <>
                    <span>•</span>
                    <span>{job.location}</span>
                  </>
                )}
                {job.category && (
                  <>
                    <span>•</span>
                    <span className="text-pink-600 font-medium">{job.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🎯 AD 1 — After header, before requirements */}
        <div className="mb-6">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy"></div>
        </div>

        {/* REQUIREMENTS */}
        {job.requirements && (
          <section className="bg-white rounded-2xl border p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Requirements</h2>
            {cleanList(job.requirements)}
          </section>
        )}

        {/* 🎯 AD 2 — Between requirements and description */}
        <div className="mb-6">
          <div className="lazy" parent-unit="Firstjobly_Incontent_Lazy"></div>
        </div>

        {/* DESCRIPTION */}
        {job.description && (
          <section className="bg-white rounded-2xl border p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">About This Role</h2>
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

        {/* 🎯 AD 3 — After description, before apply CTA */}
        <div className="mb-6">
          <div className="lazy" parent-unit="Firstjobly_Incontent_Lazy"></div>
        </div>

        {/* APPLY CTA */}
        {job.link && (
          <div className="bg-white border border-pink-200 rounded-xl p-6 sm:p-8 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to apply?
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Apply directly on {job.company || "the employer"}'s website.
            </p>
            <ApplyButton
              link={job.link}
              className="inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Apply Now
            </ApplyButton>
          </div>
        )}

        {/* 🎯 AD 4 — Below apply button */}
        <div className="mt-6">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy"></div>
        </div>

      </main>
    </div>
  );
}