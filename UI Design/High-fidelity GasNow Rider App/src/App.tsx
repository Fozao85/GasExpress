import { useState } from 'react'
import type { Screen } from './types'
import { SplashScreen } from './screens/SplashScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { OTPScreen } from './screens/OTPScreen'
import { IdentityVerificationScreen } from './screens/IdentityVerificationScreen'
import { PendingApprovalScreen } from './screens/PendingApprovalScreen'
import { DashboardScreen } from './screens/DashboardScreen'
import { JobsScreen } from './screens/JobsScreen'
import { DeliveryRequestModal } from './screens/DeliveryRequestModal'
import { PickupNavScreen } from './screens/PickupNavScreen'
import { CustomerNavScreen } from './screens/CustomerNavScreen'
import { ActiveTrackingScreen } from './screens/ActiveTrackingScreen'
import { DeliveryCompleteScreen } from './screens/DeliveryCompleteScreen'
import { EarningsScreen } from './screens/EarningsScreen'
import { DeliveryHistoryScreen } from './screens/DeliveryHistoryScreen'
import { NotificationsScreen } from './screens/NotificationsScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { SettingsScreen } from './screens/SettingsScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const nav = (s: Screen) => setScreen(s)

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen nav={nav} />
      case 'login': return <LoginScreen nav={nav} />
      case 'register': return <RegisterScreen nav={nav} />
      case 'otp': return <OTPScreen nav={nav} />
      case 'identity': return <IdentityVerificationScreen nav={nav} />
      case 'pending': return <PendingApprovalScreen nav={nav} />
      case 'dashboard':
      case 'dashboard-offline': return <DashboardScreen nav={nav} />
      case 'jobs': return <JobsScreen nav={nav} />
      case 'jobs-empty': return <JobsScreen nav={nav} empty />
      case 'delivery-request': return <DeliveryRequestModal nav={nav} />
      case 'pickup-nav': return <PickupNavScreen nav={nav} />
      case 'customer-nav': return <CustomerNavScreen nav={nav} />
      case 'active-tracking': return <ActiveTrackingScreen nav={nav} />
      case 'delivery-complete': return <DeliveryCompleteScreen nav={nav} />
      case 'earnings': return <EarningsScreen nav={nav} />
      case 'history': return <DeliveryHistoryScreen nav={nav} />
      case 'history-loading': return <DeliveryHistoryScreen nav={nav} variant="loading" />
      case 'history-error': return <DeliveryHistoryScreen nav={nav} variant="error" />
      case 'notifications': return <NotificationsScreen nav={nav} />
      case 'profile': return <ProfileScreen nav={nav} />
      case 'settings': return <SettingsScreen nav={nav} />
      default: return <SplashScreen nav={nav} />
    }
  }

  return (
    <div className="min-h-screen bg-[#1C2B3A] flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 60% 30%, #1a3a5c 0%, #0d1f2e 60%, #0a1520 100%)',
      }}
    >
      {/* Desktop: phone mockup; mobile: full screen */}
      <div className="hidden sm:flex flex-col">
        {/* Phone notch */}
        <div className="w-[390px] h-[844px] bg-white relative overflow-hidden rounded-[44px] shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col">
          {renderScreen()}
        </div>
        {/* Navigation hint */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-[480px]">
          {(
            [
              ['splash', 'Splash'],
              ['login', 'Login'],
              ['register', 'Register'],
              ['otp', 'OTP'],
              ['identity', 'Identity'],
              ['pending', 'Pending'],
              ['dashboard', 'Dashboard'],
              ['jobs', 'Jobs'],
              ['jobs-empty', 'Jobs Empty'],
              ['delivery-request', 'Request'],
              ['pickup-nav', 'Pickup Nav'],
              ['customer-nav', 'Customer Nav'],
              ['active-tracking', 'Active'],
              ['delivery-complete', 'Complete'],
              ['earnings', 'Earnings'],
              ['history', 'History'],
              ['history-loading', 'Loading'],
              ['history-error', 'Error'],
              ['notifications', 'Notifications'],
              ['profile', 'Profile'],
              ['settings', 'Settings'],
            ] as [Screen, string][]
          ).map(([s, label]) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition ${
                screen === s
                  ? 'bg-[#1565C0] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="sm:hidden w-full h-screen bg-white flex flex-col">
        {renderScreen()}
      </div>
    </div>
  )
}
