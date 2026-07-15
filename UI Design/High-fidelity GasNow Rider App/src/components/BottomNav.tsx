import type { ReactNode } from 'react'
import type { NavFn, Screen } from '../types'
import { HomeIcon, BriefcaseIcon, WalletIcon, UserIcon } from './Icons'

type Tab = 'dashboard' | 'jobs' | 'earnings' | 'profile'

const TAB_SCREENS: Record<Tab, Screen[]> = {
  dashboard: ['dashboard', 'dashboard-offline', 'notifications'],
  jobs: ['jobs', 'jobs-empty', 'delivery-request'],
  earnings: ['earnings', 'history', 'history-loading', 'history-error'],
  profile: ['profile', 'settings'],
}

function getActiveTab(screen: Screen): Tab | null {
  for (const [tab, screens] of Object.entries(TAB_SCREENS)) {
    if ((screens as Screen[]).includes(screen)) return tab as Tab
  }
  return null
}

const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  { id: 'dashboard', label: 'DASHBOARD', icon: (a) => <HomeIcon size={22} /> },
  { id: 'jobs', label: 'JOBS', icon: (a) => <BriefcaseIcon size={22} /> },
  { id: 'earnings', label: 'EARNINGS', icon: (a) => <WalletIcon size={22} /> },
  { id: 'profile', label: 'PROFILE', icon: (a) => <UserIcon size={22} /> },
]

export function BottomNav({ screen, nav }: { screen: Screen; nav: NavFn }) {
  const activeTab = getActiveTab(screen)

  const navTarget: Record<Tab, Screen> = {
    dashboard: 'dashboard',
    jobs: 'jobs',
    earnings: 'earnings',
    profile: 'profile',
  }

  return (
    <div className="flex border-t border-[#E2E8F0] bg-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => nav(navTarget[tab.id])}
            className="flex-1 flex flex-col items-center pt-3 pb-1 gap-0.5 relative"
          >
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1565C0] rounded-full" />
            )}
            <span className={isActive ? 'text-[#1565C0]' : 'text-[#94A3B8]'}>
              {tab.icon(isActive)}
            </span>
            <span
              className={`text-[9px] font-bold tracking-wide ${isActive ? 'text-[#1565C0]' : 'text-[#94A3B8]'}`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
