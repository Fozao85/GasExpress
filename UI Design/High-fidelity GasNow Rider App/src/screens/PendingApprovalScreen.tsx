import type { NavFn } from '../types'
import { HomeIndicator } from './LoginScreen'

const progressSteps = [
  { label: 'Account Created', done: true, active: false },
  { label: 'Documents Submitted', done: true, active: false },
  { label: 'Under Review', done: false, active: true },
  { label: 'Approved', done: false, active: false },
]

export function PendingApprovalScreen({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold text-[#0F172A]">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[#0F172A]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="4.5" y="5" width="3" height="7" rx="1" />
            <rect x="9" y="2" width="3" height="10" rx="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35" />
          </svg>
          <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="2" y="2" width="17" height="8" rx="1.5" />
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#E3F2FD] border-4 border-white shadow-lg flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF8F00] rounded-full flex items-center justify-center border-2 border-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="#FF8F00" strokeWidth="2" />
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="#FF8F00" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#0F172A]">Under Review</h1>
          <p className="text-[#64748B] text-sm mt-2 leading-relaxed max-w-xs">
            Your application is being reviewed. We'll notify you once approved — usually within 24 hours.
          </p>
        </div>

        {/* Progress steps */}
        <div className="w-full bg-[#F8FAFC] rounded-[20px] p-5 flex flex-col gap-0 mb-8">
          {progressSteps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.done
                      ? 'bg-[#2E7D32]'
                      : step.active
                      ? 'border-2 border-[#1565C0] bg-white'
                      : 'border-2 border-[#E2E8F0] bg-white'
                  }`}
                >
                  {step.done && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {step.active && <div className="w-3 h-3 rounded-full bg-[#1565C0]" />}
                </div>
                {i < progressSteps.length - 1 && (
                  <div className={`w-0.5 h-8 mt-1 ${step.done ? 'bg-[#2E7D32]' : 'bg-[#E2E8F0]'}`} />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-semibold ${
                    step.done ? 'text-[#2E7D32]' : step.active ? 'text-[#1565C0]' : 'text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button className="w-full border-2 border-[#E2E8F0] py-3.5 rounded-[12px] font-bold text-sm text-[#475569] hover:bg-[#F8FAFC] mb-3">
          Contact Support
        </button>
        <button
          onClick={() => nav('dashboard')}
          className="text-xs text-[#94A3B8] font-medium"
        >
          Check back later →
        </button>
      </div>

      <HomeIndicator />
    </div>
  )
}
