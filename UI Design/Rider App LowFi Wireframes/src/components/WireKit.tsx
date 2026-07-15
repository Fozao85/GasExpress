import React from "react"

// ─── Primitives ───────────────────────────────────────────────────────────────

export const WireBox = ({
  w = "100%",
  h = 48,
  label = "",
  className = "",
  style = {},
}: {
  w?: string | number
  h?: string | number
  label?: string
  className?: string
  style?: React.CSSProperties
}) => (
  <div
    className={`flex items-center justify-center border border-dashed border-[#AAAAAA] bg-[#EBEBEB] text-[#888888] text-[10px] font-mono uppercase tracking-widest select-none ${className}`}
    style={{ width: w, height: h, ...style }}
  >
    {label}
  </div>
)

export const WireMap = ({ h = 200, label = "Map" }: { h?: number; label?: string }) => (
  <div
    className="relative flex items-center justify-center bg-[#DCDCDC] border border-[#AAAAAA] w-full overflow-hidden"
    style={{ height: h }}
  >
    {/* grid lines */}
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#C8C8C8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* road lines */}
      <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#B8B8B8" strokeWidth="2" />
      <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#B8B8B8" strokeWidth="2" />
      <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#B8B8B8" strokeWidth="1.5" />
      <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#B8B8B8" strokeWidth="1.5" />
    </svg>
    {/* location pin */}
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#555] bg-[#888] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#EBEBEB]" />
      </div>
      <div className="mt-0.5 w-0.5 h-3 bg-[#555]" />
    </div>
    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#666] uppercase tracking-widest">
      {label}
    </span>
  </div>
)

export const WireAvatar = ({ size = 48, label = "Avatar" }: { size?: number; label?: string }) => (
  <div
    className="rounded-full border border-dashed border-[#AAAAAA] bg-[#EBEBEB] flex items-center justify-center text-[10px] font-mono text-[#888] uppercase tracking-widest shrink-0"
    style={{ width: size, height: size }}
  >
    {label}
  </div>
)

export const WireIcon = ({
  size = 24,
  label = "",
  active = false,
}: {
  size?: number
  label?: string
  active?: boolean
}) => (
  <div
    className={`flex flex-col items-center justify-center border border-dashed rounded ${active ? "border-[#333] bg-[#333]" : "border-[#AAAAAA] bg-[#EBEBEB]"}`}
    style={{ width: size, height: size }}
  >
    {label && (
      <span className={`text-[7px] font-mono uppercase ${active ? "text-white" : "text-[#888]"}`}>
        {label.slice(0, 3)}
      </span>
    )}
  </div>
)

export const WireText = ({
  lines = 1,
  w = "100%",
  h = 10,
  gap = 6,
  widths,
}: {
  lines?: number
  w?: string | number
  h?: number
  gap?: number
  widths?: string[]
}) => (
  <div className="flex flex-col" style={{ gap }}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="rounded-sm bg-[#D8D8D8]"
        style={{
          height: h,
          width: widths ? widths[i] ?? "100%" : w,
        }}
      />
    ))}
  </div>
)

export const WireInput = ({
  label,
  placeholder = "...",
}: {
  label?: string
  placeholder?: string
  type?: string
}) => (
  <div className="flex flex-col gap-[6px] w-full">
    {label && <span className="text-[11px] font-medium text-[#333] tracking-tight">{label}</span>}
    <div className="h-11 w-full border border-[#BBBBBB] bg-white rounded-lg flex items-center px-3 gap-2">
      <WireIcon size={16} />
      <span className="text-[12px] text-[#AAAAAA] font-mono">{placeholder}</span>
    </div>
  </div>
)

export const WireButton = ({
  label,
  variant = "primary",
  full = true,
  small = false,
}: {
  label: string
  variant?: "primary" | "secondary" | "ghost" | "danger"
  full?: boolean
  small?: boolean
}) => {
  const base = `flex items-center justify-center rounded-lg font-medium tracking-tight select-none`
  const variants = {
    primary: "bg-[#222222] text-white border border-[#222222]",
    secondary: "bg-white text-[#222222] border border-[#BBBBBB]",
    ghost: "bg-transparent text-[#555555] border border-transparent",
    danger: "bg-[#555555] text-white border border-[#555555]",
  }
  return (
    <div
      className={`${base} ${variants[variant]} ${full ? "w-full" : "px-4"} ${small ? "h-8 text-[11px]" : "h-11 text-[13px]"}`}
    >
      {label}
    </div>
  )
}

