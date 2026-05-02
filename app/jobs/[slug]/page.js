
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
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

  if (!job) return { title: "Job Not Found | FirstJobly" };

  return {
    title: `${job.title} at ${job.company || "Confidential"} | FirstJobly`,
    description: (job.description || job.requirements || "")
      .slice(0, 155)
      .concat("..."),
  };
}

/* ---------------- STICKY APPLY BAR (client component) ---------------- */
function StickyApplyBar({ job }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!job.link) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex items-center justify-between gap-4 transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{job.title}</p>
        <p className="text-xs text-gray-500 truncate">{job.company || "Confidential"}</p>
      </div>
      <ApplyButton
        link={job.link}
        className="flex-shrink-0 bg-pink-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-pink-700 active:scale-95 transition"
      >
        Apply Now
      </ApplyButton>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function cleanList(text) {
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
          <span className="text-pink-600 mt-0.5 flex-shrink-0">✓</span>
          <span className="text-gray-700 leading-relaxed">{line}</span>
        </li>
      ))}
    </ul>
  );
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    pink:    "bg-pink-50 text-pink-700",
    green:   "bg-green-50 text-green-700",
    amber:   "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}

/* ---------------- PAGE ---------------- */
export default async function JobDetailPage({ params }) {
  const job =
    (await getJobBySlug(params.slug)) ??
    (params.slug.length >= 20 && /^[A-Za-z0-9]+$/.test(params.slug)
      ? await getJobById(params.slug)
      : null);

  if (!job) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-10">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

        {/* ── HEADER CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-5">

          {/* Logo + title row */}
          <div className="flex items-start gap-5 mb-5">
            {job.logo ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 bg-white flex items-center justify-center p-1">
                <Image
                  src={job.logo}
                  alt={`${job.company || "Company"} logo`}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-100 flex-shrink-0 bg-pink-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-pink-600">
                  {(job.company || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-snug">
                {job.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                {job.company || "Confidential"}
                {job.location && <span> · {job.location}</span>}
              </p>
            </div>
          </div>

          {/* Key detail badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {job.category && <Badge variant="pink">🏷 {job.category}</Badge>}
            {job.jobType && <Badge variant="default">⏱ {job.jobType}</Badge>}
            {job.salary && <Badge variant="green">💰 {job.salary}</Badge>}
            {job.deadline && <Badge variant="amber">📅 Closes {job.deadline}</Badge>}
            {job.location && <Badge variant="default">📍 {job.location}</Badge>}
          </div>

          {/* Primary CTA — always visible in header */}
          {job.link && (
            <div className="flex flex-col sm:flex-row gap-3">
              <ApplyButton
                link={job.link}
                className="flex-1 sm:flex-none inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-pink-700 active:scale-95 transition text-sm sm:text-base"
              >
                Apply Now →
              </ApplyButton>
              <p className="text-xs text-gray-400 self-center">
                You'll be redirected to {job.company || "the employer"}'s site
              </p>
            </div>
          )}
        </div>

        {/* ── AD 1 — after header ── */}
        <div className="mb-5">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy" />
        </div>

        {/* ── REQUIREMENTS ── */}
        {job.requirements && (
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Requirements</h2>
            {cleanList(job.requirements)}
          </section>
        )}

        {/* ── DESCRIPTION ── */}
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

        {/* ── AD 2 — after description ── */}
        <div className="mb-5">
          <div className="lazy" parent-unit="Firstjobly_Incontent_Lazy" />
        </div>

        {/* ── SECOND APPLY CTA ── */}
        {job.link && (
          <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Interested in this role?
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Apply directly on {job.company || "the employer"}'s website — it only takes a few minutes.
            </p>
            <ApplyButton
              link={job.link}
              className="inline-flex items-center justify-center bg-pink-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-pink-700 active:scale-95 transition"
            >
              Apply Now →
            </ApplyButton>
          </div>
        )}

        {/* ── AD 3 — below apply CTA ── */}
        <div className="mt-5">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy" />
        </div>

      </main>

      {/* ── STICKY MOBILE APPLY BAR ── */}
      <StickyApplyBar job={job} />
    </div>
  );
}