import Link from "next/link";

function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // in seconds

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (diff < 60) return "Just now";
  if (minutes < 60) return `Posted ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `Posted ${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `Posted ${days} day${days > 1 ? "s" : ""} ago`;
}

function getShortText(text, wordLimit = 20) {
  return text.split(" ").slice(0, wordLimit).join(" ") + "...";
}

export default function JobCard({ job }) {
  const posted = job.createdAt ? getRelativeTime(job.createdAt) : "Posted recently";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block border rounded p-4 hover:shadow transition relative"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-700">{job.company}</p>
          <p className="text-gray-500 text-xs mt-1">{posted}</p>
          <p className="text-sm text-gray-600 mt-2">
            {getShortText(job.requirements || "")}
          </p>
        </div>
       {job.logo && (
  <div style={{ width: "160px", height: "80px" }} className="ml-4 flex items-center justify-center">
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
