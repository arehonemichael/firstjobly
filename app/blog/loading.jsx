// app/blog/loading.jsx
// Removed wrapping <main> — layout.js already provides one
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Skeleton for page title */}
      <div className="animate-pulse mb-6">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Skeleton for blog posts */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <article key={i} className="border-b pb-6 animate-pulse">
            <div className="p-4">
              {/* Title skeleton */}
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>

              {/* Date skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>

              {/* Image skeleton */}
              <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}