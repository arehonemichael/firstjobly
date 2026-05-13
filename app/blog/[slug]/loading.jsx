// app/blog/[slug]/loading.jsx
// Removed wrapping <main> — layout.js already provides one
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Date skeleton */}
        <div className="h-4 bg-gray-200 rounded w-40 mb-6"></div>

        {/* Hero image skeleton */}
        <div className="w-full h-96 bg-gray-200 rounded mb-6"></div>

        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>

          <div className="h-8"></div>

          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}