interface DistanceBadgeProps {
  distance?: number;
  eta?: string;
}

export function DistanceBadge({ distance, eta }: DistanceBadgeProps) {
  if (distance === undefined) return null;

  const display = distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;

  return (
    <span
      className="inline-flex items-center gap-1 text-sm text-gray-500"
      aria-label={`${display} away${eta ? `, estimated ${eta}` : ''}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {display}
      {eta ? ` · ${eta}` : ''}
    </span>
  );
}
