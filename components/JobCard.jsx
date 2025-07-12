import Link from "next/link";

export default function JobCard({ job }) {
  const {
    id,
    title,
    company,
    logo,
    category,
    description,
    postedAgo,
    link,
  } = job;

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white hover:shadow-md transition">
      {/* Left: Job Info */}
      <div className="flex-1 pr-4">
        <Link href={`/jobs/${id}`}>
          <h2 className="text-lg font-semibold text-blue-700 hover:underline">
            {title}
          </h2>
        </Link>
        <p className="text-sm text-gray-700">{company}</p>
        <p className="text-sm text-gray-500 mb-1">{postedAgo || ""}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        {category && (
          <span className="mt-2 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      {/* Right: Logo */}
      {logo && (
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={logo}
            alt={`${company} logo`}
            className="w-full h-full object-contain rounded"
          />
        </div>
      )}
    </div>
  );
}
