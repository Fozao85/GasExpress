import type { NavFn } from '../types'
import { PhoneIcon, MessageIcon } from '../components/Icons'

function Countdown() {
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r="24" fill="none" stroke="#E2E8F0" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="#1565C0"
          strokeWidth="4"
          strokeDasharray="150"
          className="countdown-anim"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-extrabold text-[#1565C0]">24s</span>
      </div>
    </div>
  )
}

export function DeliveryRequestModal({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-black/40 relative">
      {/* Dim top area - tap to dismiss */}
      <div className="flex-1" onClick={() => nav('jobs')} />

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-[28px] shadow-[0_-8px_32px_rgba(0,0,0,0.18)] pb-2">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#E2E8F0] rounded-full" />
        </div>

        <div className="px-5 pb-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold text-[#1565C0] uppercase tracking-widest">New Request · JOB-041</p>
              <h2 className="text-xl font-extrabold text-[#0F172A] mt-0.5">Delivery Request</h2>
            </div>
            <Countdown />
          </div>

          {/* Route */}
          <div className="bg-[#F8FAFC] rounded-[16px] p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full bg-[#FF8F00]" />
                <div className="w-0.5 h-8 bg-[#E2E8F0]" />
                <div className="w-3 h-3 rounded-full border-2 border-[#1565C0] bg-white" />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Pickup</p>
                  <p className="font-bold text-[#0F172A] text-sm">BP Station, Lekki Phase 1</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Dropoff</p>
                  <p className="font-bold text-[#0F172A] text-sm">22 Admiralty Way, Lekki</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-2 mb-4">
            {[
              { label: 'Distance', val: '3.8 km' },
              { label: 'Est. Time', val: '~18 min' },
              { label: 'Delivery Fee', val: '₦ 1,200' },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 bg-[#F8FAFC] rounded-[12px] p-3 text-center">
                <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="font-extrabold text-[#0F172A] text-sm">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Order details */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Order Details</p>
            <div className="bg-[#F8FAFC] rounded-[14px] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-[#0F172A] text-sm">25L Cylinder Refill (PMS)</p>
                <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1565C0] text-[9px] font-bold rounded-full">GAS</span>
              </div>
              <p className="text-xs text-[#64748B]">Vendor: BPP Lekki · Ref #84521</p>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8F00] to-[#F57C00] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                AD
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">Amara D.</p>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF8F00">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <p className="text-xs text-[#64748B]">Customer · 4.8</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0]">
                <PhoneIcon size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]">
                <MessageIcon size={16} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => nav('jobs')}
              className="flex-1 border-2 border-[#E2E8F0] py-4 rounded-[12px] font-bold text-sm text-[#475569] hover:bg-[#F8FAFC]"
            >
              Decline
            </button>
            <button
              onClick={() => nav('pickup-nav')}
              className="flex-1 bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-sm shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
            >
              Accept Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
