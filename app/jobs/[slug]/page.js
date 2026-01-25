import { notFound } from "next/navigation";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);

  if (!job) {
    return { title: "Job Not Found | FirstJobly" };
  }

  const shortDesc =
    (job.description || job.requirements || job.title)
      .slice(0, 157)
      .concat("...");

  return {
    title: `${job.title} at ${job.company || "Confidential"} – ${
      job.location || "South Africa"
    } | FirstJobly`,
    description: shortDesc,
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);

  if (!job) notFound();

  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const datePosted = job.createdAt
    ? new Date(job.createdAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const formatRequirements = (text) => {
    if (!text) return null;
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const isList =
      lines.length > 4 ||
      lines.every(
        (l) =>
          l.startsWith("- ") ||
          l.startsWith("• ") ||
          l.startsWith("* ") ||
          /^\d+\.\s/.test(l)
      );

    if (isList) {
      return (
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^[-•*]\s?/, "").trim()}</li>
          ))}
        </ul>
      );
    }

    return <div className="whitespace-pre-line text-gray-700">{text}</div>;
  };

  // Split job description into chunks for in-feed ads
  const descriptionChunks = job.description
    ? job.description.match(/.{1,500}(\s|$)/g) || [job.description]
    : [];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.description || job.requirements || "No description available.",
            identifier: { "@type": "PropertyValue", name: "FirstJobly", value: job.id },
            datePosted,
            validThrough,
            employmentType: job.category?.includes("Permanent") ? "FULL_TIME" : "INTERN",
            hiringOrganization: { "@type": "Organization", name: job.company || "Confidential" },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location || "South Africa", addressCountry: "ZA" } },
          }),
        }}
      />

      <main className="bg-white max-w-4xl mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">

          {/* Company Logo */}
          {job.logo && (
            <img
              src={job.logo}
              alt={`${job.company || "Company"} logo`}
              className="h-20 mb-8 object-contain"
            />
          )}

          {/* Job Title & Company */}
          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{job.company} · {job.location}</p>

          {/* 🎯 TOP IN-CONTENT AD — After Job Header */}
          <div id="Firstjobly_Incontent_Lazy" className="my-6"></div>

          {/* Requirements Section */}
          {job.requirements && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              {formatRequirements(job.requirements)}
              {/* 🎯 Insert ad after requirements */}
              <div className="lazy my-6" parent-unit="Firstjobly_Incontent_Lazy"></div>
            </section>
          )}

          {/* Job Description Section */}
          <section className="mb-12 space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Job Description</h2> {/* Bold heading */}
            {descriptionChunks.map((chunk, idx) => (
              <div key={idx}>
                <div dangerouslySetInnerHTML={{ __html: chunk }} />
                {/* 🎯 Insert ad every 2 chunks */}
                {(idx + 1) % 2 === 0 && idx + 1 < descriptionChunks.length && (
                  <div className="lazy my-6" parent-unit="Firstjobly_Incontent_Lazy"></div>
                )}
              </div>
            ))}
          </section>

          {/* Optional Extra Ad for Very Long Content */}
          {descriptionChunks.length > 4 && (
            <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>
          )}

          {/* 🎯 BOTTOM AD — Before Apply Button */}
          <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>

          {/* ✅ APPLY BUTTON — At the Bottom */}
          {job.link && (
            <div className="mb-10">
              <ApplyButton link={job.link} className="px-10 py-5 text-lg font-bold w-full sm:w-auto">
                Click here to apply
              </ApplyButton>
            </div>
          )}

          {/* 🎯 FINAL BTF Banner */}
          <div id="Firstjobly_Bottom_BTF" className="my-10"></div>

        </div>
      </main>
    </>
  );
}
