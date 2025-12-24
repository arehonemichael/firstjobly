// app/jobs/[slug]/page.js

import { notFound } from 'next/navigation';
import { getJobBySlug, getJobs } from '../../../lib/jobs';
import ApplyButton from '../../../components/ApplyButton';
import AdSlot from '../../../components/AdSlot';

export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow new slugs not in build

// Pre-render all known job pages for speed + SEO
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

// Metadata & page (same as before, with structured data)
export async function generateMetadata({ params }) {
  const job = await getJobBySlug(params.slug);
  if (!job) return { title: 'Job Not Found | FirstJobly' };
  const shortDesc = (job.description || job.requirements || job.title).slice(0, 157) + '...';
  return {
    title: `${job.title} at ${job.company || 'Confidential'} - ${job.location || 'South Africa'} | FirstJobly`,
    description: shortDesc,
  };
}

export default async function JobDetailPage({ params }) {
  const job = await getJobBySlug(params.slug);
  if (!job) notFound();

  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const datePosted = job.createdAt ? job.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  return (
    <>
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
        {/* ... rest of your existing JSX from before ... */}
        {job.logo && <div className="mb-2"><img src={job.logo} alt={`${job.company} Logo`} className="h-16 object-contain" /></div>}

        <div>
          <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
          <p className="text-gray-600">{job.category} · {job.location}</p>
          {job.company && <p className="text-lg font-medium text-blue-600 mt-1">{job.company}</p>}
        </div>

        <div className="border rounded-md p-2"><AdSlot slot="2290721371" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} /></div>

        {job.requirements && <section className="space-y-2"><h2 className="font-semibold">Requirements:</h2><p className="text-sm whitespace-pre-line">{job.requirements}</p></section>}

        <div className="border rounded-md p-2"><AdSlot slot="4489509306" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} /></div>

        <section className="space-y-2"><h2 className="font-semibold">Description:</h2><p className="text-sm whitespace-pre-line">{job.description || "No description provided."}</p></section>

        <section className="text-sm space-y-2">
          {job.company && <p><strong>Company:</strong> {job.company}</p>}
          {job.link && <div className="mt-4"><ApplyButton link={job.link} /></div>}
        </section>

        <div className="border rounded-md p-2"><AdSlot slot="8280865915" layout="in-article" responsive style={{ display: "block", minHeight: 250 }} /></div>
      </main>
    </>
  );
}