import {
  PhoneFrame,
  StatusBar,
  WireAvatar,
  WireButton,
  WireIcon,
  WireMap,
} from "../components/WireKit"

// ── 10. Pickup Navigation ──────────────────────────────────────────────────────

export const PickupNavigationScreen = () => (
  <PhoneFrame label="Pickup Navigation" tag="10">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Map fills most of screen */}
      <div className="relative flex-1">
        <WireMap h={460} label="Map — Route to Pickup" />

        {/* Top HUD */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <div className="flex-1 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Navigating to pickup</div>
            <div className="text-[13px] font-semibold text-[#111] mt-0.5">BP Station, Lekki Phase 1</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center shadow-sm">
            <WireIcon size={20} label="Nav" />
          </div>
        </div>

        {/* ETA pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#222] text-white px-4 py-2 rounded-full flex items-center gap-3">
          <div className="text-center">
            <div className="text-[16px] font-bold leading-none">8</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#CCC]">min</div>
          </div>
          <div className="w-px h-6 bg-[#555]" />
          <div className="text-center">
            <div className="text-[16px] font-bold leading-none">1.4</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#CCC]">km</div>
          </div>
          <div className="w-px h-6 bg-[#555]" />
          <div className="text-[11px] font-mono text-[#CCC]">via Admiralty</div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white border-t border-[#E5E5E5] px-4 py-4 flex flex-col gap-3">
        <div className="flex justify-center">
          <div className="w-10 h-1 rounded-full bg-[#DDDDDD]" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Vendor · JOB-041</div>
            <div className="text-[14px] font-semibold text-[#111] mt-0.5">BP Station, Lekki Phase 1</div>
            <div className="text-[12px] text-[#888] mt-0.5">12 Admiralty Way, Lekki</div>
          </div>
          <div className="flex gap-2">
            <WireIcon size={36} label="Call" />
            <WireIcon size={36} label="Nav" />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <div className="flex-1 border border-[#E5E5E5] rounded-lg px-3 py-2 text-center">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Order</div>
            <div className="text-[12px] font-semibold text-[#111] mt-0.5">25L Gas Refill</div>
          </div>
          <div className="flex-1 border border-[#E5E5E5] rounded-lg px-3 py-2 text-center">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Fee</div>
            <div className="text-[12px] font-semibold text-[#111] mt-0.5">₦ 1,200</div>
          </div>
        </div>

        <WireButton label="Arrived at Pickup" />
      </div>
    </div>
  </PhoneFrame>
)

// ── 11. Customer Navigation ────────────────────────────────────────────────────

export const CustomerNavigationScreen = () => (
  <PhoneFrame label="Customer Navigation" tag="11">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="relative flex-1">
        <WireMap h={460} label="Map — Route to Customer" />

        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <div className="flex-1 bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Delivering to customer</div>
            <div className="text-[13px] font-semibold text-[#111] mt-0.5">22 Admiralty Way, Lekki</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center shadow-sm">
            <WireIcon size={20} label="Nav" />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#222] text-white px-4 py-2 rounded-full flex items-center gap-3">
          <div className="text-center">
            <div className="text-[16px] font-bold leading-none">12</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#CCC]">min</div>
          </div>
          <div className="w-px h-6 bg-[#555]" />
          <div className="text-center">
            <div className="text-[16px] font-bold leading-none">2.4</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#CCC]">km</div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-[#E5E5E5] px-4 py-4 flex flex-col gap-3">
        <div className="flex justify-center">
          <div className="w-10 h-1 rounded-full bg-[#DDDDDD]" />
        </div>

        <div className="flex items-center gap-3">
          <WireAvatar size={44} />
          <div className="flex-1">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Customer</div>
            <div className="text-[14px] font-semibold text-[#111] mt-0.5">Amara Dikoro</div>
            <div className="text-[11px] text-[#888]">22 Admiralty Way, Apt 3B</div>
          </div>
          <div className="flex gap-2">
            <WireIcon size={36} label="Call" />
            <WireIcon size={36} label="Chat" />
          </div>
        </div>

        <div className="border border-[#E5E5E5] rounded-lg px-3 py-2 flex items-center gap-2">
          <WireIcon size={16} />
          <span className="text-[11px] text-[#888]">Delivery note: "Leave at gate if not home"</span>
        </div>

        <WireButton label="Arrived at Customer" />
      </div>
    </div>
  </PhoneFrame>
)

// ── 12. Active Delivery Tracking ───────────────────────────────────────────────

export const ActiveDeliveryScreen = () => (
  <PhoneFrame label="Active Delivery Tracking" tag="12">
    <StatusBar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="relative" style={{ height: 320 }}>
        <WireMap h={320} label="Map — Live Tracking" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 right-3">
          <div className="bg-white border border-[#E5E5E5] rounded-xl px-3 py-2 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#555] animate-pulse" />
              <span className="text-[12px] font-semibold text-[#111]">In Transit</span>
            </div>
            <div className="flex items-center gap-1">
              <WireIcon size={14} />
              <span className="text-[11px] text-[#888]">12 min away</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Progress stepper */}
        <div className="flex items-center">
          {["Accepted", "Picked Up", "In Transit", "Delivered"].map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${i < 3 ? "bg-[#222] border-[#222] text-white" : "bg-white border-[#DDDDDD] text-[#AAAAAA]"}`}
                >
                  {i < 2 ? "✓" : i === 2 ? "●" : ""}
                </div>
                <div className={`text-[8px] font-mono mt-1 uppercase tracking-widest text-center ${i < 3 ? "text-[#333]" : "text-[#BBBBBB]"}`}>
                  {step}
                </div>
              </div>
              {i < 3 && <div className={`flex-1 h-px mx-1 mb-4 ${i < 2 ? "bg-[#333]" : "bg-[#E5E5E5]"}`} />}
            </div>
          ))}
        </div>

        <div className="h-px bg-[#F0F0F0]" />

        {/* Vendor details */}
        <div>
          <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Vendor Details</div>
          <div className="flex items-center gap-3">
            <WireIcon size={40} label="shop" />
            <div>
              <div className="text-[13px] font-semibold text-[#111]">BP Station, Lekki Phase 1</div>
              <div className="text-[11px] text-[#888]">12 Admiralty Way</div>
            </div>
            <div className="ml-auto"><WireIcon size={32} label="Call" /></div>
          </div>
        </div>

        <div className="h-px bg-[#F0F0F0]" />

        {/* Customer details */}
        <div>
          <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-2">Customer Details</div>
          <div className="flex items-center gap-3">
            <WireAvatar size={40} />
            <div>
              <div className="text-[13px] font-semibold text-[#111]">Amara Dikoro</div>
              <div className="text-[11px] text-[#888]">22 Admiralty Way, Apt 3B</div>
            </div>
            <div className="ml-auto flex gap-2">
              <WireIcon size={32} label="Call" />
              <WireIcon size={32} label="Chat" />
            </div>
          </div>
        </div>

        <div className="h-px bg-[#F0F0F0]" />

        {/* Delivery status */}
        <div className="flex gap-3">
          <div className="flex-1 border border-[#E5E5E5] rounded-lg p-3 text-center">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Order</div>
            <div className="text-[12px] font-semibold text-[#111] mt-0.5">25L Gas Refill</div>
          </div>
          <div className="flex-1 border border-[#E5E5E5] rounded-lg p-3 text-center">
            <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Fee</div>
            <div className="text-[12px] font-semibold text-[#111] mt-0.5">₦ 1,200</div>
          </div>
        </div>

        <WireButton label="Complete Delivery" />
        <WireButton label="Report Issue" variant="ghost" />
      </div>
    </div>
  </PhoneFrame>
)

// ── 13. Delivery Completed ─────────────────────────────────────────────────────

export const DeliveryCompletedScreen = () => (
  <PhoneFrame label="Delivery Completed" tag="13">
    <StatusBar />
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-white gap-6">
      {/* Success icon */}
      <div className="w-24 h-24 rounded-full border-4 border-[#333] bg-[#EBEBEB] flex items-center justify-center">
        <span className="text-[36px] font-bold text-[#333]">✓</span>
      </div>

      <div className="text-center">
        <div className="text-[22px] font-bold text-[#111]">Delivery Complete!</div>
        <div className="text-[13px] text-[#888] mt-1.5">JOB-041 · 22 Admiralty Way</div>
      </div>

      {/* Earnings summary */}
      <div className="w-full border border-[#E5E5E5] rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#F0F0F0]">
          <div className="text-[10px] font-mono text-[#999] uppercase tracking-widest">Earnings Summary</div>
        </div>
        {[
          { label: "Delivery Fee", value: "₦ 1,200" },
          { label: "Distance Bonus (3.8km)", value: "+ ₦ 150" },
          { label: "Platform Fee (5%)", value: "− ₦ 68" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
            <span className="text-[12px] text-[#555]">{label}</span>
            <span className="text-[12px] font-semibold text-[#111]">{value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-4 bg-[#F8F8F8]">
          <span className="text-[13px] font-bold text-[#111]">You Earned</span>
          <span className="text-[20px] font-bold text-[#111]">₦ 1,282</span>
        </div>
      </div>

      {/* Rate customer */}
      <div className="w-full border border-[#E5E5E5] rounded-xl px-4 py-4">
        <div className="text-[12px] text-[#555] mb-3 text-center">Rate your experience with Amara</div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-10 h-10 border border-[#BBBBBB] rounded-lg bg-[#FAFAFA] flex items-center justify-center">
              <span className="text-[18px] text-[#CCCCCC]">★</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <WireButton label="Find Next Job" />
        <WireButton label="Go to Dashboard" variant="secondary" />
      </div>
    </div>
  </PhoneFrame>
)
