import type { NavFn } from '../types'
import { MapView } from '../components/MapView'
import { PhoneIcon, MessageIcon } from '../components/Icons'

const trackingSteps = [
  { label: 'Accepted', done: true, active: false },
  { label: 'Picked Up', done: true, active: false },
  { label: 'In Transit', done: false, active: true },
  { label: 'Delivered', done: false, active: false },
]

export function ActiveTrackingScreen({ nav }: { nav: NavFn }) {
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

      {/* Top status bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#0F172A]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
          <span className="text-white font-bold text-sm">In Transit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-white/70 text-xs font-semibold">12 min away</span>
        </div>
      </div>

      {/* Map */}
      <div className="h-52 overflow-hidden">
        <MapView variant="tracking" height={208} />
      </div>

      {/* Tracking progress */}
      <div className="bg-[#F8FAFC] px-5 py-4 flex items-center justify-between">
        {trackingSteps.map((step, i) => (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.done
                    ? 'bg-[#2E7D32]'
                    : step.active
                    ? 'bg-[#1565C0]'
                    : 'bg-[#E2E8F0]'
                }`}
              >
                {step.done && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {step.active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
              <span className={`text-[9px] font-bold text-center leading-tight ${step.done || step.active ? 'text-[#0F172A]' : 'text-[#CBD5E1]'}`}>
                {step.label}
              </span>
            </div>
            {i < trackingSteps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 ${step.done ? 'bg-[#2E7D32]' : 'bg-[#E2E8F0]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-3 flex flex-col gap-3">
        {/* Vendor */}
        <div>
          <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Vendor Details</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#FFF3E0] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF8F00">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">BP Station, Lekki Phase 1</p>
                <p className="text-xs text-[#64748B]">12 Admiralty Way</p>
              </div>
            </div>
            <button className="px-3 py-1.5 border border-[#E2E8F0] rounded-[8px] text-xs font-semibold text-[#475569]">
              OK
            </button>
          </div>
        </div>

        {/* Customer */}
        <div>
          <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Customer Details</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1565C0] to-[#0D47A1] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                AD
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">Amara Dikoro</p>
                <p className="text-xs text-[#64748B]">22 Admiralty Way, Apt 3B</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0]">
                <PhoneIcon size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
                <MessageIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-[#F8FAFC] rounded-[14px] p-3.5 flex justify-between items-center">
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Order</p>
            <p className="font-semibold text-[#0F172A] text-sm">25L Gas Refill</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Fee</p>
            <p className="font-extrabold text-[#0F172A] text-base">₦ 1,200</p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-5 pb-3 pt-2 flex flex-col gap-2.5">
        <button
          onClick={() => nav('delivery-complete')}
          className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
        >
          Complete Delivery
        </button>
        <button className="text-center text-sm text-[#D32F2F] font-semibold py-1">
          Report Issue
        </button>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-[#0F172A]/20 rounded-full" />
      </div>
    </div>
  )
}
