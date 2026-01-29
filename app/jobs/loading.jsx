export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading Text - At Top */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 text-pink-600">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">Loading jobs...</span>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="h-10 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg w-80 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-96 mb-8"></div>
          
          {/* Search/Filter Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-full sm:w-40"></div>
            <div className="h-12 bg-pink-200 rounded-lg w-full sm:w-32"></div>
          </div>
        </div>

        {/* Job Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Logo */}
              <div className="h-14 w-14 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg mb-4"></div>
              
              {/* Title */}
              <div className="h-6 bg-gray-300 rounded-lg mb-3 w-4/5"></div>
              
              {/* Company */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded-lg flex-1"></div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
              </div>
              
              {/* Category Badge */}
              <div className="h-7 bg-pink-100 rounded-full w-28"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}