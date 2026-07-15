import { useState } from 'react'
import type { NavFn } from '../types'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

const periods = ['TODAY', 'WEEK', 'MONTH', 'ALL TIME']

const dailyBars = [
  { day: 'M', val: 65 },
  { day: 'T', val: 48 },
  { day: 'W', val: 85 },
  { day: 'T', val: 70 },
  { day: 'F', val: 92 },
  { day: 'S', val: 100 },
  { day: 'S', val: 55 },
]

const recentDeliveries = [
  { id: 'JOB-041', time: 'Today, 14:32', amount: '₦ 1,200', status: 'Completed' },
  { id: 'JOB-040', time: 'Today, 11:10', amount: '₦ 850', status: 'Completed' },
  { id: 'JOB-039', time: 'Today, 09:45', amount: '₦ 680', status: 'Cancelled' },
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

export function EarningsScreen({ nav }: { nav: NavFn }) {
  const [period, setPeriod] = useState('WEEK')

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />
        <div className="px-5 py-3">
          <h1 className="text-xl font-extrabold text-[#0F172A]">Earnings</h1>
        </div>

        {/* Period tabs */}
        <div className="flex mx-5 mb-3 bg-[#F1F5F9] rounded-[12px] p-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-[10px] text-[10px] font-bold transition ${
                period === p ? 'bg-white text-[#1565C0] shadow-sm' : 'text-[#94A3B8]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 flex flex-col gap-4">
        {/* Main earnings card */}
        <div className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] rounded-[20px] p-5 text-white shadow-[0_8px_24px_rgba(21,101,192,0.35)]">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">This Week</p>
          <p className="text-4xl font-extrabold">₦ 24,650</p>
          <p className="text-white/60 text-xs mt-1">Jan 6 – Jan 12, 2026</p>
          <div className="mt-4 flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                <polyline points="2 7 5 3 8 7" />
              </svg>
            </div>
            <span className="text-xs text-white/80 font-semibold">+18% vs last week</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Deliveries</p>
            <p className="text-2xl font-extrabold text-[#0F172A]">29</p>
            <p className="text-[11px] text-[#64748B] mt-1">This week</p>
          </div>
          <div className="flex-1 bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Avg/Delivery</p>
            <p className="text-2xl font-extrabold text-[#0F172A]">₦850</p>
            <p className="text-[11px] text-[#2E7D32] mt-1">+₦120 vs last wk</p>
          </div>
        </div>

        {/* Daily earnings chart */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Daily Earnings</p>
          <div className="flex items-end gap-2 h-24">
            {dailyBars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex-1 w-full flex items-end">
                  <div
                    className="w-full rounded-t-[6px] transition-all"
                    style={{
                      height: `${bar.val}%`,
                      background: bar.day === 'S' && i === 5 ? '#1565C0' : '#E3F2FD',
                    }}
                  />
                </div>
                <span className={`text-[9px] font-bold ${bar.day === 'S' && i === 5 ? 'text-[#1565C0]' : 'text-[#94A3B8]'}`}>
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet balance */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-1">Wallet Balance</p>
            <p className="text-2xl font-extrabold text-[#0F172A]">₦ 18,432</p>
          </div>
          <button className="bg-[#0F172A] text-white px-5 py-2.5 rounded-[10px] font-bold text-sm">
            Withdraw
          </button>
        </div>

        {/* Recent deliveries */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#0F172A]">Recent Deliveries</h2>
            <button onClick={() => nav('history')} className="text-xs font-bold text-[#1565C0]">
              View history
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentDeliveries.map((d) => (
              <div key={d.id} className="bg-white rounded-[14px] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#E3F2FD] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1565C0">
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{d.id}</p>
                    <p className="text-xs text-[#94A3B8]">{d.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#0F172A]">{d.amount}</p>
                  <span
                    className={`text-[10px] font-bold ${
                      d.status === 'Completed' ? 'text-[#2E7D32]' : 'text-[#D32F2F]'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav screen="earnings" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
