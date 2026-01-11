import { notFound } from "next/navigation";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  let job = await getJobBySlug(params.slug);

  if (!job && params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)) {
    job = await getJobById(params.slug);
  }

  if (!job) {
    return { title: "Job Not Found | FirstJobly" };
  }

  const shortDesc =
    (job.description || job.requirements || job.title).slice(0, 157) + "...";

  return {
    title: `${job.title} at ${job.company || "Confidential"} - ${
      job.location || "South Africa"
    } | FirstJobly`,
    description: shortDesc,
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }) {
  let job = await getJobBySlug(params.slug);

  if (!job && params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)) {
    job = await getJobById(params.slug);
  }

  if (!job) notFound();

  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const datePosted = job.createdAt
    ? job.createdAt.toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  // Split description into paragraphs for ad insertion
  const descriptionParagraphs = (job.description || "No description provided.")
    .split('\n')
    .filter(p => p.trim().length > 0);

  return (
    <>
      {/* Structured Data for Google Jobs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: job.description || job.requirements || "No description available.",
              identifier: {
                "@type": "PropertyValue",
                name: "FirstJobly",
                value: job.id,
              },
              datePosted,
              validThrough,
              employmentType: job.category?.includes("Permanent") ? "FULL_TIME" : "INTERN",
              hiringOrganization: {
                "@type": "Organization",
                name: job.company || "Confidential",
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location || "South Africa",
                  addressCountry: "ZA",
                },
              },
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "ZAR",
                value: { "@type": "QuantitativeValue", unitText: "MONTH" },
              },
              applicationContact: {
                "@type": "ContactPoint",
                url: job.link || `https://firstjobly.co.za/jobs/${job.slug}`,
              },
            },
            null,
            2
          ),
        }}
      />

      {/* 🎯 TOP LEADERBOARD AD - High visibility at top of page */}
      <div id="Firstjobly_Top_Leaderboard_ATF" className="mb-6"></div>

      <main className="bg-white max-w-4xl mx-auto px-6 py-8">
        <div className="max-w-3xl">
          {/* Company Logo */}
          {job.logo && (
            <div className="mb-6">
              <img
                src={job.logo}
                alt={`${job.company} Logo`}
                className="h-16 object-contain"
              />
            </div>
          )}

          {/* Title + Meta */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{job.title}</h1>
            <div className="flex items-center gap-3 text-gray-600 mb-2">
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">{job.category}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>
            {job.company && <p className="text-lg font-medium text-gray-900">{job.company}</p>}
          </div>

          {/* 🎯 FIRST IN-CONTENT AD - Right after title/header */}
          <div id="Firstjobly_Incontent_Lazy" className="my-8"></div>

          {/* Requirements */}
          {job.requirements && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Requirements</h2>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                {job.requirements}
              </div>
            </section>
          )}

          {/* 🎯 IN-CONTENT REPEATER #1 - After requirements */}
          <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Job Description</h2>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {descriptionParagraphs.slice(0, Math.ceil(descriptionParagraphs.length / 2)).join('\n')}
            </div>
          </section>

          {/* 🎯 IN-CONTENT REPEATER #2 - Middle of description */}
          <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>

          {/* Rest of Description */}
          {descriptionParagraphs.length > 1 && (
            <section className="mb-8">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                {descriptionParagraphs.slice(Math.ceil(descriptionParagraphs.length / 2)).join('\n')}
              </div>
            </section>
          )}

          {/* 🎯 IN-CONTENT REPEATER #3 - Before apply button */}
          <div className="lazy my-8" parent-unit="Firstjobly_Incontent_Lazy"></div>

          {/* Apply Button */}
          {job.link && (
            <div className="mb-8 p-6 bg-pink-50 border border-pink-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Ready to apply?</h3>
              <ApplyButton link={job.link} />
            </div>
          )}

          {/* 🎯 BOTTOM BANNER AD - Just before end of content */}
          <div id="Firstjobly_Bottom_BTF" className="my-8"></div>
        </div>
      </main>
    </>
  );
}