import { useState } from "react"
import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  OTPScreen,
  IdentityScreen,
  PendingApprovalScreen,
} from "./screens/AuthScreens"
import {
  DashboardScreen,
  DashboardOfflineScreen,
  AvailableJobsScreen,
  AvailableJobsEmptyScreen,
  DeliveryRequestScreen,
} from "./screens/DashboardScreens"
import {
  PickupNavigationScreen,
  CustomerNavigationScreen,
  ActiveDeliveryScreen,
  DeliveryCompletedScreen,
} from "./screens/DeliveryScreens"
import {
  EarningsScreen,
  DeliveryHistoryScreen,
  DeliveryHistoryLoadingScreen,
  DeliveryHistoryErrorScreen,
  NotificationsScreen,
  ProfileScreen,
  SettingsScreen,
} from "./screens/ProfileScreens"

const GROUPS = [
  {
    label: "Onboarding",
    color: "#E8E8E8",
    screens: [
      { id: "splash", component: <SplashScreen /> },
      { id: "login", component: <LoginScreen /> },
      { id: "register", component: <RegisterScreen /> },
      { id: "otp", component: <OTPScreen /> },
      { id: "identity", component: <IdentityScreen /> },
      { id: "pending", component: <PendingApprovalScreen /> },
    ],
  },
  {
    label: "Dashboard & Jobs",
    color: "#E8E8E8",
    screens: [
      { id: "dashboard", component: <DashboardScreen /> },
      { id: "dashboard-offline", component: <DashboardOfflineScreen /> },
      { id: "jobs", component: <AvailableJobsScreen /> },
      { id: "jobs-empty", component: <AvailableJobsEmptyScreen /> },
      { id: "request", component: <DeliveryRequestScreen /> },
    ],
  },
  {
    label: "Delivery Flow",
    color: "#E8E8E8",
    screens: [
      { id: "pickup-nav", component: <PickupNavigationScreen /> },
      { id: "customer-nav", component: <CustomerNavigationScreen /> },
      { id: "active", component: <ActiveDeliveryScreen /> },
      { id: "completed", component: <DeliveryCompletedScreen /> },
    ],
  },
  {
    label: "Earnings, History & Profile",
    color: "#E8E8E8",
    screens: [
      { id: "earnings", component: <EarningsScreen /> },
      { id: "history", component: <DeliveryHistoryScreen /> },
      { id: "history-loading", component: <DeliveryHistoryLoadingScreen /> },
      { id: "history-error", component: <DeliveryHistoryErrorScreen /> },
      { id: "notifications", component: <NotificationsScreen /> },
      { id: "profile", component: <ProfileScreen /> },
      { id: "settings", component: <SettingsScreen /> },
    ],
  },
]

const ALL_SCREENS = GROUPS.flatMap((g) => g.screens)

export default function App() {
  const [zoom, setZoom] = useState<string | null>(null)

  const activeScreen = zoom ? ALL_SCREENS.find((s) => s.id === zoom) : null

  return (
    <div
      className="min-h-screen bg-[#EBEBEB] font-sans"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#DDDDDD] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#222] flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">G</span>
          </div>
          <div>
            <div className="text-[14px] font-bold text-[#111] leading-tight">GasNow Rider</div>
            <div className="text-[10px] text-[#999] font-mono uppercase tracking-widest">Wireframes · Rider App</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[11px] text-[#888] font-mono">
            {ALL_SCREENS.length} screens · 390×844
          </div>
          {zoom && (
            <button
              onClick={() => setZoom(null)}
              className="px-3 py-1.5 border border-[#BBBBBB] rounded-lg text-[11px] text-[#555] bg-white hover:bg-[#F5F5F5] transition-colors"
            >
              ← Back to all
            </button>
          )}
        </div>
      </div>

      {/* ── Zoomed single screen ── */}
      {activeScreen && (
        <div
          className="fixed inset-0 z-40 bg-[#EBEBEB] flex items-center justify-center pt-16"
          onClick={() => setZoom(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {activeScreen.component}
          </div>
        </div>
      )}

      {/* ── Canvas ── */}
      {!zoom && (
        <div className="px-10 py-10 flex flex-col gap-16">
          {GROUPS.map((group) => (
            <div key={group.label}>
              {/* Group header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-6 bg-[#333] rounded-full" />
                <div className="text-[13px] font-semibold text-[#333] uppercase tracking-widest font-mono">
                  {group.label}
                </div>
                <div className="flex-1 h-px bg-[#DDDDDD]" />
                <div className="text-[11px] text-[#AAAAAA] font-mono">{group.screens.length} screens</div>
              </div>

              {/* Screen row */}
              <div className="flex flex-wrap gap-10">
                {group.screens.map((screen) => (
                  <div
                    key={screen.id}
                    className="cursor-zoom-in hover:opacity-80 transition-opacity"
                    style={{ transform: "scale(0.55)", transformOrigin: "top left", marginBottom: -380 }}
                    onClick={() => setZoom(screen.id)}
                  >
                    {screen.component}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="border-t border-[#DDDDDD] pt-8 flex flex-wrap gap-8">
            <div>
              <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Annotations</div>
              <div className="flex flex-col gap-2">
                {[
                  { style: "border border-dashed border-[#AAAAAA] bg-[#EBEBEB]", label: "Placeholder element" },
                  { style: "border border-[#333] bg-[#222]", label: "Active / selected" },
                  { style: "border border-[#DDDDDD] bg-white", label: "Content card" },
                ].map(({ style, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-6 h-4 rounded ${style}`} />
                    <span className="text-[11px] text-[#666] font-mono">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Spacing</div>
              <div className="text-[11px] text-[#666] font-mono leading-relaxed">
                8px base unit · Auto Layout<br />
                390×844 frame · Grayscale only<br />
                Low-fidelity · No colour
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Screens</div>
              <div className="text-[11px] text-[#666] font-mono leading-relaxed">
                18 primary + 4 states<br />
                Click any frame to enlarge<br />
                Rider workflow order
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
