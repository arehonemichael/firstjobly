// utf8
import { notFound } from "next/navigation";
import Image from "next/image";
import { getJobBySlug, getJobById } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";
import StickyApplyBar from "../../../components/StickyApplyBar";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const job = (await getJobBySlug(params.slug)) ?? (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug) ? await getJobById(params.slug) : null);
  if (!job) return { title: "Job Not Found | FirstJobly" };
  return {
    title: `${job.title} at ${job.company || "Confidential"} | FirstJobly`,
    description: (job.description || job.requirements || "").slice(0, 155).concat("..."),
  };
}

function cleanList(text) {
  if (!text) return null;
  const lines = text.split("\n").map((l) => l.replace(/^\d+\.\s*/, "").replace(/^[-�*]\s*/, "").trim()).filter(Boolean);
  return (
    <ul className="space-y-3">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-pink-600 mt-0.5 flex-shrink-0">?</span>
          <span className="text-gray-700 leading-relaxed">{line}</span>
        </li>
      ))}
    </ul>
  );
}

function Badge({ children, variant = "default" }) {
  const styles = { default: "bg-gray-100 text-gray-700", pink: "bg-pink-50 text-pink-700", green: "bg-green-50 text-green-700", amber: "bg-amber-50 text-amber-700" };
  return <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${styles[variant]}`}>{children}</span>;
}

export default async function JobDetailPage({ params }) {
  const job = (await getJobBySlug(params.slug)) ?? (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug) ? await getJobById(params.slug) : null);
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-10">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-5">
          <div className="flex items-start gap-5 mb-5">
            {job.logo ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                <Image src={job.logo} alt={`${job.company || "Company"} logo`} width={80} height={80} className="object-contain w-full h-full" />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 flex-shrink-0 bg-pink-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-pink-600">{(job.company || "?").charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-snug">{job.title}</h1>
              <p className="text-gray-500 text-sm sm:text-base">{job.company || "Confidential"}{job.location && <span> � {job.location}</span>}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.category && <Badge variant="pink">?? {job.category}</Badge>}
            {job.jobType && <Badge variant="default">? {job.jobType}</Badge>}
            {job.salary && <Badge variant="green">?? {job.salary}</Badge>}
            {job.deadline && <Badge variant="amber">?? Closes {job.deadline}</Badge>}
            {job.location && <Badge variant="default">?? {job.location}</Badge>}
          </div>
        </div>
        <div className="mb-5"><div id="Firstjobly_Incontent_Lazy" className="av-lazy" /></div>
        {job.requirements && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Requirements</h2>
            {cleanList(job.requirements)}
          </section>
        )}
        {job.description && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">About This Role</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {job.description.replace(/^\d+\.\s*/gm, "").split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        )}
        <div className="mb-5"><div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" /></div>
        {job.link && (
          <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Interested in this role?</h3>
            <p className="text-gray-500 text-sm mb-5">Apply directly on {job.company || "the employer"}'s website it only takes a few minutes.</p>
            <ApplyButton link={job.link} className="inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-pink-700 active:scale-95 transition">Apply Now ?</ApplyButton>
          </div>
        )}
        <div className="mt-5"><div id="Firstjobly_Bottom_BTF" className="av-lazy" /></div>
      </div>
      <StickyApplyBar title={job.title} company={job.company} link={job.link} />
      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org/", "@type": "JobPosting", "title": job.title, "description": job.description || job.requirements || "", "datePosted": job.createdAt ? new Date(job.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0], "validThrough": job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "2026-12-31", "employmentType": job.jobType ? job.jobType.toUpperCase().replace(/\s+/g, "_") : "FULL_TIME", "hiringOrganization": { "@type": "Organization", "name": job.company || "Confidential", "logo": job.logo || "https://firstjobly.co.za/logo.png" }, "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": job.location || "South Africa", "addressCountry": "ZA" } }, "url": `https://firstjobly.co.za/jobs/${job.slug}`, "applicantLocationRequirements": { "@type": "Country", "name": "South Africa" } }) }} />
      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firstjobly.co.za" }, { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://firstjobly.co.za/jobs" }, { "@type": "ListItem", "position": 3, "name": job.title, "item": `https://firstjobly.co.za/jobs/${job.slug}` }] }) }} />
    </div>
  );
}
