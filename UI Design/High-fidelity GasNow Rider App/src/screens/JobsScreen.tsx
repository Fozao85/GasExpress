import { useState } from 'react'
import type { NavFn } from '../types'
import { BellIcon } from '../components/Icons'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

const filters = ['ALL', 'NEARBY', 'HIGH PAY', 'GAS', 'KEROSENE']

const allJobs = [
  { id: 'JOB-041', vendor: 'BP Station, Lekki Phase 1', address: '22 Admiralty Way', fee: '₦ 1,200', dist: '3.8 km', time: 'Just now', type: 'GAS' },
  { id: 'JOB-040', vendor: 'Total Filling, VI', address: '148 Ozumba Mbadiwe', fee: '₦ 850', dist: '2.1 km', time: '4 min ago', type: 'GAS' },
  { id: 'JOB-038', vendor: 'Mobil Station, Surulere', address: '31 Bode Thomas St', fee: '₦ 650', dist: '1.2 km', time: '11 min ago', type: 'KEROSENE' },
  { id: 'JOB-037', vendor: 'Oando, Maryland', address: '5 Ikorodu Road', fee: '₦ 950', dist: '4.5 km', time: '18 min ago', type: 'GAS' },
]

function StatusBar() {
  return (
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
  )
}

export function JobsScreen({ nav, empty = false }: { nav: NavFn; empty?: boolean }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  if (empty) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
          <StatusBar />
          <div className="flex items-center justify-between px-5 py-3">
            <h1 className="text-xl font-extrabold text-[#0F172A]">Available Jobs</h1>
            <button
              onClick={() => nav('notifications')}
              className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
            >
              <BellIcon size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-between py-8 px-6">
          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-24 h-24 rounded-[24px] bg-[#F1F5F9] flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <h2 className="font-extrabold text-[#0F172A] text-xl">No jobs nearby</h2>
            <p className="text-sm text-[#94A3B8] text-center leading-relaxed max-w-[260px]">
              There are no delivery jobs available in your area right now. Check back shortly.
            </p>
          </div>

          {/* Refresh card */}
          <div className="w-full bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between">
            <p className="text-xs text-[#64748B]">Last checked: 2 min ago</p>
            <button className="px-4 py-2 border border-[#E2E8F0] rounded-[10px] text-xs font-bold text-[#475569] hover:bg-[#F8FAFC]">
              Refresh
            </button>
          </div>
        </div>

        <BottomNav screen="jobs" nav={nav} />
        <HomeIndicator />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-xl font-extrabold text-[#0F172A]">Available Jobs</h1>
          <button
            onClick={() => nav('notifications')}
            className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] relative"
          >
            <BellIcon size={20} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#D32F2F] rounded-full border border-white" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeFilter === f
                  ? 'bg-[#1565C0] text-white shadow-[0_2px_8px_rgba(21,101,192,0.3)]'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Mini map strip */}
      <div className="h-24 bg-[#E8ECEF] overflow-hidden relative">
        <svg width="390" height="96" viewBox="0 0 390 96">
          <rect width="390" height="96" fill="#E8F0E8" />
          <rect x="0" y="20" width="390" height="14" fill="#FFFFFF" opacity="0.7" />
          <rect x="0" y="60" width="390" height="10" fill="#FFFFFF" opacity="0.7" />
          <rect x="60" y="0" width="8" height="96" fill="#FFFFFF" opacity="0.7" />
          <rect x="140" y="0" width="12" height="96" fill="#FFFFFF" opacity="0.7" />
          <rect x="230" y="0" width="8" height="96" fill="#FFFFFF" opacity="0.7" />
          <rect x="320" y="0" width="10" height="96" fill="#FFFFFF" opacity="0.7" />
          {/* Job markers */}
          <circle cx="100" cy="72" r="8" fill="#FF8F00" opacity="0.9" />
          <circle cx="180" cy="48" r="7" fill="#1565C0" opacity="0.9" />
          <circle cx="265" cy="70" r="8" fill="#FF8F00" opacity="0.9" />
          <circle cx="350" cy="45" r="6" fill="#2E7D32" opacity="0.9" />
          {/* Rider */}
          <circle cx="200" cy="26" r="7" fill="#2E7D32" />
          <circle cx="200" cy="26" r="11" fill="#2E7D32" opacity="0.2" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-[#64748B]">
          <span className="text-[#1565C0] font-bold">{allJobs.length} jobs</span> near you
        </p>
      </div>

      {/* Job list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-2 flex flex-col gap-3">
        {allJobs.map((job) => (
          <button
            key={job.id}
            onClick={() => nav('delivery-request')}
            className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-left w-full active:scale-[0.99] transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{job.id}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${job.type === 'GAS' ? 'bg-[#E3F2FD] text-[#1565C0]' : 'bg-[#FFF3E0] text-[#FF8F00]'}`}>
                    {job.type}
                  </span>
                </div>
                <p className="font-bold text-[#0F172A] text-sm truncate">{job.vendor}</p>
                <p className="text-xs text-[#64748B] mt-0.5">→ {job.address}</p>
              </div>
              <div className="text-right ml-3 flex-shrink-0">
                <p className="font-extrabold text-[#0F172A] text-sm">{job.fee}</p>
                <p className="text-xs text-[#64748B]">{job.dist}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8]">{job.time}</span>
              <span className="px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold">
                ● AVAILABLE
              </span>
            </div>
          </button>
        ))}

        {/* Loading more */}
        <div className="flex items-center justify-center py-4 gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
          <span className="text-[11px] text-[#94A3B8] ml-1">Loading more...</span>
        </div>
      </div>

      <BottomNav screen="jobs" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
