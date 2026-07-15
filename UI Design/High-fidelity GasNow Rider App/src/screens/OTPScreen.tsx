import { useState, useRef } from 'react'
import type { NavFn } from '../types'
import { ArrowLeftIcon } from '../components/Icons'
import { StatusBar, HomeIndicator } from './LoginScreen'

export function OTPScreen({ nav }: { nav: NavFn }) {
  const [digits, setDigits] = useState<string[]>(['5', '', '', '', '', ''])
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[idx] = val
    setDigits(next)
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F1F5F9]">
        <button
          onClick={() => nav('login')}
          className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <h1 className="text-lg font-bold text-[#0F172A]">Verify Phone</h1>
      </div>

      <div className="flex-1 px-6 pt-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-[#E3F2FD] rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>

        <h2 className="text-2xl font-extrabold text-[#0F172A] text-center">Enter verification code</h2>
        <p className="text-[#64748B] text-sm text-center mt-2 leading-relaxed">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-[#0F172A]">+234 800 *** **01</span>
        </p>

        {/* OTP inputs */}
        <div className="flex gap-3 justify-center mt-10">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-12 h-14 text-center text-xl font-bold rounded-[12px] border-2 transition focus:outline-none ${
                d
                  ? 'border-[#1565C0] bg-[#E3F2FD] text-[#1565C0]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]'
              } focus:border-[#1565C0]`}
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-center text-sm text-[#64748B] mt-6">
          Didn't receive code?{' '}
          <span className="font-semibold text-[#1565C0]">Resend in 00:45</span>
        </p>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-4 flex flex-col gap-3">
        <button
          onClick={() => nav('identity')}
          className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
        >
          Verify Code
        </button>
        <button className="text-[#64748B] text-sm font-medium text-center py-1">
          Change Phone Number
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
