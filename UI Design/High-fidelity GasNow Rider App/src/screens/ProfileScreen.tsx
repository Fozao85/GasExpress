import type { NavFn } from '../types'
import { CameraIcon, EditIcon, ChevronRightIcon } from '../components/Icons'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

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

function InfoRow({ label, value, colored = false }: { label: string; value: string; colored?: boolean }) {
  return (
    <div className="flex justify-between items-center py-3.5 border-b border-[#F1F5F9] last:border-none px-4">
      <span className="text-sm text-[#475569]">{label}</span>
      <span className={`text-sm font-semibold ${colored ? 'text-[#1565C0]' : 'text-[#0F172A]'}`}>{value}</span>
    </div>
  )
}

export function ProfileScreen({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-xl font-extrabold text-[#0F172A]">My Profile</h1>
          <button
            onClick={() => nav('settings')}
            className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
          >
            <EditIcon size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Profile hero */}
        <div className="bg-white px-5 py-6 flex flex-col items-center gap-3 border-b border-[#F1F5F9]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1565C0] to-[#0D47A1] flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
              CO
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF8F00] rounded-full flex items-center justify-center border-2 border-white shadow">
              <CameraIcon size={14} />
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-extrabold text-[#0F172A]">Chidi Okonkwo</h2>
            <p className="text-xs text-[#94A3B8] mt-0.5 font-semibold">ID: RDR-00421</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-1">
            {[
              { val: '4.8', label: 'Rating', icon: '⭐' },
              { val: '142', label: 'Deliveries', icon: '📦' },
              { val: '96%', label: 'On Time', icon: '⚡' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <span className="text-base">{stat.icon}</span>
                  <p className="text-xl font-extrabold text-[#0F172A]">{stat.val}</p>
                </div>
                <p className="text-[10px] text-[#94A3B8] font-semibold mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Personal Info */}
          <div>
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Personal Info</p>
            <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
              <InfoRow label="Phone" value="+234 800 123 4567" />
              <InfoRow label="Email" value="chidi@email.com" colored />
              <InfoRow label="State" value="Lagos" />
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Vehicle</p>
            <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
              <InfoRow label="Type" value="Motorcycle" colored />
              <InfoRow label="Plate" value="LAG 324 TR" />
              <InfoRow label="Model" value="Honda CG125" />
            </div>
          </div>

          {/* Documents */}
          <div>
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Documents</p>
            <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#F1F5F9]">
                <span className="text-sm text-[#475569]">National ID</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E8F5E9] rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                  <span className="text-[10px] font-bold text-[#2E7D32]">VERIFIED</span>
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3.5">
                <span className="text-sm text-[#475569]">Vehicle Photo</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E8F5E9] rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                  <span className="text-[10px] font-bold text-[#2E7D32]">VERIFIED</span>
                </span>
              </div>
            </div>
          </div>

          {/* Settings link */}
          <button
            onClick={() => nav('settings')}
            className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-4 py-3.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#0F172A]">Settings</span>
            </div>
            <ChevronRightIcon size={16} />
          </button>

          {/* Sign out */}
          <button
            onClick={() => nav('login')}
            className="w-full py-3.5 border-2 border-[#FFEBEE] bg-[#FFEBEE] rounded-[12px] text-sm font-bold text-[#D32F2F]"
          >
            Sign Out
          </button>
        </div>
      </div>

      <BottomNav screen="profile" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
