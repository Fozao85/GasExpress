import { useState } from 'react'
import type { NavFn } from '../types'
import { BellIcon } from '../components/Icons'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

function StatusBar({ light = false }: { light?: boolean }) {
  const cls = light ? 'text-white' : 'text-[#0F172A]'
  return (
    <div className={`flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold ${cls}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="7" rx="1" />
          <rect x="9" y="2" width="3" height="10" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35" />
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

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-14 h-7 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#1565C0]' : 'bg-[#CBD5E1]'}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-md ${on ? 'translate-x-7' : 'translate-x-1'}`}
      />
    </button>
  )
}

const jobCards = [
  { id: 'JOB-041', vendor: 'BP Station, Lekki Phase 1', address: '12 Admiralty Way', fee: '₦ 1,200', dist: '3.8 km', time: 'Just now' },
  { id: 'JOB-040', vendor: 'Total Filling, VI', address: '148 Ozumba Mbadiwe', fee: '₦ 850', dist: '2.1 km', time: '4 min ago' },
]

export function DashboardScreen({ nav }: { nav: NavFn }) {
  const [online, setOnline] = useState(true)

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1565C0] to-[#0D47A1] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              CO
            </div>
            <div>
              <p className="font-bold text-[#0F172A] text-sm">Chidi Okonkwo</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-[#2E7D32]' : 'bg-[#94A3B8]'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wide ${online ? 'text-[#2E7D32]' : 'text-[#94A3B8]'}`}>
                  {online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => nav('notifications')}
              className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] relative"
            >
              <BellIcon size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#D32F2F] rounded-full border border-white" />
            </button>
            <Toggle on={online} onToggle={() => setOnline(!online)} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {online ? (
          <div className="p-4 flex flex-col gap-4">
            {/* Earnings row */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Today's Earnings</p>
                <p className="text-2xl font-extrabold text-[#0F172A]">₦4,250</p>
                <p className="text-[11px] text-[#2E7D32] font-semibold mt-1">+12% vs yesterday</p>
              </div>
              <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Deliveries</p>
                <p className="text-2xl font-extrabold text-[#0F172A]">7</p>
                <p className="text-[11px] text-[#64748B] font-semibold mt-1">Completed today</p>
              </div>
            </div>

            {/* Online status banner */}
            <div className="bg-[#E8F5E9] rounded-[16px] p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#2E7D32] text-sm">You're Online</p>
                <p className="text-xs text-[#388E3C] mt-0.5">Receiving delivery requests</p>
              </div>
              <Toggle on={online} onToggle={() => setOnline(false)} />
            </div>

            {/* Available Jobs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-[#0F172A] text-base">Available Jobs</h2>
                <button onClick={() => nav('jobs')} className="text-xs font-bold text-[#1565C0]">View all</button>
              </div>

              <div className="flex flex-col gap-3">
                {jobCards.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => nav('delivery-request')}
                    className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left w-full active:scale-[0.99] transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{job.id}</p>
                        <p className="font-bold text-[#0F172A] text-sm mt-0.5">{job.vendor}</p>
                        <p className="text-xs text-[#64748B] mt-0.5">→ {job.address}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="font-extrabold text-[#0F172A] text-sm">{job.fee}</p>
                        <p className="text-xs text-[#64748B]">{job.dist}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#94A3B8]">{job.time}</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold uppercase tracking-wide">
                        ● Available
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Delivery */}
            <div>
              <h2 className="font-bold text-[#0F172A] text-base mb-3">Active Delivery</h2>
              <button
                onClick={() => nav('active-tracking')}
                className="w-full bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">JOB-039</p>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFF3E0] text-[#FF8F00] text-[10px] font-bold uppercase">● In Progress</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF8F00] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-[#94A3B8] font-semibold uppercase tracking-wide">Pickup</p>
                    <p className="text-sm font-bold text-[#0F172A]">NIPCO Station, Ajah</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pl-0.5">
                  <div className="ml-0.5 w-px h-4 bg-[#E2E8F0]" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border-2 border-[#1565C0] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-[#94A3B8] font-semibold uppercase tracking-wide">Dropoff</p>
                    <p className="text-sm font-bold text-[#0F172A]">15 Chevron Dr, Lekki</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-[#1565C0] font-bold">View details →</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Offline state */
          <div className="p-4 flex flex-col gap-4">
            {/* Offline banner */}
            <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-[16px] p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#FF8F00] text-sm">You're Offline</p>
                <p className="text-xs text-[#F57C00] mt-0.5">Toggle to start receiving jobs</p>
              </div>
              <Toggle on={online} onToggle={() => setOnline(true)} />
            </div>

            {/* Earnings row */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Today's Earnings</p>
                <p className="text-2xl font-extrabold text-[#0F172A]">₦0</p>
                <p className="text-[11px] text-[#94A3B8] font-semibold mt-1">Go online to earn</p>
              </div>
              <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Deliveries</p>
                <p className="text-2xl font-extrabold text-[#94A3B8]">0</p>
                <p className="text-[11px] text-[#94A3B8] font-semibold mt-1">Today</p>
              </div>
            </div>

            {/* Empty state */}
            <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-20 h-20 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <p className="font-bold text-[#475569] text-base">No jobs available</p>
              <p className="text-sm text-[#94A3B8] text-center max-w-[240px] leading-relaxed">
                You are currently offline. Toggle online to start receiving delivery requests.
              </p>
              <button
                onClick={() => setOnline(true)}
                className="mt-2 bg-[#1565C0] text-white px-6 py-3 rounded-[12px] font-bold text-sm shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
              >
                Go Online
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav screen="dashboard" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
