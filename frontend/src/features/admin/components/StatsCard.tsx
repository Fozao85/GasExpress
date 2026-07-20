interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}

export function StatsCard({ label, value, icon, color = 'bg-white' }: StatsCardProps) {
  return (
    <div className={`${color} rounded-xl border border-gray-100 p-4`}>
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
