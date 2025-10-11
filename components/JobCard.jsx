import Link from "next/link";

function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) return "Just now";
  if (minutes < 60) return `Posted ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `Posted ${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `Posted ${days} day${days > 1 ? "s" : ""} ago`;
}

function getShortText(text, wordLimit = 20) {
  if (!text) return "";
  return text.split(" ").slice(0, wordLimit).join(" ") + (text.split(" ").length > wordLimit ? "..." : "");
}

export default function JobCard({ job, compact = false }) {
  const posted = job.createdAt ? getRelativeTime(job.createdAt) : "Posted recently";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={`block border rounded hover:shadow transition relative ${
        compact ? "p-3 sm:p-2" : "p-4 sm:p-4"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        {/* Job Details */}
        <div className="flex-1">
          <h3 className={`${compact ? "text-base" : "text-lg"} font-semibold truncate`}>
            {job.title}
          </h3>
          <p className={`${compact ? "text-sm" : "text-sm"} text-gray-700 truncate`}>
            {job.company}
          </p>
          <p className="text-gray-500 text-xs mt-1">{posted}</p>
          <p className={`${compact ? "text-xs mt-1" : "text-sm mt-2"} text-gray-600`}>
            {getShortText(job.requirements)}
          </p>
        </div>

        {/* Company Logo */}
        {job.logo && (
          <div
            className={`flex items-center justify-center flex-shrink-0 ${
              compact ? "w-16 h-16 sm:w-20 sm:h-20" : "w-32 h-16 sm:w-40 sm:h-20"
            }`}
          >
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
