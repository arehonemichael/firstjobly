$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
$adSlotPath = Join-Path $root "components\AdSlot.jsx"
$jobsPath = Join-Path $root "app\jobs\JobsClient.jsx"

if (-not (Test-Path $adSlotPath)) {
    throw "Could not find components\AdSlot.jsx. Run this script from the FirstJobly project root."
}

if (-not (Test-Path $jobsPath)) {
    throw "Could not find app\jobs\JobsClient.jsx. Run this script from the FirstJobly project root."
}

Copy-Item $adSlotPath "$adSlotPath.bak" -Force
Copy-Item $jobsPath "$jobsPath.bak" -Force

@'
"use client";

import { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-1505001993402465";

const AD_UNITS = {
  display: { slot: "2384027274", format: "auto", fullWidthResponsive: true },
  display2: { slot: "1941174145", format: "auto", fullWidthResponsive: true },
  native: { slot: "9819664161", format: "fluid", layoutKey: "-gf+f-3-5e+9w" },
  inArticle: { slot: "5086212235", layout: "in-article", format: "fluid" },
  multiplex: { slot: "2460048898", format: "autorelaxed" },
};

/**
 * AdSlot - renders a Google AdSense unit.
 * type: "display" | "display2" | "native" | "inArticle" | "multiplex" | "none"
 */
export default function AdSlot({
  type = "display",
  className = "",
  minHeight = 250,
}) {
  const insRef = useRef(null);
  const pushed = useRef(false);
  const isNone = type === "none";

  useEffect(() => {
    if (isNone || pushed.current || !insRef.current) return;
    if (insRef.current.getAttribute("data-adsbygoogle-status")) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch (error) {
      console.error("AdSense request failed:", error);
    }
  }, [isNone, type]);

  if (isNone) return null;

  const unit = AD_UNITS[type] || AD_UNITS.display;
  const isInArticle = unit.layout === "in-article";

  return (
    <div className={className} style={{ minHeight }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={
          isInArticle
            ? { display: "block", textAlign: "center" }
            : { display: "block" }
        }
        data-ad-client={AD_CLIENT}
        data-ad-slot={unit.slot}
        {...(unit.format ? { "data-ad-format": unit.format } : {})}
        {...(unit.fullWidthResponsive
          ? { "data-full-width-responsive": "true" }
          : {})}
        {...(unit.layoutKey ? { "data-ad-layout-key": unit.layoutKey } : {})}
        {...(unit.layout ? { "data-ad-layout": unit.layout } : {})}
      />
    </div>
  );
}

'@ | Set-Content -Path $adSlotPath -Encoding utf8

@'
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "../../components/JobCard";
import AdSlot from "../../components/AdSlot";

export default function JobsClient({ allJobs }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 30;
  const adPageKey = `${page}-${category || "all"}-${search || "none"}`;

  const categories = [
    "Internships",
    "Entry-Level",
    "Bursary",
    "Government",
    "Permanent",
    "Learnership",
  ];

  const filteredJobs = allJobs.filter((job) => {
    const matchesCategory = category ? job.category === category : true;
    const matchesSearch = search
      ? [job.title, job.company, job.category, job.description]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(search.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const startIndex = (page - 1) * perPage;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + perPage);

  const formattedCategory = search
    ? `Results for "${search}"`
    : category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Jobs";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, search]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    const params = new URLSearchParams();

    if (selected) params.set("category", selected);
    if (search) params.set("search", search);
    params.set("page", "1");

    router.push(`/jobs?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (search) params.set("search", search);
    params.set("page", String(newPage));

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <div className="w-full px-4 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {formattedCategory}
            </h1>
            <p className="text-gray-600 text-sm">
              {filteredJobs.length} opportunities available
            </p>
          </div>

          <select
            value={category}
            onChange={handleCategoryChange}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl w-full sm:w-auto text-sm font-medium bg-white hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <AdSlot
            key={`jobs-top-${adPageKey}`}
            type="display"
            minHeight={250}
          />
        </div>

        <div className="space-y-4">
          {visibleJobs.map((job, index) => (
            <div
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <JobCard job={job} compact />

              {[5, 14].includes(index) &&
                index + 1 < visibleJobs.length && (
                  <div className="my-8">
                    <AdSlot
                      key={`jobs-feed-${adPageKey}-${index}`}
                      type="native"
                      minHeight={280}
                    />
                  </div>
                )}
            </div>
          ))}

          {visibleJobs.length === 0 && (
            <div className="text-center py-16 bg-white/50 rounded-2xl border border-gray-100">
              <p className="text-gray-600 text-lg font-medium mb-2">
                No jobs found
              </p>
              <p className="text-gray-500 text-sm">
                Try a different keyword or category
              </p>
            </div>
          )}
        </div>

        {visibleJobs.length > 0 && (
          <div className="my-8">
            <AdSlot
              key={`jobs-bottom-${adPageKey}`}
              type="display2"
              minHeight={250}
            />
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  i + 1 === page
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

'@ | Set-Content -Path $jobsPath -Encoding utf8

Write-Host "AdSense fixes applied."
Write-Host "Backups created:"
Write-Host "  $adSlotPath.bak"
Write-Host "  $jobsPath.bak"
Write-Host ""
Write-Host "Next run:"
Write-Host "  git diff -- components/AdSlot.jsx app/jobs/JobsClient.jsx"
Write-Host "  npm run build"
