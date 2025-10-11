"use client";

import Image from "next/image";
import Link from "next/link";

export default function JobsClient({ allJobs }) {
  if (!allJobs || allJobs.length === 0) {
    return <p className="text-center py-12">No job listings available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {allJobs.map((job) => (
        <div
          key={job.id}
          className="border p-4 rounded flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          {/* Company Logo */}
          {job.companyLogo && (
            <div className="w-24 h-12 relative flex-shrink-0">
              <Image
                src={job.companyLogo} // Firebase URL
                alt={job.companyName}
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Job Details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.companyName}</p>
            {job.location && (
              <p className="text-sm text-gray-700">{job.location}</p>
            )}
            {job.createdAt && (
              <p className="text-xs text-gray-400 mt-1">
                Posted on{" "}
                {new Intl.DateTimeFormat("en-ZA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(job.createdAt))}
              </p>
            )}
            <Link
              href={`/jobs/${job.slug}`}
              className="text-blue-600 text-sm mt-2 inline-block hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
