"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../../components/JobCard";
import AdSlot from "../../components/AdSlot"; // ⬅️ import the reusable ad

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
    <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">{formattedCategory}</h1>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {visibleJobs.map((job, index) => (
          <div key={job.id}>
            <JobCard job={job} />

            {/* ⬇️ Ad right after the 1st job */}
            {index === 0 && (
              <div className="my-4">
                <AdSlot
                  slot="7878892308"          // your in-list ad unit
                  layout="in-article"
                  responsive
                  style={{ display: "block", minHeight: 250 }}
                />
              </div>
            )}

            {/* (Optional) add another ad deeper in the list for long scrollers */}
            {/* {index === 4 && (
              <div className="my-6">
                <AdSlot slot="YOUR_SECOND_IN_LIST_SLOT" layout="in-article" responsive />
              </div>
            )} */}
          </div>
        ))}

        {visibleJobs.length === 0 && (
          <p className="text-gray-600">No jobs found in this category yet.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <a
              key={i}
              href={`?category=${category}&page=${i + 1}`}
              className={`px-4 py-2 rounded border text-sm ${
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