export const WireBadge = ({ label, dot = false }: { label: string; dot?: boolean }) => (
  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#BBBBBB] bg-[#EBEBEB]">
    {dot && <div className="w-1.5 h-1.5 rounded-full bg-[#555]" />}
    <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest">{label}</span>
  </div>
)

export const WireDivider = () => <div className="w-full h-px bg-[#E5E5E5]" />

export const WireToggle = ({ on = false, label = "" }: { on?: boolean; label?: string }) => (
  <div className="flex items-center gap-2">
    {label && <span className="text-[12px] text-[#333]">{label}</span>}
    <div
      className={`relative w-12 h-6 rounded-full border ${on ? "bg-[#333] border-[#333]" : "bg-[#E5E5E5] border-[#BBBBBB]"}`}
    >
      <div
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white border border-[#BBBBBB] transition-all ${on ? "left-[calc(100%-21px)]" : "left-[3px]"}`}
      />
    </div>
  </div>
)

// ─── Layout shells ─────────────────────────────────────────────────────────────

export const StatusBar = () => (
  <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
    <span className="text-[12px] font-semibold text-[#222]">9:41</span>
    <div className="flex items-center gap-1.5">
      <WireIcon size={14} label="Sig" />
      <WireIcon size={14} label="Wf" />
      <WireIcon size={14} label="Bat" />
    </div>
  </div>
)

export const TopBar = ({
  title,
  back = false,
  right,
}: {
  title: string
  back?: boolean
  right?: React.ReactNode
}) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] bg-white shrink-0">
    <div className="flex items-center gap-2 min-w-0">
      {back && (
        <div className="flex items-center justify-center w-8 h-8 border border-[#BBBBBB] rounded-lg bg-[#EBEBEB] shrink-0">
          <span className="text-[10px] font-mono text-[#555]">←</span>
        </div>
      )}
      <span className="text-[15px] font-semibold text-[#111] truncate">{title}</span>
    </div>
    {right ?? <div className="w-8" />}
  </div>
)

