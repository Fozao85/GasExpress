interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'detail';
}

function CardSkeleton() {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function LoadingSkeleton({ count = 3, type = 'card' }: LoadingSkeletonProps) {
  const Skeleton = type === 'card' ? CardSkeleton : DetailSkeleton;

  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
