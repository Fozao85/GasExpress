import {
  PhoneFrame,
  StatusBar,
  TopBar,
  BottomNav,
  WireAvatar,
  WireButton,
  WireIcon,
  WireToggle,
  WireBadge,
  StatCard,
  JobCard,
  LocationRow,
  EmptyState,
} from "../components/WireKit"

// ── 7. Rider Dashboard ─────────────────────────────────────────────────────────

export const DashboardScreen = () => (
  <PhoneFrame label="Rider Dashboard" tag="07">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center gap-3">
          <WireAvatar size={40} />
          <div>
            <div className="text-[13px] font-semibold text-[#111]">Chidi Okonkwo</div>
            <WireBadge label="Online" dot />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WireToggle on={true} />
          <WireIcon size={32} label="Bell" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-[#F8F8F8]">
        {/* Stats row */}
        <div className="flex gap-3">
          <StatCard label="Today's Earnings" value="₦4,250" sub="+12% vs yesterday" />
          <StatCard label="Deliveries" value="7" sub="Completed today" />
        </div>

        {/* Online toggle card */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between">
          <div>
            <div className="text-[13px] font-semibold text-[#111]">You're Online</div>
            <div className="text-[11px] text-[#888] mt-0.5">Receiving delivery requests</div>
          </div>
          <WireToggle on={true} />
        </div>

        {/* Available jobs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[14px] font-semibold text-[#111]">Available Jobs</div>
            <span className="text-[12px] text-[#555] underline">View all</span>
          </div>
          <div className="flex flex-col gap-3">
            <JobCard
              id="JOB-041"
              fee="₦ 1,200"
              distance="3.8 km"
              from="BP Station, Lekki Phase 1"
              to="22 Admiralty Way, Lekki"
              time="Just now"
            />
            <JobCard
              id="JOB-040"
              fee="₦ 850"
              distance="2.1 km"
              from="Total Filling, VI"
              to="14B Ozumba Mbadiwe"
              time="4 min ago"
            />
          </div>
        </div>

        {/* Active delivery */}
        <div>
          <div className="text-[14px] font-semibold text-[#111] mb-3">Active Delivery</div>
          <div className="bg-white rounded-xl border border-[#333] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-mono text-[#999] uppercase tracking-widest">JOB-039</div>
              <WireBadge label="In Progress" dot />
            </div>
            <LocationRow label="Pickup" address="NIPCO Station, Ajah" dot="●" />
            <LocationRow label="Dropoff" address="7 Ocean Bay Estate" />
            <WireButton label="Track Active Delivery" small />
          </div>
        </div>
      </div>

      <BottomNav active="dashboard" />
    </div>
  </PhoneFrame>
)

// ── 7b. Dashboard — Offline state ─────────────────────────────────────────────

export const DashboardOfflineScreen = () => (
  <PhoneFrame label="Dashboard – Offline" tag="07b">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center gap-3">
          <WireAvatar size={40} />
          <div>
            <div className="text-[13px] font-semibold text-[#111]">Chidi Okonkwo</div>
            <WireBadge label="Offline" />
          </div>
        </div>
        <WireToggle on={false} />
      </div>

      <div className="flex-1 flex flex-col bg-[#F8F8F8] overflow-y-auto px-4 py-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between">
          <div>
            <div className="text-[13px] font-semibold text-[#333]">You're Offline</div>
            <div className="text-[11px] text-[#888] mt-0.5">Toggle to start receiving jobs</div>
          </div>
          <WireToggle on={false} />
        </div>

        <div className="flex gap-3">
          <StatCard label="Today's Earnings" value="₦0" sub="Go online to earn" />
          <StatCard label="Deliveries" value="0" sub="Today" />
        </div>

        <EmptyState
          icon="⊘"
          title="No jobs available"
          body="You are currently offline. Toggle online to start receiving delivery requests."
        />
      </div>

      <BottomNav active="dashboard" />
    </div>
  </PhoneFrame>
)

// ── 8. Available Jobs ──────────────────────────────────────────────────────────

export const AvailableJobsScreen = () => (
  <PhoneFrame label="Available Jobs" tag="08">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Available Jobs"
        right={
          <div className="flex items-center gap-2">
            <WireIcon size={28} label="Filter" />
            <WireIcon size={28} label="Sort" />
          </div>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-[#E5E5E5] overflow-x-auto shrink-0">
        {["All", "Nearby", "High Pay", "Gas", "Kerosene"].map((tab, i) => (
          <div
            key={tab}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest whitespace-nowrap ${i === 0 ? "bg-[#222] text-white" : "bg-[#EBEBEB] text-[#666] border border-[#DDDDDD]"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#F8F8F8]">
        <div className="text-[11px] text-[#999] font-mono">3 jobs near you</div>
        <JobCard id="JOB-041" fee="₦ 1,200" distance="3.8 km" from="BP Station, Lekki Phase 1" to="22 Admiralty Way" time="Just now" />
        <JobCard id="JOB-040" fee="₦ 850" distance="2.1 km" from="Total Filling, VI" to="14B Ozumba Mbadiwe" time="4 min ago" />
        <JobCard id="JOB-038" fee="₦ 650" distance="1.2 km" from="Mobil Station, Surulere" to="31 Bode Thomas St" time="11 min ago" />

        {/* Loading more */}
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#CCCCCC]" />
            ))}
          </div>
          <span className="text-[11px] text-[#AAAAAA]">Loading more...</span>
        </div>
      </div>

      <BottomNav active="jobs" />
    </div>
  </PhoneFrame>
)

// ── 8b. Available Jobs — Empty ─────────────────────────────────────────────────

export const AvailableJobsEmptyScreen = () => (
  <PhoneFrame label="Available Jobs – Empty" tag="08b">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Available Jobs" />
      <div className="flex-1 flex flex-col bg-[#F8F8F8]">
        <EmptyState
          icon="[ ]"
          title="No jobs nearby"
          body="There are no delivery jobs available in your area right now. Check back shortly."
        />
        <div className="px-4 pb-6">
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 text-center">
            <div className="text-[12px] text-[#888]">Last checked: 2 min ago</div>
            <div className="mt-2">
              <div className="inline-block px-3 py-1.5 border border-[#BBBBBB] rounded-lg text-[11px] text-[#555]">
                Refresh
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="jobs" />
    </div>
  </PhoneFrame>
)

// ── 9. Delivery Request ────────────────────────────────────────────────────────

export const DeliveryRequestScreen = () => (
  <PhoneFrame label="Delivery Request" tag="09">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F8F8]">
      {/* Top sheet handle */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 rounded-full bg-[#CCCCCC]" />
      </div>

      <div className="bg-white mx-4 rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-[#F0F0F0]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">New Request · JOB-041</div>
              <div className="text-[16px] font-bold text-[#111] mt-0.5">Delivery Request</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#EBEBEB] flex items-center justify-center">
              <span className="text-[11px] font-mono font-bold text-[#333]">24s</span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="px-4 py-4 flex flex-col gap-0">
          <LocationRow label="Pickup" address="BP Station, Lekki Phase 1" dot="●" />
          <LocationRow label="Dropoff" address="22 Admiralty Way, Lekki" dot="○" />
        </div>

        <div className="h-px bg-[#F0F0F0] mx-4" />

        {/* Delivery details */}
        <div className="px-4 py-4 grid grid-cols-3 gap-3">
          {[
            { label: "Distance", value: "3.8 km" },
            { label: "Est. Time", value: "~18 min" },
            { label: "Delivery Fee", value: "₦ 1,200" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">{label}</div>
              <div className="text-[14px] font-bold text-[#111] mt-0.5">{value}</div>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#F0F0F0] mx-4" />

        {/* Item details */}
        <div className="px-4 py-3">
          <div className="text-[11px] font-mono text-[#999] uppercase tracking-widest mb-2">Order Details</div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#333]">25L Cylinder Refill (PMS)</span>
            <WireBadge label="Gas" />
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <WireIcon size={14} />
            <span className="text-[11px] text-[#888]">Vendor: BPP Lekki · Ref #84521</span>
          </div>
        </div>

        <div className="h-px bg-[#F0F0F0] mx-4" />

        {/* Customer */}
        <div className="px-4 py-3 flex items-center gap-3">
          <WireAvatar size={36} />
          <div>
            <div className="text-[12px] font-semibold text-[#111]">Amara D.</div>
            <div className="text-[10px] text-[#888]">Customer · ★ 4.8</div>
          </div>
          <div className="ml-auto flex gap-2">
            <WireIcon size={32} label="Call" />
            <WireIcon size={32} label="Chat" />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 pt-4 pb-6 flex gap-3">
        <WireButton label="Decline" variant="secondary" />
        <WireButton label="Accept Job" />
      </div>
    </div>
  </PhoneFrame>
)