export const BottomNav = ({
  active = "dashboard",
}: {
  active?: "dashboard" | "jobs" | "earnings" | "profile"
}) => {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "jobs", label: "Jobs" },
    { id: "earnings", label: "Earnings" },
    { id: "profile", label: "Profile" },
  ] as const

  return (
    <div className="flex items-center justify-around px-2 pt-2 pb-4 border-t border-[#E5E5E5] bg-white shrink-0">
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <div key={item.id} className="flex flex-col items-center gap-1 flex-1">
            <WireIcon size={24} active={isActive} />
            <span
              className={`text-[9px] font-mono uppercase tracking-widest ${isActive ? "text-[#222]" : "text-[#AAAAAA]"}`}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export const PhoneFrame = ({
  children,
  label,
  tag,
}: {
  children: React.ReactNode
  label: string
  tag?: string
}) => (
  <div className="flex flex-col items-center shrink-0">
    <div
      className="relative bg-white overflow-hidden flex flex-col"
      style={{
        width: 390,
        height: 844,
        border: "2px solid #333333",
        borderRadius: 44,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#333] rounded-b-2xl z-50" />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: 28 }}>
        {children}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#333] rounded-full" />
    </div>
    <div className="mt-4 text-center">
      <span className="text-[11px] font-mono text-[#999] uppercase tracking-widest">{tag ?? ""}</span>
      <div className="text-[13px] font-semibold text-[#333] mt-0.5">{label}</div>
    </div>
  </div>
)

// ─── Stat card ─────────────────────────────────────────────────────────────────

export const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) => (
  <div className="flex-1 border border-[#E5E5E5] rounded-xl p-3 bg-white">
    <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">{label}</div>
    <div className="text-[22px] font-bold text-[#111] mt-1 leading-none">{value}</div>
    {sub && <div className="text-[10px] text-[#888] mt-1">{sub}</div>}
  </div>
)

// ─── Job card ──────────────────────────────────────────────────────────────────

export const JobCard = ({
  id = "JOB-001",
  distance = "2.4 km",
  fee = "₦ 850",
  from = "BP Station, Lekki",
  to = "15 Admiralty Way",
  time = "3 min ago",
}: {
  id?: string
  distance?: string
  fee?: string
  from?: string
  to?: string
  time?: string
}) => (
  <div className="border border-[#E5E5E5] rounded-xl p-3 bg-white flex flex-col gap-2">
    <div className="flex items-start justify-between">
      <div>
        <span className="text-[10px] font-mono text-[#999] uppercase tracking-widest">{id}</span>
        <div className="text-[12px] font-semibold text-[#111] mt-0.5 leading-tight">{from}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-2 h-px bg-[#999]" />
          <div className="text-[11px] text-[#666]">{to}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[16px] font-bold text-[#111]">{fee}</div>
        <div className="text-[10px] text-[#999] mt-0.5">{distance}</div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-1 border-t border-[#F0F0F0]">
      <span className="text-[10px] text-[#AAAAAA]">{time}</span>
      <WireBadge label="Available" dot />
    </div>
  </div>
)

// ─── Delivery row ──────────────────────────────────────────────────────────────

export const DeliveryRow = ({
  id = "JOB-001",
  date = "Today, 14:32",
  fee = "₦ 850",
  status = "Completed",
}: {
  id?: string
  date?: string
  fee?: string
  status?: string
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[#F0F0F0]">
    <div className="flex items-center gap-3">
      <WireIcon size={36} label="pkg" />
      <div>
        <div className="text-[12px] font-semibold text-[#111]">{id}</div>
        <div className="text-[10px] text-[#999]">{date}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-[13px] font-bold text-[#111]">{fee}</div>
      <div className="text-[10px] text-[#999]">{status}</div>
    </div>
  </div>
)

// ─── Notification row ──────────────────────────────────────────────────────────

export const NotifRow = ({
  title = "New delivery request",
  body = "Pickup at BP Lekki – ₦ 850",
  time = "2 min ago",
  unread = true,
}: {
  title?: string
  body?: string
  time?: string
  unread?: boolean
}) => (
  <div className={`flex items-start gap-3 py-3 px-4 border-b border-[#F0F0F0] ${unread ? "bg-[#F8F8F8]" : "bg-white"}`}>
    {unread && <div className="w-2 h-2 rounded-full bg-[#333] mt-1.5 shrink-0" />}
    {!unread && <div className="w-2 shrink-0" />}
    <div className="flex-1 min-w-0">
      <div className="text-[12px] font-semibold text-[#111]">{title}</div>
      <div className="text-[11px] text-[#777] mt-0.5 leading-tight">{body}</div>
    </div>
    <div className="text-[10px] text-[#AAAAAA] shrink-0">{time}</div>
  </div>
)

// ─── Settings row ──────────────────────────────────────────────────────────────

export const SettingsRow = ({
  label,
  value,
  toggle,
  on,
}: {
  label: string
  value?: string
  toggle?: boolean
  on?: boolean
}) => (
  <div className="flex items-center justify-between py-3.5 px-4 border-b border-[#F0F0F0] bg-white">
    <span className="text-[13px] text-[#222]">{label}</span>
    {toggle ? (
      <WireToggle on={on} />
    ) : (
      <div className="flex items-center gap-2">
        {value && <span className="text-[12px] text-[#999]">{value}</span>}
        <span className="text-[#BBBBBB] text-[12px]">›</span>
      </div>
    )}
  </div>
)

// ─── Empty / Error / Loading states ───────────────────────────────────────────

export const EmptyState = ({
  icon = "[ ]",
  title = "Nothing here yet",
  body = "Items will appear here once available",
}: {
  icon?: string
  title?: string
  body?: string
}) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
    <div className="text-[40px] text-[#CCCCCC] font-mono">{icon}</div>
    <div className="text-[14px] font-semibold text-[#333]">{title}</div>
    <div className="text-[12px] text-[#999] leading-relaxed">{body}</div>
  </div>
)

export const ErrorState = ({
  title = "Something went wrong",
  body = "We could not load this content. Please try again.",
}: {
  title?: string
  body?: string
}) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
    <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#BBBBBB] bg-[#EBEBEB] flex items-center justify-center">
      <span className="text-[20px] font-mono text-[#888]">!</span>
    </div>
    <div className="text-[14px] font-semibold text-[#333]">{title}</div>
    <div className="text-[12px] text-[#999] leading-relaxed">{body}</div>
    <WireButton label="Try Again" variant="secondary" full={false} />
  </div>
)

export const LoadingState = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4">
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#CCCCCC]" />
      ))}
    </div>
    <span className="text-[12px] font-mono text-[#AAAAAA] uppercase tracking-widest">{label}</span>
  </div>
)

// ─── Location row ──────────────────────────────────────────────────────────────

export const LocationRow = ({
  label,
  address,
  dot = "○",
}: {
  label: string
  address: string
  dot?: string
}) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center gap-1 pt-0.5">
      <span className="text-[14px] font-mono text-[#555]">{dot}</span>
      <div className="w-px flex-1 bg-[#DDDDDD]" style={{ minHeight: 16 }} />
    </div>
    <div className="pb-3">
      <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">{label}</div>
      <div className="text-[13px] font-medium text-[#111] mt-0.5">{address}</div>
    </div>
  </div>
)
