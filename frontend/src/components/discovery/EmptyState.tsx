interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: string;
}

export function EmptyState({ title, message, icon = '🔍' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <span className="text-5xl mb-4" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
      {message && <p className="text-sm text-gray-500 text-center mt-1 max-w-xs">{message}</p>}
    </div>
  );
}
