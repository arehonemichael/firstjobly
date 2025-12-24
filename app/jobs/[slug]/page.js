// app/jobs/[slug]/page.js

import { notFound } from 'next/navigation';
import { getJobBySlug, getJobById } from '../../../lib/jobs';
import ApplyButton from '../../../components/ApplyButton';
import AdSlot from '../../../components/AdSlot';

export const revalidate = 600;

export async function generateMetadata({ params }) {
  let job;

  // Try as slug first
  job = await getJobBySlug(params.slug);

  // Fallback to old ID if not found and matches ID pattern
  if (!job && params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)) {
    job = await getJobById(params.slug);
  }

  if (!job) {
    return { title: 'Job Not Found | FirstJobly' };
  }

  const shortDesc = (job.description || job.requirements || job.title).slice(0, 157) + '...';

  return {
    title: `${job.title} at ${job.company || 'Confidential'} - ${job.location || 'South Africa'} | FirstJobly`,
    description: shortDesc,
    // THIS IS THE KEY FOR #1 SEO: Always point to the slug as canonical
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }) {
  let job;

  // Try as slug first
  job = await getJobBySlug(params.slug);

  // Fallback to old ID
  if (!job && params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)) {
    job = await getJobById(params.slug);
  }

  if (!job) {
    notFound();
  }

  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const datePosted = job.createdAt ? job.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Structured Data for Google Jobs */}
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
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job.location || "South Africa",
                addressCountry: "ZA",
              },
            },
            baseSalary: { "@type": "MonetaryAmount", currency: "ZAR", value: { "@type": "QuantitativeValue", unitText: "MONTH" } },
            applicationContact: { "@type": "ContactPoint", url: job.link || `https://firstjobly.co.za/jobs/${job.slug}` },
          }, null, 2),
        }}
      />

      <main className="bg-white max-w-3xl mx-auto p-6 rounded shadow mt-6 space-y-6">
        {/* Company Logo */}
        {job.logo && (
          <div className="mb-2">
            <img src={job.logo} alt={`${job.company} Logo`} className="h-16 object-contain" />
          </div>
        )}

        {/* Title + Meta */}
        <div>
          <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
          <p className="text-gray-600">{job.category} · {job.location}</p>
          {job.company && <p className="text-lg font-medium text-blue-600 mt-1">{job.company}</p>}
        </div>

        {/* Ad 1 */}
        <div className="border rounded-md p-2">
          <AdSlot slot="2290721371" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} />
        </div>

        {/* Requirements */}
        {job.requirements && (
          <section className="space-y-2">
            <h2 className="font-semibold">Requirements:</h2>
            <p className="text-sm whitespace-pre-line">{job.requirements}</p>
          </section>
        )}

        {/* Ad 2 */}
        <div className="border rounded-md p-2">
          <AdSlot slot="4489509306" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} />
        </div>

        {/* Description */}
        <section className="space-y-2">
          <h2 className="font-semibold">Description:</h2>
          <p className="text-sm whitespace-pre-line">
            {job.description || "No description provided."}
          </p>
        </section>

        {/* Company & Apply */}
        <section className="text-sm space-y-2">
          {job.company && <p><strong>Company:</strong> {job.company}</p>}
          {job.link && (
            <div className="mt-4">
              <ApplyButton link={job.link} />
            </div>
          )}
        </section>

        {/* Ad 3 */}
        <div className="border rounded-md p-2">
          <AdSlot slot="8280865915" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} />
        </div>
      </main>
    </>
  );
}