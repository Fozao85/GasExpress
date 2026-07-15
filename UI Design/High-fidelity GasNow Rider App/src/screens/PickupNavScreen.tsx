import type { NavFn } from '../types'
import { MapView } from '../components/MapView'
import { PhoneIcon, NavigationIcon } from '../components/Icons'

export function PickupNavScreen({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Status bar - overlaid on map */}
      <div className="absolute top-0 left-0 right-0 z-10">
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

        {/* Navigation header card */}
        <div className="mx-4 mt-1">
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-[#FF8F00] uppercase tracking-widest">Navigating to Pickup</p>
              <p className="font-extrabold text-[#0F172A] text-base">BP Station, Lekki Phase 1</p>
            </div>
            <button className="w-10 h-10 rounded-[10px] bg-[#1565C0] flex items-center justify-center text-white flex-shrink-0">
              <NavigationIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 overflow-hidden">
        <MapView variant="pickup" height={460} />
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-5 pt-4 pb-3">
        {/* Drag handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 bg-[#E2E8F0] rounded-full" />
        </div>

        {/* ETA pill */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#0F172A] text-white rounded-full px-6 py-2.5 flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-extrabold leading-none">8</p>
              <p className="text-[9px] font-bold text-white/60 uppercase">MIN</p>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-center">
              <p className="text-lg font-extrabold leading-none">1.4</p>
              <p className="text-[9px] font-bold text-white/60 uppercase">KM</p>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-center">
              <p className="text-xs font-semibold text-white/80">via</p>
              <p className="text-xs font-bold">Admiralty</p>
            </div>
          </div>
        </div>

        {/* Vendor card */}
        <div className="bg-[#F8FAFC] rounded-[16px] p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Vendor · JOB-041</p>
              <p className="font-bold text-[#0F172A] text-sm">BP Station, Lekki Phase 1</p>
              <p className="text-xs text-[#64748B] mt-0.5">12 Admiralty Way, Lekki</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0]">
                <PhoneIcon size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white">
                <NavigationIcon size={14} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-3 pt-3 border-t border-[#E2E8F0]">
            <div className="flex-1">
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Order</p>
              <p className="text-sm font-semibold text-[#0F172A]">25L Gas Refill</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Fee</p>
              <p className="text-sm font-extrabold text-[#0F172A]">₦ 1,200</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => nav('customer-nav')}
          className="w-full bg-[#FF8F00] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(255,143,0,0.35)]"
        >
          Arrived at Pickup
        </button>
      </div>
    </div>
  )
}
