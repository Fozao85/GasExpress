import { useState } from 'react'
import type { NavFn } from '../types'
import { SearchIcon, ArrowLeftIcon, RefreshIcon, AlertCircleIcon } from '../components/Icons'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

type HistoryVariant = 'list' | 'loading' | 'error'

const statusFilters = ['ALL', 'COMPLETED', 'CANCELLED', 'FAILED']

const deliveries = {
  'TODAY — JAN 12, 2026': [
    { id: 'JOB-041', time: 'Today, 14:32', amount: '₦ 1,200', status: 'Completed' },
    { id: 'JOB-040', time: 'Today, 11:10', amount: '₦ 850', status: 'Completed' },
    { id: 'JOB-039', time: 'Today, 09:45', amount: '₦ 680', status: 'Cancelled' },
  ],
  'YESTERDAY — JAN 11, 2026': [
    { id: 'JOB-038', time: 'Today, 18:22', amount: '₦ 950', status: 'Completed' },
    { id: 'JOB-037', time: 'Today, 15:05', amount: '₦ 720', status: 'Completed' },
  ],
}

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

export function DeliveryHistoryScreen({ nav, variant = 'list' }: { nav: NavFn; variant?: HistoryVariant }) {
  const [filter, setFilter] = useState('ALL')

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-xl font-extrabold text-[#0F172A]">Delivery History</h1>
          <button className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>

        {variant === 'list' && (
          <>
            {/* Search */}
            <div className="px-5 pb-3">
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  <SearchIcon size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search deliveries..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-sm placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0]"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
              {statusFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                    filter === f
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-[#F1F5F9] text-[#475569]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Loading state */}
      {variant === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-[#1565C0]"
                style={{ animation: `pulse 0.8s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">Loading History...</p>
          <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
        </div>
      )}

      {/* Error state */}
      {variant === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
          <div className="w-16 h-16 rounded-full bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
            <AlertCircleIcon size={28} />
          </div>
          <h2 className="font-bold text-[#0F172A] text-lg">Could not load history</h2>
          <p className="text-sm text-[#64748B] text-center">Check your internet connection and try again.</p>
          <button className="border border-[#E2E8F0] px-6 py-2.5 rounded-[10px] text-sm font-bold text-[#475569] hover:bg-[#F8FAFC]">
            Try Again
          </button>
        </div>
      )}

      {/* List */}
      {variant === 'list' && (
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3">
          {Object.entries(deliveries).map(([date, items]) => (
            <div key={date} className="mb-5">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">{date}</p>
              <div className="flex flex-col gap-2">
                {items.map((d) => (
                  <div key={d.id} className="bg-white rounded-[14px] px-4 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${
                        d.status === 'Completed' ? 'bg-[#E8F5E9]' : 'bg-[#FFEBEE]'
                      }`}>
                        {d.status === 'Completed' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">{d.id}</p>
                        <p className="text-xs text-[#94A3B8]">{d.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#0F172A]">{d.amount}</p>
                      <p className={`text-[10px] font-bold ${d.status === 'Completed' ? 'text-[#2E7D32]' : 'text-[#D32F2F]'}`}>
                        {d.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav screen="history" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
