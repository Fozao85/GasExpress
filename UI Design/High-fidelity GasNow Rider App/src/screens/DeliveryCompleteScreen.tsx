import { useState } from 'react'
import type { NavFn } from '../types'
import { HomeIndicator } from './LoginScreen'

export function DeliveryCompleteScreen({ nav }: { nav: NavFn }) {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold text-[#0F172A]">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="4.5" y="5" width="3" height="7" rx="1" />
            <rect x="9" y="2" width="3" height="10" rx="1" />
          </svg>
          <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="2" y="2" width="17" height="8" rx="1.5" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 flex flex-col">
        {/* Success icon */}
        <div className="flex justify-center mt-8 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-[0_8px_24px_rgba(46,125,50,0.4)]">
                <svg width="36" height="30" viewBox="0 0 36 30" fill="none">
                  <path d="M3 15L13.5 25.5L33 4.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {/* Celebration dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF8F00]" />
            <div className="absolute top-3 -left-3 w-2 h-2 rounded-full bg-[#1565C0]" />
            <div className="absolute -bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#FF8F00]" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Delivery Complete!</h1>
          <p className="text-[#64748B] text-sm mt-1.5">JOB-041 · 22 Admiralty Way</p>
        </div>

        {/* Earnings summary */}
        <div className="bg-[#F8FAFC] rounded-[20px] p-5 mb-5">
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Earnings Summary</p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Delivery Fee', val: '₦ 1,200', color: '#0F172A' },
              { label: 'Distance Bonus (3.8km)', val: '+ ₦ 150', color: '#2E7D32' },
              { label: 'Platform Fee (5%)', val: '− ₦ 68', color: '#D32F2F' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-[#475569]">{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>
                  {item.val}
                </span>
              </div>
            ))}

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-between items-center">
              <span className="font-bold text-[#0F172A]">You Earned</span>
              <span className="text-2xl font-extrabold text-[#0F172A]">₦ 1,282</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-[#F8FAFC] rounded-[20px] p-5 mb-6">
          <p className="text-sm text-[#475569] text-center mb-3">Rate your experience with Amara</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill={star <= rating ? '#FF8F00' : 'none'}
                  stroke={star <= rating ? '#FF8F00' : '#CBD5E1'}
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-4 flex flex-col gap-3">
        <button
          onClick={() => nav('jobs')}
          className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
        >
          Find Next Job
        </button>
        <button
          onClick={() => nav('dashboard')}
          className="w-full border-2 border-[#E2E8F0] py-3.5 rounded-[12px] font-bold text-sm text-[#475569] hover:bg-[#F8FAFC]"
        >
          Go to Dashboard
        </button>
      </div>

      <HomeIndicator />
    </div>
  )
}
