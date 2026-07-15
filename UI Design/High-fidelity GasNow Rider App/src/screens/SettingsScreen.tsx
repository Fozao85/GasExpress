import { useState } from 'react'
import type { NavFn } from '../types'
import { ArrowLeftIcon, ChevronRightIcon } from '../components/Icons'
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

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#1565C0]' : 'bg-[#CBD5E1]'}`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow ${on ? 'translate-x-7' : 'translate-x-1'}`}
      />
    </button>
  )
}

function SettingRow({
  label,
  value,
  toggleOn,
  onToggle,
  colored = false,
}: {
  label: string
  value?: string
  toggleOn?: boolean
  onToggle?: () => void
  colored?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-[#F1F5F9] last:border-none">
      <span className={`text-sm font-medium ${colored ? 'text-[#1565C0]' : 'text-[#0F172A]'}`}>{label}</span>
      {onToggle !== undefined ? (
        <Toggle on={!!toggleOn} onToggle={onToggle} />
      ) : (
        <div className="flex items-center gap-1 text-[#64748B]">
          {value && <span className="text-sm">{value}</span>}
          <ChevronRightIcon size={14} />
        </div>
      )}
    </div>
  )
}

export function SettingsScreen({ nav }: { nav: NavFn }) {
  const [push, setPush] = useState(true)
  const [jobAlerts, setJobAlerts] = useState(true)
  const [earnings, setEarnings] = useState(true)
  const [promos, setPromos] = useState(false)
  const [offlineMaps, setOfflineMaps] = useState(false)

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="bg-white shadow-[0_1px_0_#E2E8F0]">
        <StatusBar />
        <div className="flex items-center gap-3 px-5 py-3">
          <button
            onClick={() => nav('profile')}
            className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
          >
            <ArrowLeftIcon size={18} />
          </button>
          <h1 className="text-lg font-bold text-[#0F172A]">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 flex flex-col gap-4">
        {/* Notifications */}
        <div>
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Notifications</p>
          <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <SettingRow label="Push Notifications" toggleOn={push} onToggle={() => setPush(!push)} colored />
            <SettingRow label="New Job Alerts" toggleOn={jobAlerts} onToggle={() => setJobAlerts(!jobAlerts)} colored />
            <SettingRow label="Earnings Updates" toggleOn={earnings} onToggle={() => setEarnings(!earnings)} colored />
            <SettingRow label="Promotions & Bonuses" toggleOn={promos} onToggle={() => setPromos(!promos)} colored />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Navigation</p>
          <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <SettingRow label="Default Map App" value="Google Maps" colored />
            <SettingRow label="Route Preference" value="Fastest" colored />
            <SettingRow label="Offline Maps" toggleOn={offlineMaps} onToggle={() => setOfflineMaps(!offlineMaps)} colored />
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Account</p>
          <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <SettingRow label="Change Password" colored />
            <SettingRow label="Linked Bank Account" value="****4521" colored />
            <SettingRow label="Language" value="English" colored />
            <SettingRow label="Privacy Policy" colored />
            <SettingRow label="Terms of Service" colored />
          </div>
        </div>

        {/* Danger zone */}
        <div>
          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2 px-1">Account Actions</p>
          <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-4 py-4 border-b border-[#F1F5F9]">
              <button className="text-sm font-medium text-[#D32F2F]">Delete Account</button>
            </div>
            <div className="px-4 py-4">
              <button onClick={() => nav('login')} className="text-sm font-medium text-[#D32F2F]">Sign Out</button>
            </div>
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-[11px] text-[#CBD5E1] font-medium">GasNow Rider v1.0.0 · Build 42</p>
      </div>

      <BottomNav screen="settings" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
