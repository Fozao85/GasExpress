import {
  PhoneFrame,
  StatusBar,
  TopBar,
  BottomNav,
  WireAvatar,
  WireButton,
  WireIcon,
  WireBadge,
  StatCard,
  DeliveryRow,
  NotifRow,
  SettingsRow,
  ErrorState,
  LoadingState,
} from "../components/WireKit"

// ── 14. Earnings ───────────────────────────────────────────────────────────────

export const EarningsScreen = () => (
  <PhoneFrame label="Earnings" tag="14">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Earnings" />

      <div className="flex-1 overflow-y-auto bg-[#F8F8F8] flex flex-col gap-4 px-4 py-4">
        {/* Period selector */}
        <div className="flex bg-[#EBEBEB] rounded-xl p-1 gap-1">
          {["Today", "Week", "Month", "All Time"].map((tab, i) => (
            <div
              key={tab}
              className={`flex-1 py-2 rounded-lg text-center text-[11px] font-mono uppercase tracking-widest ${i === 1 ? "bg-white text-[#222] shadow-sm" : "text-[#888]"}`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Main earning */}
        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-5 text-center">
          <div className="text-[11px] font-mono text-[#999] uppercase tracking-widest">This Week</div>
          <div className="text-[40px] font-bold text-[#111] mt-1 leading-none">₦ 24,650</div>
          <div className="text-[12px] text-[#888] mt-2">Jan 6 – Jan 12, 2026</div>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <StatCard label="Deliveries" value="29" sub="This week" />
          <StatCard label="Avg/Delivery" value="₦ 850" sub="+₦120 vs last wk" />
        </div>

        {/* Chart placeholder */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-4">
          <div className="text-[11px] font-mono text-[#999] uppercase tracking-widest mb-3">Daily Earnings</div>
          <div className="flex items-end gap-2 h-20">
            {[60, 85, 40, 95, 70, 100, 55].map((pct, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-sm ${i === 5 ? "bg-[#333]" : "bg-[#DDDDDD]"}`}
                  style={{ height: `${pct}%` }}
                />
                <div className="text-[8px] font-mono text-[#AAAAAA]">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-[#999] uppercase tracking-widest">Wallet Balance</div>
            <div className="text-[20px] font-bold text-[#111] mt-0.5">₦ 18,432</div>
          </div>
          <WireButton label="Withdraw" variant="primary" full={false} small />
        </div>

        {/* Recent */}
        <div>
          <div className="text-[13px] font-semibold text-[#111] mb-2">Recent Deliveries</div>
          <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
            <DeliveryRow id="JOB-041" date="Today, 14:32" fee="₦ 1,200" status="Completed" />
            <DeliveryRow id="JOB-040" date="Today, 11:10" fee="₦ 850" status="Completed" />
            <DeliveryRow id="JOB-039" date="Today, 09:45" fee="₦ 680" status="Completed" />
          </div>
        </div>
      </div>

      <BottomNav active="earnings" />
    </div>
  </PhoneFrame>
)

// ── 15. Delivery History ───────────────────────────────────────────────────────

export const DeliveryHistoryScreen = () => (
  <PhoneFrame label="Delivery History" tag="15">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Delivery History"
        right={<WireIcon size={28} label="Filter" />}
      />

      {/* Search */}
      <div className="px-4 py-3 bg-white border-b border-[#E5E5E5]">
        <div className="h-10 border border-[#DDDDDD] rounded-xl bg-[#F8F8F8] flex items-center px-3 gap-2">
          <WireIcon size={16} label="Srch" />
          <span className="text-[12px] text-[#AAAAAA] font-mono">Search deliveries...</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#E5E5E5] overflow-x-auto shrink-0">
        {["All", "Completed", "Cancelled", "Failed"].map((tab, i) => (
          <div
            key={tab}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest whitespace-nowrap ${i === 0 ? "bg-[#222] text-white" : "bg-[#EBEBEB] text-[#666] border border-[#DDDDDD]"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F8F8F8]">
        {/* Date group */}
        {[
          {
            date: "Today — Jan 12, 2026",
            items: [
              { id: "JOB-041", time: "14:32", fee: "₦ 1,200", status: "Completed" },
              { id: "JOB-040", time: "11:10", fee: "₦ 850", status: "Completed" },
              { id: "JOB-039", time: "09:45", fee: "₦ 680", status: "Cancelled" },
            ],
          },
          {
            date: "Yesterday — Jan 11, 2026",
            items: [
              { id: "JOB-038", time: "18:22", fee: "₦ 950", status: "Completed" },
              { id: "JOB-037", time: "15:05", fee: "₦ 720", status: "Completed" },
            ],
          },
        ].map(({ date, items }) => (
          <div key={date} className="px-4 pt-4">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">{date}</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              {items.map((item) => (
                <DeliveryRow
                  key={item.id}
                  id={item.id}
                  date={`Today, ${item.time}`}
                  fee={item.fee}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="earnings" />
    </div>
  </PhoneFrame>
)

// ── 15b. Delivery History — Loading ───────────────────────────────────────────

export const DeliveryHistoryLoadingScreen = () => (
  <PhoneFrame label="History – Loading" tag="15b">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Delivery History" />
      <div className="flex-1 bg-[#F8F8F8]">
        <LoadingState label="Loading history..." />
      </div>
      <BottomNav active="earnings" />
    </div>
  </PhoneFrame>
)

// ── 15c. Delivery History — Error ─────────────────────────────────────────────

export const DeliveryHistoryErrorScreen = () => (
  <PhoneFrame label="History – Error" tag="15c">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Delivery History" />
      <div className="flex-1 bg-[#F8F8F8]">
        <ErrorState
          title="Could not load history"
          body="Check your internet connection and try again."
        />
      </div>
      <BottomNav active="earnings" />
    </div>
  </PhoneFrame>
)

// ── 16. Notifications ──────────────────────────────────────────────────────────

export const NotificationsScreen = () => (
  <PhoneFrame label="Notifications" tag="16">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Notifications"
        right={
          <span className="text-[11px] text-[#555] font-mono">Mark all read</span>
        }
      />

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4 py-2 text-[10px] font-mono text-[#999] uppercase tracking-widest border-b border-[#F0F0F0]">
          New
        </div>
        <NotifRow
          title="New delivery request"
          body="Pickup at BP Lekki Phase 1 – ₦ 1,200 · 3.8 km"
          time="2 min ago"
          unread
        />
        <NotifRow
          title="Earnings deposited"
          body="₦ 4,250 has been added to your wallet"
          time="1 hr ago"
          unread
        />
        <NotifRow
          title="Rating received"
          body="Amara gave you ★★★★★ for JOB-040"
          time="2 hrs ago"
          unread
        />

        <div className="px-4 py-2 text-[10px] font-mono text-[#999] uppercase tracking-widest border-b border-[#F0F0F0]">
          Earlier
        </div>
        <NotifRow
          title="Bonus unlocked"
          body="Complete 5 more deliveries to earn ₦ 500 bonus"
          time="Yesterday"
        />
        <NotifRow
          title="Account verified"
          body="Your identity documents have been approved"
          time="Jan 10"
        />
        <NotifRow
          title="Profile updated"
          body="Your vehicle details have been saved"
          time="Jan 9"
        />
        <NotifRow
          title="Welcome to GasNow!"
          body="Your rider account is ready. Start accepting jobs now."
          time="Jan 8"
        />
      </div>

      <BottomNav active="dashboard" />
    </div>
  </PhoneFrame>
)

// ── 17. Profile ────────────────────────────────────────────────────────────────

export const ProfileScreen = () => (
  <PhoneFrame label="Profile" tag="17">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="My Profile" right={<WireIcon size={28} label="Edit" />} />

      <div className="flex-1 overflow-y-auto bg-[#F8F8F8]">
        {/* Hero */}
        <div className="bg-white px-4 py-6 flex flex-col items-center gap-3 border-b border-[#E5E5E5]">
          <div className="relative">
            <WireAvatar size={80} />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#333] border-2 border-white flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">+</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[17px] font-bold text-[#111]">Chidi Okonkwo</div>
            <div className="text-[12px] text-[#888] mt-0.5">ID: RDR-00421</div>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Rating", value: "4.8 ★" },
              { label: "Deliveries", value: "142" },
              { label: "On Time", value: "96%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-[14px] font-bold text-[#111]">{value}</div>
                <div className="text-[10px] text-[#888] font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 pt-4 flex flex-col gap-4">
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Personal Info</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              {[
                { label: "Phone", value: "+234 800 123 4567" },
                { label: "Email", value: "chidi@email.com" },
                { label: "State", value: "Lagos" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-[12px] text-[#888]">{label}</span>
                  <span className="text-[12px] text-[#222] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Vehicle</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              {[
                { label: "Type", value: "Motorcycle" },
                { label: "Plate", value: "LAG 324 TR" },
                { label: "Model", value: "Honda CG125" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-[12px] text-[#888]">{label}</span>
                  <span className="text-[12px] text-[#222] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Documents</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              {[
                { label: "National ID", status: "Verified" },
                { label: "Rider's License", status: "Verified" },
                { label: "Vehicle Papers", status: "Pending" },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-[12px] text-[#222]">{label}</span>
                  <WireBadge label={status} dot={status === "Verified"} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <WireButton label="Sign Out" variant="secondary" />
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  </PhoneFrame>
)

// ── 18. Settings ───────────────────────────────────────────────────────────────

export const SettingsScreen = () => (
  <PhoneFrame label="Settings" tag="18">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Settings" back />

      <div className="flex-1 overflow-y-auto bg-[#F8F8F8]">
        <div className="px-4 pt-4 flex flex-col gap-4">
          {/* Notifications */}
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2 px-1">Notifications</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              <SettingsRow label="Push Notifications" toggle on={true} />
              <SettingsRow label="New Job Alerts" toggle on={true} />
              <SettingsRow label="Earnings Updates" toggle on={true} />
              <SettingsRow label="Promotions & Bonuses" toggle on={false} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2 px-1">Navigation</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              <SettingsRow label="Default Map App" value="Google Maps" />
              <SettingsRow label="Route Preference" value="Fastest" />
              <SettingsRow label="Offline Maps" toggle on={false} />
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2 px-1">Account</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              <SettingsRow label="Change Password" />
              <SettingsRow label="Linked Bank Account" value="****4521" />
              <SettingsRow label="Language" value="English" />
              <SettingsRow label="Privacy Policy" />
              <SettingsRow label="Terms of Service" />
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2 px-1">Support</div>
            <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
              <SettingsRow label="Help Centre" />
              <SettingsRow label="Contact Support" />
              <SettingsRow label="Report a Bug" />
            </div>
          </div>

          <div className="pb-6 pt-2">
            <div className="text-center text-[11px] text-[#BBBBBB] font-mono">GasNow Rider · v2.4.1</div>
          </div>
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  </PhoneFrame>
)
