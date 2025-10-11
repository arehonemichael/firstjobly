"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../../components/JobCard";
import AdSlot from "../../components/AdSlot";

export default function JobsClient({ allJobs, searchParams }) {
  const router = useRouter();

  const category = searchParams?.category || "";
  const page = parseInt(searchParams?.page || "1");
  const perPage = 10;

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

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold">{formattedCategory}</h1>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border px-3 py-1 rounded w-full sm:w-auto text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Job Listings */}
      <div className="space-y-3">
        {visibleJobs.map((job, index) => (
          <div key={job.id}>
            <JobCard job={job} compact />

            {/* Ad after the 1st job */}
            {index === 0 && (
              <div className="my-3">
                <AdSlot
                  slot="7878892308"
                  layout="in-article"
                  responsive
                  style={{ display: "block", minHeight: 200 }}
                />
              </div>
            )}
          </div>
        ))}

        {visibleJobs.length === 0 && (
          <p className="text-gray-600 text-sm">No jobs found in this category yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <a
              key={i}
              href={`?category=${category}&page=${i + 1}`}
              className={`px-3 py-1 rounded border text-sm ${
                i + 1 === page ? "bg-blue-600 text-white" : "text-blue-600"
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
