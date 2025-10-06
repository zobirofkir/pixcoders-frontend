
"use client";

const LoadingComponent = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
    {/* Hero Section Skeleton */}
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Title Skeleton */}
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 md:w-1/2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6 md:w-2/3 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3 md:w-1/2 animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-3 py-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-24 animate-pulse"></div>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="space-y-3">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-2 pt-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

export default LoadingComponent;