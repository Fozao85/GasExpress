import type { NavFn } from '../types'
import { MapView } from '../components/MapView'
import { PhoneIcon, NavigationIcon, MessageIcon } from '../components/Icons'

export function CustomerNavScreen({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Status bar - overlaid */}
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

        {/* Navigation header */}
        <div className="mx-4 mt-1">
          <div className="bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-[#1565C0] uppercase tracking-widest">Delivering to Customer</p>
              <p className="font-extrabold text-[#0F172A] text-base">22 Admiralty Way, Lekki</p>
            </div>
            <button className="w-10 h-10 rounded-[10px] bg-[#2E7D32] flex items-center justify-center text-white flex-shrink-0">
              <NavigationIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 overflow-hidden">
        <MapView variant="customer" height={460} />
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-5 pt-4 pb-3">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1 bg-[#E2E8F0] rounded-full" />
        </div>

        {/* ETA pill */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#0F172A] text-white rounded-full px-6 py-2.5 flex items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-extrabold leading-none">12</p>
              <p className="text-[9px] font-bold text-white/60 uppercase">MIN</p>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-center">
              <p className="text-lg font-extrabold leading-none">2.4</p>
              <p className="text-[9px] font-bold text-white/60 uppercase">KM</p>
            </div>
          </div>
        </div>

        {/* Customer card */}
        <div className="bg-[#F8FAFC] rounded-[16px] p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1565C0] to-[#0D47A1] flex items-center justify-center text-white font-bold flex-shrink-0">
                AD
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-0.5">Customer</p>
                <p className="font-bold text-[#0F172A] text-sm">Amara Dikoro</p>
                <p className="text-xs text-[#64748B]">22 Admiralty Way, Apt 3B</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0]">
                <PhoneIcon size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
                <MessageIcon size={16} />
              </button>
            </div>
          </div>

          {/* Delivery note */}
          <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-xs text-[#64748B] italic">"Leave at gate if not home"</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => nav('active-tracking')}
          className="w-full bg-[#2E7D32] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(46,125,50,0.35)]"
        >
          Arrived at Customer
        </button>
      </div>
    </div>
  )
}
