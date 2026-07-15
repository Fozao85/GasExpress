import { useState } from 'react'
import type { NavFn } from '../types'
import { EyeIcon, EyeOffIcon, GasCylinderIcon, GoogleIcon } from '../components/Icons'

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold text-[#0F172A]">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="7" rx="1" />
          <rect x="9" y="2" width="3" height="10" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <circle cx="8" cy="11" r="1.2" />
          <path d="M5.2 8.4A4 4 0 0 1 8 7.2a4 4 0 0 1 2.8 1.2l1-1.2A5.5 5.5 0 0 0 8 5.8 5.5 5.5 0 0 0 4.2 7.2l1 1.2z" />
          <path d="M2.2 5.6A8 8 0 0 1 8 3.2a8 8 0 0 1 5.8 2.4l1-1.2A9.5 9.5 0 0 0 8 1.8 9.5 9.5 0 0 0 1.2 4.4l1 1.2z" opacity="0.4" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="2" y="2" width="17" height="8" rx="1.5" />
          <path d="M23 4v4a2 2 0 0 0 0-4z" />
        </svg>
      </div>
    </div>
  )
}

function HomeIndicator() {
  return (
    <div className="flex justify-center py-2">
      <div className="w-32 h-1 bg-[#0F172A]/20 rounded-full" />
    </div>
  )
}

export { StatusBar, HomeIndicator }

export function LoginScreen({ nav }: { nav: NavFn }) {
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pt-6 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-11 h-11 bg-[#1565C0] rounded-2xl flex items-center justify-center">
            <GasCylinderIcon size={24} color="white" />
          </div>
          <span className="text-xl font-extrabold text-[#0F172A] tracking-tight">GasNow</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-[#0F172A] leading-tight">Welcome back</h1>
        <p className="text-[#64748B] text-sm mt-1 mb-8">Sign in to your rider account</p>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wide">
              Phone / Email
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter phone or email"
                className="w-full pl-10 pr-4 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC] transition"
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
              >
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <div className="flex justify-end mt-1.5">
              <button className="text-xs text-[#1565C0] font-semibold hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Sign In button */}
          <button
            onClick={() => nav('otp')}
            className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base mt-2 active:bg-[#0D47A1] transition shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#94A3B8] font-medium">or</span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Google */}
          <button className="w-full border border-[#E2E8F0] py-3.5 rounded-[12px] font-semibold text-sm text-[#0F172A] flex items-center justify-center gap-2.5 hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition">
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-[#64748B]">
        New rider?{' '}
        <button onClick={() => nav('register')} className="text-[#1565C0] font-bold hover:underline">
          Create account
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
