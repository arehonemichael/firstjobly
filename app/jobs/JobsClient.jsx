"use client";

import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";

// 🧠 Helper to convert timestamp to "X days ago"
function formatRelativeTime(timestamp) {
  if (!timestamp) return "Unknown date";

  const now = Date.now();
  const diffMs = now - timestamp;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function JobsClient({ allJobs, searchParams }) {
  const category = searchParams?.category || "";
  const page = parseInt(searchParams?.page || "1");
  const jobsPerPage = 10;

  const filteredJobs = category
    ? allJobs.filter((job) => job.category === category)
    : allJobs;

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    if (category) params.set("category", category);
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {category && (
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          {category} Jobs
        </h2>
      )}

      {paginatedJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid gap-6">
          {paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                ...job,
                postedAgo: formatRelativeTime(job.createdAt),
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
