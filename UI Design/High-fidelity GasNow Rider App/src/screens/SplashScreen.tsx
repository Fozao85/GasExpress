import { useEffect } from 'react'
import type { NavFn } from '../types'
import { GasCylinderIcon } from '../components/Icons'

export function SplashScreen({ nav }: { nav: NavFn }) {
  useEffect(() => {
    const t = setTimeout(() => nav('login'), 2500)
    return () => clearTimeout(t)
  }, [nav])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1565C0] to-[#0D47A1] items-center justify-between py-16">
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Logo mark */}
        <div className="w-28 h-28 bg-white/15 rounded-[32px] flex items-center justify-center backdrop-blur-sm border border-white/20">
          <GasCylinderIcon size={56} color="white" />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">GasNow</h1>
          <p className="text-[#90CAF9] text-base font-medium mt-1 tracking-widest uppercase">Rider App</p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              style={{
                opacity: 0.4,
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="text-white/50 text-xs font-medium tracking-widest uppercase">Loading</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
