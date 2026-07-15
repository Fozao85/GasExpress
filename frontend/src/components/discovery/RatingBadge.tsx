interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md';
}

export function RatingBadge({ rating, size = 'sm' }: RatingBadgeProps) {
  const starSize = size === 'sm' ? 'text-sm' : 'text-base';
  const fullStars = Math.round(rating);

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium text-gray-700 ${starSize}`}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <span className="text-secondary-500">
        {'★'.repeat(Math.min(fullStars, 5))}
        {'☆'.repeat(Math.max(0, 5 - fullStars))}
      </span>
      <span>{rating.toFixed(1)}</span>
    </span>
  );
}
