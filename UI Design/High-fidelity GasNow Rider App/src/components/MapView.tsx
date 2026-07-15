type MapVariant = 'pickup' | 'customer' | 'tracking'

export function MapView({ variant = 'pickup', height = 280 }: { variant?: MapVariant; height?: number }) {
  const riderX = variant === 'pickup' ? 140 : variant === 'customer' ? 200 : 260
  const riderY = variant === 'pickup' ? 180 : variant === 'customer' ? 160 : 130

  return (
    <svg width="390" height={height} viewBox={`0 0 390 ${height}`} xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <rect width="390" height={height} fill="#E8F0E8" />

      {/* City blocks */}
      <rect x="66" y="0" width="64" height="44" fill="#D4E6D4" />
      <rect x="66" y="62" width="64" height="58" fill="#D4E6D4" />
      <rect x="66" y="138" width="64" height="52" fill="#D4E6D4" />
      <rect x="66" y="208" width="64" height={height - 208} fill="#D4E6D4" />
      <rect x="148" y="0" width="72" height="44" fill="#C8DCC8" />
      <rect x="148" y="62" width="72" height="58" fill="#C8DCC8" />
      <rect x="148" y="138" width="72" height="52" fill="#C8DCC8" />
      <rect x="148" y="208" width="72" height={height - 208} fill="#C8DCC8" />
      <rect x="238" y="0" width="82" height="44" fill="#D4E6D4" />
      <rect x="238" y="62" width="82" height="58" fill="#D4E6D4" />
      <rect x="238" y="138" width="82" height="52" fill="#D4E6D4" />
      <rect x="238" y="208" width="82" height={height - 208} fill="#D4E6D4" />
      <rect x="338" y="0" width="52" height="44" fill="#C8DCC8" />
      <rect x="338" y="62" width="52" height="58" fill="#C8DCC8" />
      <rect x="338" y="138" width="52" height="52" fill="#C8DCC8" />
      <rect x="0" y="0" width="58" height="44" fill="#C8DCC8" />
      <rect x="0" y="62" width="58" height="58" fill="#C8DCC8" />
      <rect x="0" y="138" width="58" height="52" fill="#C8DCC8" />
      <rect x="0" y="208" width="58" height={height - 208} fill="#C8DCC8" />

      {/* Major roads - horizontal */}
      <rect x="0" y="44" width="390" height="18" fill="#FFFFFF" />
      <rect x="0" y="120" width="390" height="18" fill="#FFFFFF" />
      <rect x="0" y="190" width="390" height="18" fill="#FFFFFF" />

      {/* Road markings - horizontal */}
      <rect x="20" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="70" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="120" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="170" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="220" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="270" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />
      <rect x="320" y="52" width="20" height="2" fill="#E2E8F0" opacity="0.8" />

      {/* Major roads - vertical */}
      <rect x="58" y="0" width="8" height={height} fill="#FFFFFF" />
      <rect x="130" y="0" width="18" height={height} fill="#FFFFFF" />
      <rect x="220" y="0" width="18" height={height} fill="#FFFFFF" />
      <rect x="320" y="0" width="18" height={height} fill="#FFFFFF" />

      {/* Route line */}
      {variant === 'pickup' && (
        <path
          d={`M 100 ${height - 60} Q 148 160 229 129`}
          stroke="#1565C0"
          strokeWidth="4"
          strokeDasharray="8 5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {variant === 'customer' && (
        <path
          d={`M 229 129 Q 280 160 316 ${height - 40}`}
          stroke="#2E7D32"
          strokeWidth="4"
          strokeDasharray="8 5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {variant === 'tracking' && (
        <>
          <path
            d={`M 100 ${height - 60} Q 148 160 229 129`}
            stroke="#2E7D32"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d={`M 229 129 Q 280 160 316 ${height - 40}`}
            stroke="#1565C0"
            strokeWidth="4"
            strokeDasharray="8 5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Vendor/Pickup pin */}
      <circle cx="100" cy={height - 60} r="16" fill="#FF8F00" opacity="0.15" />
      <circle cx="100" cy={height - 60} r="12" fill="#FF8F00" />
      <text x="100" y={height - 55} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">P</text>

      {/* Customer/Dropoff pin */}
      <circle cx="316" cy={height - 40} r="16" fill="#1565C0" opacity="0.15" />
      <circle cx="316" cy={height - 40} r="12" fill="#1565C0" />
      <text x="316" y={height - 35} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">D</text>

      {/* Rider position */}
      <circle cx={riderX} cy={riderY} r="18" fill="#2E7D32" opacity="0.2" />
      <circle cx={riderX} cy={riderY} r="12" fill="#2E7D32" />
      <circle cx={riderX} cy={riderY} r="5" fill="white" />

      {/* Map attribution watermark */}
      <rect x="0" y={height - 18} width="390" height="18" fill="rgba(0,0,0,0.06)" />
      <text x="195" y={height - 5} textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="Inter, sans-serif">
        MAP — {variant === 'pickup' ? 'ROUTE TO PICKUP' : variant === 'customer' ? 'ROUTE TO CUSTOMER' : 'LIVE TRACKING'}
      </text>
    </svg>
  )
}
