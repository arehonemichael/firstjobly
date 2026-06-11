import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getJobBySlug, getJobById, getJobsListing } from "../../../lib/jobs";
import ApplyButton from "../../../components/ApplyButton";
import StickyApplyBar from "../../../components/StickyApplyBar";

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);
  if (!job) return { title: "Job Not Found | FirstJobly" };
  return {
    title: `${job.title} at ${job.company || "Confidential"} | FirstJobly`,
    description: (job.description || job.requirements || "").slice(0, 155).concat("..."),
  };
}

function cleanList(text) {
  if (!text) return null;
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
  return (
    <ul className="space-y-3">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-pink-600 mt-0.5 flex-shrink-0">&#10003;</span>
          <span className="text-gray-700 leading-relaxed">{line}</span>
        </li>
      ))}
    </ul>
  );
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    pink: "bg-pink-50 text-pink-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}

export default async function JobDetailPage({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);
  if (!job) notFound();

  // Fetch related jobs from same category
  let relatedJobs = [];
  try {
    const allJobs = await getJobsListing();
    relatedJobs = allJobs
      .filter((j) => j.category === job.category && j.slug !== job.slug)
      .slice(0, 5);
  } catch {
    // Silent fail — page still renders without related jobs
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-10">
      <div className="w-full px-4 py-8 sm:py-12">

        {/* HEADER CARD */}
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
              <p className="text-gray-500 text-sm sm:text-base">
                {job.company || "Confidential"}
                {job.location && <span> - {job.location}</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.category && <Badge variant="pink">&#127991; {job.category}</Badge>}
            {job.jobType && <Badge variant="default">&#9201; {job.jobType}</Badge>}
            {job.salary && <Badge variant="green">&#128176; {job.salary}</Badge>}
            {job.deadline && <Badge variant="amber">&#128197; Closes {job.deadline}</Badge>}
            {job.location && <Badge variant="default">&#128205; {job.location}</Badge>}
          </div>
        </div>

        {/* AD 1 — after header */}
        <div className="mb-5">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy min-h-[250px]" />
        </div>

        {/* REQUIREMENTS */}
        {job.requirements && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Requirements</h2>
            {cleanList(job.requirements)}
          </section>
        )}
        {/* AD 2 — between requirements and description */}
        <div className="mb-5">
          <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>

        {/* DESCRIPTION */}
        {job.description && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">About This Role</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {job.description
                .replace(/^\d+\.\s*/gm, "")
                .split("\n")
                .filter(Boolean)
                .map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        )}

        {/* AD 3 — after description */}
        <div className="mb-5">
          <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>


        {/* AD — before apply CTA */}
        <div className="mb-5">
          <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>

        {/* APPLY CTA */}
        {job.link && (
          <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-6 sm:p-8 text-center mb-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Interested in this role?</h3>
            <p className="text-gray-500 text-sm mb-5">Apply directly on {job.company || "the employer"}'s website. It only takes a few minutes.</p>
            <ApplyButton link={job.link} slug={job.slug} title={job.title} company={job.company} className="inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-pink-700 active:scale-95 transition">
              Apply Now
            </ApplyButton>
          </div>
        )}

        {/* HOW TO APPLY TIPS */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Before You Apply</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Prepare your CV</p>
                <p className="text-gray-600 text-sm">Make sure your CV is up to date, includes your full name, contact details, qualifications, and any work or volunteer experience. Keep it to 2-3 pages.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Check the closing date</p>
                <p className="text-gray-600 text-sm">Applications submitted after the closing date are not considered. Apply as early as possible — do not wait until the last day.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Government jobs require a Z83 form</p>
                <p className="text-gray-600 text-sm">All South African government applications require a completed Z83 form. Download it from the DPSA website and complete it fully before submitting.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold text-sm">4</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Never pay to apply</p>
                <p className="text-gray-600 text-sm">Legitimate employers never ask for payment to process your application. If anyone asks you to pay for a job opportunity, it is a scam.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AD 4 — after tips */}
        <div className="mb-5">
          <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>

        {/* RELATED JOBS */}
        {relatedJobs.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">More {job.category} Opportunities</h2>
              <Link href={`/jobs?category=${job.category}`} className="text-pink-600 text-sm font-medium hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {relatedJobs.map((related) => (
                <Link key={related.id} href={`/jobs/${related.slug}`} className="flex items-start justify-between p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all group">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors truncate text-sm">{related.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {related.company || "Confidential"}
                      {related.location && ` - ${related.location}`}
                    </p>
                  </div>
                  {related.deadline && (
                    <span className="ml-3 flex-shrink-0 text-xs text-gray-400">Closes {related.deadline}</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* AD — before disclaimer */}
        <div className="mb-5">
          <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>

        {/* DISCLAIMER */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">Important:</strong> FirstJobly verifies listings before publishing but always confirm details directly with the employer. We will never ask you to pay for a job application. If you are asked to pay, report it immediately.
          </p>
        </div>

        {/* AD 5 — final BTF */}
        <div className="mt-5">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy" />
        </div>

      </div>

      <StickyApplyBar title={job.title} company={job.company} link={job.link} slug={job.slug} />

      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description || job.requirements || "",
        "datePosted": job.createdAt ? new Date(job.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        "validThrough": job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "2026-12-31",
        "employmentType": job.jobType ? job.jobType.toUpperCase().replace(/\s+/g, "_") : "FULL_TIME",
        "hiringOrganization": { "@type": "Organization", "name": job.company || "Confidential", "logo": job.logo || "https://firstjobly.co.za/logo.png" },
        "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": job.location || "South Africa", "addressCountry": "ZA" } },
        "url": `https://firstjobly.co.za/jobs/${job.slug}`,
        "applicantLocationRequirements": { "@type": "Country", "name": "South Africa" }
      }) }} />

      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://firstjobly.co.za" },
          { "@type": "ListItem", "position": 2, "name": "Jobs", "item": "https://firstjobly.co.za/jobs" },
          { "@type": "ListItem", "position": 3, "name": job.title, "item": `https://firstjobly.co.za/jobs/${job.slug}` }
        ]
      }) }} />
    </div>
  );
}