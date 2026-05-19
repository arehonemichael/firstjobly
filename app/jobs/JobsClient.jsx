"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "../../components/JobCard";

export default function JobsClient({ allJobs }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const perPage = 30;

  const categories = [
    "Internships",
    "Entry-Level",
    "Bursary",
    "Government",
    "Permanent",
    "Learnership",
  ];

  const filteredJobs = category
    ? allJobs.filter((job) => job.category === category)
    : allJobs;

  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const startIndex = (page - 1) * perPage;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + perPage);

  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Jobs";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    const query = selected ? `?category=${selected}&page=1` : "?page=1";
    router.push(`/jobs${query}`);
  };

  const handlePageChange = (newPage) => {
    const query = category
      ? `?category=${category}&page=${newPage}`
      : `?page=${newPage}`;
    router.push(`/jobs${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{formattedCategory}</h1>
            <p className="text-gray-600 text-sm">{filteredJobs.length} opportunities available</p>
          </div>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl w-full sm:w-auto text-sm font-medium bg-white hover:border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all cursor-pointer shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden">
          <div id="Firstjobly_Incontent_Lazy" className="av-lazy"></div>
        </div>

        <div className="space-y-4">
          {visibleJobs.map((job, index) => (
            <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.03}s` }}>
              <JobCard job={job} compact />
              {(index + 1) % 5 === 0 && index + 1 < visibleJobs.length && (
                <div className="my-8">
                  <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy"></div>
                </div>
              )}
            </div>
          ))}

          {visibleJobs.length === 0 && (
            <div className="text-center py-16 bg-white/50 rounded-2xl border border-gray-100">
              <p className="text-gray-600 text-lg font-medium mb-2">No jobs found in this category</p>
              <p className="text-gray-500 text-sm">Try selecting a different category or check back soon!</p>
            </div>
          )}
        </div>

        {visibleJobs.length > 0 && (
          <div className="my-8">
            <div className="av-lazy" parent-unit="Firstjobly_Incontent_Lazy"></div>
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
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10">
          <div id="Firstjobly_Bottom_BTF" className="av-lazy"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}