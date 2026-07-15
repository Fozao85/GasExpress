import type { NavFn } from '../types'
import { ArrowLeftIcon } from '../components/Icons'
import { BottomNav } from '../components/BottomNav'
import { HomeIndicator } from './LoginScreen'

const newNotifs = [
  { icon: '📦', title: 'New delivery request', body: 'Pickup at BP Lekki Phase 1 — ₦ 1,200 · 3.8 km', time: '2 min ago', unread: true },
  { icon: '💰', title: 'Earnings deposited', body: '₦ 4,250 has been added to your wallet', time: '1 hr ago', unread: true },
  { icon: '⭐', title: 'Rating received', body: 'Amara gave you ★★★★★ for JOB-040', time: '2 hrs ago', unread: true },
]

const earlierNotifs = [
  { icon: '🎁', title: 'Bonus unlocked', body: 'Complete 5 more deliveries to earn ₦ 500 bonus', time: 'Yesterday', unread: false },
  { icon: '✅', title: 'Account verified', body: 'Your identity documents have been approved', time: 'Jan 10', unread: false },
  { icon: '✏️', title: 'Profile updated', body: 'Your vehicle details have been saved', time: 'Jan 9', unread: false },
  { icon: '🚀', title: 'Welcome to GasNow!', body: 'Your rider account is ready. Start accepting jobs now.', time: 'Jan 8', unread: false },
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

function NotifItem({ icon, title, body, time, unread }: { icon: string; title: string; body: string; time: string; unread: boolean }) {
  return (
    <div className={`flex gap-3 px-5 py-4 ${unread ? 'bg-[#F0F6FF]' : 'bg-white'} border-b border-[#F1F5F9] last:border-none`}>
      <div className="flex items-start gap-2.5 flex-1">
        {unread && <div className="w-2 h-2 rounded-full bg-[#1565C0] flex-shrink-0 mt-1.5" />}
        {!unread && <div className="w-2 flex-shrink-0" />}
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm font-bold text-[#0F172A]">{title}</p>
            <span className="text-[10px] text-[#94A3B8] font-medium whitespace-nowrap flex-shrink-0 mt-0.5">{time}</span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}

export function NotificationsScreen({ nav }: { nav: NavFn }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F1F5F9]">
        <h1 className="text-xl font-extrabold text-[#0F172A]">Notifications</h1>
        <button className="text-xs font-bold text-[#1565C0]">Mark all read</button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* New section */}
        <div>
          <div className="px-5 py-2 bg-[#F8FAFC]">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">New</p>
          </div>
          {newNotifs.map((n) => (
            <NotifItem key={n.title} {...n} />
          ))}
        </div>

        {/* Earlier section */}
        <div>
          <div className="px-5 py-2 bg-[#F8FAFC]">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Earlier</p>
          </div>
          {earlierNotifs.map((n) => (
            <NotifItem key={n.title} {...n} />
          ))}
        </div>
      </div>

      <BottomNav screen="notifications" nav={nav} />
      <HomeIndicator />
    </div>
  )
}
