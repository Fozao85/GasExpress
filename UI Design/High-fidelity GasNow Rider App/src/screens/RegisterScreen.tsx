import { useState } from 'react'
import type { NavFn } from '../types'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from '../components/Icons'
import { StatusBar, HomeIndicator } from './LoginScreen'

export function RegisterScreen({ nav }: { nav: NavFn }) {
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const inputClass =
    'w-full px-4 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC] transition'
  const labelClass = 'block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wide'

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F1F5F9]">
        <button
          onClick={() => nav('login')}
          className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9]"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <h1 className="text-lg font-bold text-[#0F172A]">Create Account</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5">
        <div className="flex flex-col gap-4">
          {/* Name row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input type="text" placeholder="First name" className={inputClass} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input type="text" placeholder="Last name" className={inputClass} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone Number</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-3.5 border border-[#E2E8F0] rounded-[12px] bg-[#F8FAFC] text-sm font-semibold text-[#475569] whitespace-nowrap">
                <span>🇳🇬</span>
                <span>+234</span>
              </div>
              <input
                type="tel"
                placeholder="800 000 0000"
                className="flex-1 px-4 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC] transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" placeholder="rider@email.com" className={inputClass} />
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Min 8 characters"
                className={`${inputClass} pr-12`}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              >
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input type="password" placeholder="Repeat password" className={inputClass} />
          </div>

          {/* Terms */}
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-start gap-3 text-left"
          >
            <div
              className={`w-5 h-5 rounded-[5px] border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition ${
                agreed ? 'bg-[#1565C0] border-[#1565C0]' : 'border-[#CBD5E1] bg-white'
              }`}
            >
              {agreed && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs text-[#475569] leading-relaxed">
              I agree to the{' '}
              <span className="text-[#1565C0] font-semibold">Terms of Service</span> and{' '}
              <span className="text-[#1565C0] font-semibold">Privacy Policy</span>
            </span>
          </button>

          {/* Create Account button */}
          <button
            onClick={() => nav('otp')}
            className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base active:bg-[#0D47A1] transition shadow-[0_4px_14px_rgba(21,101,192,0.35)] mt-1"
          >
            Create Account
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-[#64748B]">
            Already have an account?{' '}
            <button onClick={() => nav('login')} className="text-[#1565C0] font-bold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>

      <HomeIndicator />
    </div>
  )
}
