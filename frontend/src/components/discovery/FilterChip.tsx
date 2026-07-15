interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${selected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
