import { useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const W = 390;
const H = 844;

// ─── Primitives ──────────────────────────────────────────────────────────────

function Frame({
  title,
  index,
  children,
  onClick,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group" onClick={onClick}>
      <div
        className="relative bg-white border border-[#c0c0c0] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow"
        style={{ width: W, height: H, fontFamily: "'Inter', sans-serif", fontSize: 13 }}
      >
        {children}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-white bg-[#555] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
          {index}
        </span>
        <span className="text-xs font-semibold text-[#333] tracking-wide">{title}</span>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-5 py-2 bg-white" style={{ height: 44 }}>
      <span className="text-[11px] font-bold text-[#111]">9:41</span>
      <div className="flex items-center gap-2">
        {/* Signal */}
        <div className="flex gap-px items-end h-3">
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} className={`w-1 rounded-sm ${i < 3 ? "bg-[#222]" : "bg-[#ccc]"}`} style={{ height: h }} />
          ))}
        </div>
        {/* WiFi */}
        <div className="flex flex-col items-center justify-end gap-px" style={{ width: 14, height: 12 }}>
          {[10, 7, 4].map((w, i) => (
            <div key={i} className={`h-0.5 rounded-full ${i > 0 ? "bg-[#222]" : "bg-[#ccc]"}`} style={{ width: w }} />
          ))}
        </div>
        {/* Battery */}
        <div className="flex items-center gap-px">
          <div className="border border-[#222] rounded-sm flex items-center px-0.5" style={{ width: 22, height: 11 }}>
            <div className="bg-[#222] rounded-sm" style={{ width: 14, height: 7 }} />
          </div>
          <div className="bg-[#222] rounded-sm" style={{ width: 2, height: 5 }} />
        </div>
      </div>
    </div>
  );
}

function TopBar({
  title,
  back = false,
  action,
}: {
  title?: string;
  back?: boolean;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 bg-white border-b border-[#e8e8e8]" style={{ height: 52 }}>
      <div className="w-9 h-9 flex items-center justify-center">
        {back && (
          <div className="w-8 h-8 bg-[#f0f0f0] border border-[#ddd] rounded-full flex items-center justify-center">
            <span className="text-xs text-[#444]">←</span>
          </div>
        )}
      </div>
      {title && <span className="text-sm font-semibold text-[#111]">{title}</span>}
      <div className="w-9 h-9 flex items-center justify-center">
        {action && <span className="text-[11px] font-medium text-[#555] border border-[#ddd] px-2 py-1 rounded">{action}</span>}
      </div>
    </div>
  );
}

function Placeholder({
  label,
  w,
  h,
  type = "image",
  className = "",
}: {
  label?: string;
  w?: number | string;
  h: number | string;
  type?: "image" | "map" | "icon" | "avatar";
  className?: string;
}) {
  const configs = {
    image: { bg: "#d8d8d8", border: "#bbb", text: "#666" },
    map: { bg: "#e2e2e2", border: "#bbb", text: "#666" },
    icon: { bg: "#e8e8e8", border: "#ccc", text: "#777" },
    avatar: { bg: "#d0d0d0", border: "#bbb", text: "#666" },
  };
  const c = configs[type];
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 flex-shrink-0 ${className}`}
      style={{
        width: w ?? "100%",
        height: h,
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      {type === "map" && (
        <div className="relative w-full h-full overflow-hidden">
          {/* Grid lines */}
          {[20, 36, 52, 68, 84].map((p) => (
            <div key={`h${p}`} className="absolute left-0 right-0 border-t border-[#bbb] opacity-40" style={{ top: `${p}%` }} />
          ))}
          {[15, 30, 50, 70, 85].map((p) => (
            <div key={`v${p}`} className="absolute top-0 bottom-0 border-l border-[#bbb] opacity-40" style={{ left: `${p}%` }} />
          ))}
          {/* Roads */}
          <div className="absolute bg-[#ccc] opacity-70" style={{ top: "42%", left: 0, right: 0, height: 6 }} />
          <div className="absolute bg-[#ccc] opacity-70" style={{ left: "45%", top: 0, bottom: 0, width: 6 }} />
          {/* Pin */}
          <div className="absolute" style={{ top: "35%", left: "43%", transform: "translate(-50%,-100%)" }}>
            <div className="w-5 h-7 bg-[#444] rounded-full rounded-b-none flex items-center justify-center" style={{ clipPath: "polygon(50% 100%, 0 40%, 0 0, 100% 0, 100% 40%)" }}>
              <div className="w-2 h-2 bg-white rounded-full mt-1" />
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span
              className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 border border-[#aaa]"
              style={{ background: "rgba(255,255,255,0.85)", color: c.text }}
            >
              {label ?? "Map Placeholder"}
            </span>
          </div>
        </div>
      )}
      {type !== "map" && (
        <>
          <div className="w-7 h-7 border-2 border-[#999] rounded flex items-center justify-center opacity-60">
            {type === "avatar" ? (
              <div className="flex flex-col items-center gap-px">
                <div className="w-2.5 h-2.5 bg-[#999] rounded-full" />
                <div className="w-4 h-1.5 bg-[#999] rounded-sm" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-2 h-1.5 border border-[#999] rounded-sm" />
                <div className="w-3 h-px bg-[#999]" />
              </div>
            )}
          </div>
          <span
            className="text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: c.text }}
          >
            {label ?? (type === "avatar" ? "Avatar" : type === "icon" ? "Icon" : "Image")}
          </span>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  hint,
  error,
  prefix,
  suffix,
  active = false,
}: {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <span className="text-[11px] font-semibold text-[#333]">{label}</span>}
      <div
        className="flex items-center gap-2 px-3 rounded-lg"
        style={{
          height: 44,
          background: active ? "#fafafa" : "#f5f5f5",
          border: `1.5px solid ${error ? "#888" : active ? "#444" : "#d8d8d8"}`,
        }}
      >
        {prefix}
        <span className="flex-1 text-xs text-[#aaa]">{placeholder ?? "Enter text"}</span>
        {suffix}
      </div>
      {error && <span className="text-[10px] text-[#666] flex items-center gap-1"><span>⚠</span>{error}</span>}
      {hint && !error && <span className="text-[10px] text-[#aaa]">{hint}</span>}
    </div>
  );
}

function Btn({
  label,
  variant = "primary",
  size = "md",
  full = true,
  disabled = false,
}: {
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  full?: boolean;
  disabled?: boolean;
}) {
  const h = size === "sm" ? 36 : 48;
  const styles = {
    primary: { bg: disabled ? "#ccc" : "#1a1a1a", color: "#fff", border: "transparent" },
    secondary: { bg: "#f0f0f0", color: "#222", border: "#d8d8d8" },
    ghost: { bg: "transparent", color: "#333", border: "#ccc" },
    danger: { bg: "#eee", color: "#555", border: "#ccc" },
  };
  const s = styles[variant];
  return (
    <div
      className="flex items-center justify-center rounded-xl font-semibold"
      style={{
        height: h,
        background: s.bg,
        color: s.color,
        border: `1.5px solid ${s.border}`,
        width: full ? "100%" : "auto",
        padding: full ? 0 : "0 16px",
        fontSize: size === "sm" ? 12 : 14,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </div>
  );
}

function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 border-t border-[#e0e0e0]" />
      {label && <span className="text-[10px] text-[#bbb] font-medium whitespace-nowrap">{label}</span>}
      <div className="flex-1 border-t border-[#e0e0e0]" />
    </div>
  );
}

function SectionHead({ title, cta }: { title: string; cta?: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-[13px] font-bold text-[#111]">{title}</span>
      {cta && <span className="text-[11px] text-[#555] font-medium underline decoration-dotted">{cta}</span>}
    </div>
  );
}

function BottomNav({ active = 0 }: { active?: number }) {
  const tabs = [
    { label: "Home", icon: "⌂" },
    { label: "Orders", icon: "📋" },
    { label: "Alerts", icon: "🔔" },
    { label: "Profile", icon: "👤" },
  ];
  return (
    <div
      className="flex items-center justify-around bg-white border-t border-[#e0e0e0]"
      style={{ height: 64, paddingBottom: 8 }}
    >
      {tabs.map((t, i) => (
        <div key={t.label} className="flex flex-col items-center gap-1 pt-2" style={{ flex: 1 }}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
            style={{ background: i === active ? "#111" : "transparent" }}
          >
            <span style={{ filter: "grayscale(1)", fontSize: 14, color: i === active ? "#fff" : "#888" }}>
              {t.icon}
            </span>
          </div>
          <span
            className="text-[9px] font-semibold"
            style={{ color: i === active ? "#111" : "#bbb" }}
          >
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Stars({ n = 4.5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: i <= Math.floor(n) ? "#444" : i - 0.5 <= n ? "#888" : "#ddd" }}
          />
        ))}
      </div>
      <span className="text-[10px] text-[#777] font-medium">{n}</span>
    </div>
  );
}

function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className="flex-shrink-0 text-[10px] font-semibold px-3 rounded-full"
      style={{
        height: 28,
        lineHeight: "28px",
        background: active ? "#1a1a1a" : "#f0f0f0",
        color: active ? "#fff" : "#666",
        border: `1px solid ${active ? "#1a1a1a" : "#ddd"}`,
      }}
    >
      {label}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[9px] font-medium px-1.5 rounded" style={{ border: "1px solid #d4d4d4", color: "#666", lineHeight: "18px" }}>
      {label}
    </span>
  );
}

function Skeleton({ w, h = 14, className = "" }: { w?: number | string; h?: number; className?: string }) {
  return (
    <div
      className={`rounded ${className}`}
      style={{ width: w ?? "100%", height: h, background: "#e8e8e8" }}
    />
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <div
      className="rounded-full flex items-center px-0.5"
      style={{
        width: 40,
        height: 22,
        background: on ? "#333" : "#d0d0d0",
        border: "1.5px solid #bbb",
        justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </div>
  );
}

function SettingRow({
  icon,
  label,
  value,
  toggle,
  danger = false,
  last = false,
}: {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  on?: boolean;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 bg-white"
      style={{
        height: 52,
        borderBottom: last ? "none" : "1px solid #f0f0f0",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#f0f0f0", border: "1px solid #e0e0e0", fontSize: 14 }}
      >
        {icon}
      </div>
      <span className="flex-1 text-[13px] font-medium" style={{ color: danger ? "#777" : "#111" }}>
        {label}
      </span>
      {toggle ? (
        <Toggle on={value === "on"} />
      ) : value ? (
        <span className="text-[11px] text-[#aaa]">{value}</span>
      ) : (
        <span className="text-[#ccc] text-base">›</span>
      )}
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 py-2" style={{ background: "#f5f5f5" }}>
        <span className="text-[10px] font-bold text-[#999] uppercase tracking-widest">{title}</span>
      </div>
      <div style={{ borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8" }}>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "#f0f0f0", border: "1.5px dashed #ccc", fontSize: 28 }}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[13px] font-semibold text-[#444]">{title}</span>
        <span className="text-[11px] text-[#aaa] text-center px-4">{sub}</span>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i === 1 ? "#444" : "#ccc" }}
        />
      ))}
    </div>
  );
}

// ─── Screen 1: Splash ────────────────────────────────────────────────────────

function ScreenSplash() {
  return (
    <div className="flex flex-col items-center justify-between h-full bg-white py-16">
      <div />
      <div className="flex flex-col items-center gap-6">
        <div
          className="rounded-3xl flex flex-col items-center justify-center gap-2"
          style={{ width: 96, height: 96, background: "#e8e8e8", border: "2px solid #c8c8c8" }}
        >
          <div style={{ width: 40, height: 40, background: "#bbb", borderRadius: 8 }} />
          <Skeleton w={48} h={8} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton w={120} h={20} />
          <Skeleton w={80} h={12} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <LoadingDots />
        <span className="text-[10px] text-[#bbb] font-medium tracking-wider uppercase">Loading</span>
      </div>
    </div>
  );
}

// ─── Screen 2: Welcome ───────────────────────────────────────────────────────

function ScreenWelcome() {
  return (
    <div className="flex flex-col h-full">
      <Placeholder h={420} label="Welcome Illustration" type="image" />
      <div className="flex flex-col flex-1 px-6 pt-6 pb-8 gap-6 justify-between">
        <div className="flex flex-col gap-3">
          <Skeleton w="65%" h={26} />
          <Skeleton w="90%" h={13} />
          <Skeleton w="75%" h={13} />
          {/* Pagination dots */}
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-full" style={{ width: i === 0 ? 16 : 6, height: 6, background: i === 0 ? "#444" : "#ddd" }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Btn label="Create Account" variant="primary" />
          <Btn label="Log In" variant="ghost" />
          <p className="text-center text-[10px] text-[#aaa]">
            By continuing you agree to our{" "}
            <span className="underline text-[#666]">Terms</span> &{" "}
            <span className="underline text-[#666]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Register ──────────────────────────────────────────────────────

function ScreenRegister() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Create Account" />
      <div className="flex flex-col flex-1 px-5 pt-5 pb-6 gap-5 overflow-hidden">
        <div className="flex flex-col gap-1">
          <Skeleton w="55%" h={22} />
          <Skeleton w="80%" h={12} />
        </div>
        <div className="flex flex-col gap-4">
          <Field label="Full Name" placeholder="e.g. Amara Osei" />
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[11px] font-semibold text-[#333]">Phone Number</span>
            <div
              className="flex items-center gap-2 px-3 rounded-lg"
              style={{ height: 44, background: "#f5f5f5", border: "1.5px solid #d8d8d8" }}
            >
              <div className="flex items-center gap-1.5 pr-2 border-r border-[#ddd]">
                <div className="w-5 h-3.5 rounded-sm" style={{ background: "#ddd" }} />
                <span className="text-xs text-[#555] font-medium">+233</span>
              </div>
              <span className="text-xs text-[#aaa]">024 000 0000</span>
            </div>
          </div>
          <Field label="Password" placeholder="Min. 8 characters" hint="Use letters, numbers & symbols" />
          <Field label="Confirm Password" placeholder="Repeat password" />
        </div>
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 rounded border border-[#ccc] flex-shrink-0 mt-0.5" style={{ background: "#f0f0f0" }} />
          <span className="text-[11px] text-[#666] leading-relaxed">
            I agree to GasNow's{" "}
            <span className="underline text-[#444]">Terms of Service</span> and{" "}
            <span className="underline text-[#444]">Privacy Policy</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <Btn label="Create Account" />
          <p className="text-center text-[11px] text-[#aaa]">
            Already have an account?{" "}
            <span className="text-[#444] font-semibold underline">Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Login ─────────────────────────────────────────────────────────

function ScreenLogin() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Log In" />
      <div className="flex flex-col flex-1 px-5 pt-6 pb-6 gap-6 overflow-hidden">
        <div className="flex flex-col gap-1.5">
          <Skeleton w="45%" h={22} />
          <Skeleton w="72%" h={12} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[11px] font-semibold text-[#333]">Phone Number</span>
            <div
              className="flex items-center gap-2 px-3 rounded-lg"
              style={{ height: 44, background: "#f5f5f5", border: "1.5px solid #d8d8d8" }}
            >
              <div className="flex items-center gap-1.5 pr-2 border-r border-[#ddd]">
                <div className="w-5 h-3.5 rounded-sm" style={{ background: "#ddd" }} />
                <span className="text-xs text-[#555] font-medium">+233</span>
              </div>
              <span className="text-xs text-[#aaa]">Enter phone number</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <span className="text-[11px] font-semibold text-[#333]">Password</span>
              <span className="text-[11px] text-[#555] underline">Forgot password?</span>
            </div>
            <div
              className="flex items-center justify-between px-3 rounded-lg"
              style={{ height: 44, background: "#f5f5f5", border: "1.5px solid #d8d8d8" }}
            >
              <span className="text-sm text-[#bbb] tracking-widest">••••••••</span>
              <span className="text-[10px] text-[#666] border border-[#ddd] px-2 py-0.5 rounded" style={{ background: "#eee" }}>
                Show
              </span>
            </div>
          </div>
        </div>
        <Btn label="Log In" />
        <Divider label="or continue with" />
        <div className="flex gap-3">
          {["G  Google", "  Apple"].map((s) => (
            <div
              key={s}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold"
              style={{ height: 44, border: "1.5px solid #d8d8d8", background: "#fff", fontSize: 12, color: "#333" }}
            >
              <div className="w-5 h-5 rounded" style={{ background: "#e0e0e0" }} />
              {s.trim().split("  ").pop()}
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-[#aaa] mt-auto">
          New to GasNow?{" "}
          <span className="text-[#444] font-semibold underline">Create Account</span>
        </p>
      </div>
    </div>
  );
}

// ─── Screen 5: OTP ───────────────────────────────────────────────────────────

function ScreenOTP() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Verify Phone" />
      <div className="flex flex-col flex-1 items-center px-5 pt-8 pb-8 gap-8 overflow-hidden">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "#ebebeb", border: "2px solid #d8d8d8" }}
        >
          <Placeholder type="icon" w={40} h={40} label="SMS" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Skeleton w={180} h={22} />
          <Skeleton w="90%" h={12} />
          <Skeleton w="75%" h={12} />
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-semibold text-[#444]">+233 024 ••• 0000</span>
            <span className="text-[10px] text-[#555] underline">Change</span>
          </div>
        </div>
        {/* 6-digit inputs */}
        <div className="flex gap-2.5 justify-center w-full">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-xl font-bold text-sm"
              style={{
                width: 48,
                height: 56,
                background: i === 1 ? "#fff" : "#f5f5f5",
                border: `2px solid ${i === 1 ? "#444" : "#ddd"}`,
                color: "#111",
              }}
            >
              {i === 1 && <div className="w-0.5 h-5 bg-[#333]" />}
            </div>
          ))}
        </div>
        {/* Resend */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] text-[#aaa]">Didn't receive a code?</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#555] font-semibold underline">Resend OTP</span>
            <span className="text-[10px] text-[#bbb]">in 00:45</span>
          </div>
        </div>
        <div className="w-full mt-auto">
          <Btn label="Verify & Continue" />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: Home ──────────────────────────────────────────────────────────

function ScreenHome() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      {/* Appbar */}
      <div
        className="flex items-center justify-between px-4 bg-white border-b border-[#eee]"
        style={{ height: 56 }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-[#aaa] font-medium">Good morning</span>
          <Skeleton w={100} h={15} />
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#f0f0f0", border: "1px solid #e0e0e0", fontSize: 16 }}
          >
            🔔
          </div>
          <Placeholder type="avatar" w={36} h={36} label="" className="rounded-full" />
        </div>
      </div>
      {/* Location bar */}
      <div
        className="flex items-center gap-2 px-4 bg-[#f7f7f7] border-b border-[#e8e8e8]"
        style={{ height: 44 }}
      >
        <span style={{ fontSize: 14 }}>📍</span>
        <div className="flex flex-col flex-1 min-w-0 gap-0.5">
          <span className="text-[9px] text-[#aaa] font-medium uppercase tracking-wider">Delivering to</span>
          <Skeleton w={160} h={11} />
        </div>
        <Tag label="Change ›" />
      </div>
      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden flex flex-col gap-0">
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-4 py-4">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 rounded-xl"
            style={{ height: 44, background: "#fff", border: "1.5px solid #e0e0e0" }}
          >
            <span className="text-sm text-[#bbb]">🔍</span>
            <span className="text-xs text-[#bbb]">Search vendors, cylinder sizes…</span>
            <div className="ml-auto w-px h-5 bg-[#e8e8e8]" />
            <span className="text-[10px] text-[#888] px-2">Filter</span>
          </div>
          {/* Promo */}
          <Placeholder h={120} label="Promotion Banner" type="image" className="rounded-2xl" />
          {/* Quick actions */}
          <div className="flex justify-between gap-2">
            {["Order", "Schedule", "Track", "Support"].map((a) => (
              <div key={a} className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "#ebebeb", border: "1px solid #ddd" }}
                >
                  <Placeholder type="icon" w={28} h={28} label="" />
                </div>
                <span className="text-[9px] font-medium text-[#666]">{a}</span>
              </div>
            ))}
          </div>
          {/* Nearby vendors */}
          <SectionHead title="Nearby Vendors" cta="See all" />
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
            {["Accra Gas Co.", "SwiftFuel Ltd", "QuickGas"].map((name) => (
              <div
                key={name}
                className="flex-shrink-0 rounded-2xl overflow-hidden"
                style={{ width: 148, border: "1px solid #e0e0e0", background: "#fff" }}
              >
                <Placeholder h={80} label="Vendor" type="image" />
                <div className="p-2.5 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#111]">{name}</span>
                  <Stars n={4.5} />
                  <div className="flex gap-1 flex-wrap">
                    <Tag label="1.2 km" />
                    <Tag label="~25 min" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Recent */}
          <SectionHead title="Recent Orders" cta="View all" />
          <div
            className="flex items-center gap-3 p-3 rounded-2xl"
            style={{ border: "1px solid #e8e8e8", background: "#fff" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#ebebeb", border: "1px solid #ddd", fontSize: 18 }}
            >
              📦
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#111]">#GN-1042</span>
                <Tag label="Delivered" />
              </div>
              <span className="text-[10px] text-[#888]">Accra Gas Co. · 12 kg × 1</span>
              <span className="text-[9px] text-[#bbb]">Today, 10:30 AM</span>
            </div>
          </div>
        </div>
        <BottomNav active={0} />
      </div>
    </div>
  );
}

// ─── Screen 7: Vendor Listing ────────────────────────────────────────────────

function ScreenVendorListing() {
  const vendors = [
    { name: "Accra Gas Company", dist: "1.2 km", time: "20–30 min", price: "GH₵ 85", rating: 4.8, open: true },
    { name: "SwiftFuel Ltd", dist: "2.0 km", time: "30–45 min", price: "GH₵ 78", rating: 4.5, open: true },
    { name: "QuickGas Hub", dist: "3.4 km", time: "45–60 min", price: "GH₵ 72", rating: 4.2, open: false },
    { name: "City Gas Depot", dist: "4.1 km", time: "40–55 min", price: "GH₵ 80", rating: 4.6, open: true },
  ];
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Gas Vendors" action="Map" />
      {/* Search + filter */}
      <div
        className="flex items-center gap-2 px-4 bg-white border-b border-[#eee]"
        style={{ height: 56 }}
      >
        <div
          className="flex-1 flex items-center gap-2 px-3 rounded-xl"
          style={{ height: 38, background: "#f5f5f5", border: "1px solid #e0e0e0" }}
        >
          <span className="text-sm text-[#bbb]">🔍</span>
          <span className="text-xs text-[#bbb]">Search vendors…</span>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 rounded-xl font-semibold"
          style={{ height: 38, background: "#f0f0f0", border: "1px solid #ddd", fontSize: 12, color: "#555" }}
        >
          <span>⚙</span> Filter
        </div>
      </div>
      {/* Chips */}
      <div
        className="flex gap-2 px-4 bg-white border-b border-[#eee] overflow-x-auto"
        style={{ height: 48, alignItems: "center" }}
      >
        {["All", "Nearest", "Fastest", "Cheapest", "Top Rated"].map((f, i) => (
          <Chip key={f} label={f} active={i === 0} />
        ))}
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 py-4">
        <span className="text-[11px] text-[#aaa] font-medium">12 vendors near Osu, Accra</span>
        {vendors.map((v) => (
          <div
            key={v.name}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #e4e4e4", background: "#fff" }}
          >
            <div className="flex">
              <Placeholder w={100} h={100} label="Vendor" type="image" />
              <div className="flex flex-col justify-between flex-1 p-3">
                <div className="flex justify-between items-start">
                  <span className="text-[12px] font-bold text-[#111] leading-tight flex-1 pr-2">{v.name}</span>
                  <span
                    className="text-[9px] font-semibold px-1.5 rounded flex-shrink-0"
                    style={{
                      border: `1px solid ${v.open ? "#bbb" : "#e0e0e0"}`,
                      color: v.open ? "#444" : "#bbb",
                      lineHeight: "18px",
                    }}
                  >
                    {v.open ? "Open" : "Closed"}
                  </span>
                </div>
                <Stars n={v.rating} />
                <div className="flex gap-1 flex-wrap">
                  <Tag label={v.dist} />
                  <Tag label={v.time} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#111]">
                    {v.price}
                    <span className="text-[9px] font-normal text-[#aaa]">/12kg</span>
                  </span>
                  <Btn label="Order" variant="secondary" size="sm" full={false} />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Loading state */}
        <div className="flex flex-col gap-2 pt-2 opacity-40">
          <div className="flex gap-3">
            <Skeleton w={100} h={100} className="rounded-2xl flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1 pt-2">
              <Skeleton w="70%" h={14} />
              <Skeleton w="50%" h={10} />
              <Skeleton w="60%" h={10} />
            </div>
          </div>
          <p className="text-center text-[10px] text-[#bbb] py-2">Loading more…</p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8: Vendor Details ────────────────────────────────────────────────

function ScreenVendorDetails() {
  const cylinders = [
    { size: "6 kg", price: "GH₵ 45", qty: 0 },
    { size: "12 kg", price: "GH₵ 85", qty: 1 },
    { size: "14.5 kg", price: "GH₵ 100", qty: 0 },
  ];
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <div className="relative flex-shrink-0">
        <Placeholder h={200} label="Vendor Cover Image" type="image" />
        <div className="absolute top-3 left-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #ddd" }}
          >
            <span className="text-sm">←</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #ddd", fontSize: 16 }}
          >
            ♡
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Vendor info */}
        <div className="px-4 py-4 bg-white border-b border-[#eee] flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-bold text-[#111]">Accra Gas Company</span>
              <Stars n={4.8} />
              <div className="flex gap-1.5 flex-wrap mt-0.5">
                <Tag label="1.2 km away" />
                <Tag label="Open now" />
                <Tag label="20–30 min" />
              </div>
            </div>
            <Placeholder type="image" w={52} h={52} label="Logo" className="rounded-xl flex-shrink-0" />
          </div>
          <Skeleton w="100%" h={11} />
          <Skeleton w="80%" h={11} />
          {/* Actions */}
          <div className="flex gap-3 mt-1">
            {["Call", "Chat", "Share"].map((a) => (
              <div key={a} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "#f0f0f0", border: "1px solid #e0e0e0" }}
                >
                  <Placeholder type="icon" w={22} h={22} label="" />
                </div>
                <span className="text-[9px] text-[#888]">{a}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Cylinders */}
        <div className="px-4 py-4 flex flex-col gap-3">
          <SectionHead title="Available Cylinders" />
          {cylinders.map((c, i) => (
            <div
              key={c.size}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{
                border: `1.5px solid ${i === 1 ? "#333" : "#e4e4e4"}`,
                background: i === 1 ? "#fafafa" : "#fff",
              }}
            >
              <div
                className="w-10 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#e0e0e0", border: "1px solid #ccc" }}
              >
                <span className="text-[8px] text-[#666] font-semibold text-center leading-tight">Cyl.</span>
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-xs font-bold text-[#111]">{c.size} Cylinder</span>
                <span className="text-sm font-bold text-[#111]">{c.price}</span>
                <span className="text-[9px] text-[#aaa]">In stock · Exchange available</span>
              </div>
              {/* Stepper */}
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1.5px solid #d8d8d8" }}
              >
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#f0f0f0" }}>
                  <span className="text-base text-[#555]">−</span>
                </div>
                <span className="w-6 text-center text-xs font-bold text-[#111]">{c.qty}</span>
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: "#f0f0f0" }}>
                  <span className="text-base text-[#555]">+</span>
                </div>
              </div>
            </div>
          ))}
          {/* Summary */}
          <div
            className="p-3 rounded-2xl flex flex-col gap-2 mt-1"
            style={{ border: "1px solid #e8e8e8", background: "#fff" }}
          >
            <span className="text-xs font-bold text-[#111]">Price Summary</span>
            {[["12 kg × 1", "GH₵ 85"], ["Delivery fee", "GH₵ 10"], ["Service fee", "GH₵ 2"]].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-[11px] text-[#888]">{l}</span>
                <span className="text-[11px] text-[#444]">{v}</span>
              </div>
            ))}
            <Divider />
            <div className="flex justify-between">
              <span className="text-xs font-bold text-[#111]">Total</span>
              <span className="text-xs font-bold text-[#111]">GH₵ 97</span>
            </div>
          </div>
          <Btn label="Add to Cart  —  GH₵ 97" />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9: Checkout ───────────────────────────────────────────────────────

function ScreenCheckout() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Checkout" />
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-4 py-4">
        {/* Address */}
        <div className="flex flex-col gap-2">
          <SectionHead title="Delivery Address" cta="Change" />
          <div
            className="flex items-start gap-3 p-3 rounded-2xl"
            style={{ border: "1px solid #e4e4e4", background: "#fff" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "#ebebeb", border: "1px solid #ddd", fontSize: 14 }}
            >
              📍
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#111]">Home</span>
              <Skeleton w={200} h={11} />
              <Skeleton w={150} h={11} />
            </div>
          </div>
          <div
            className="h-10 rounded-xl flex items-center justify-center gap-2"
            style={{ border: "1.5px dashed #ccc", background: "#fafafa" }}
          >
            <span className="text-[11px] text-[#aaa]">＋ Add delivery instructions</span>
          </div>
        </div>
        {/* Payment */}
        <div className="flex flex-col gap-2">
          <SectionHead title="Payment Method" cta="Add new" />
          {[
            { icon: "💳", label: "Mobile Money", sub: "MTN MoMo •••• 4521", selected: true },
            { icon: "💵", label: "Cash on Delivery", sub: "Pay when rider arrives", selected: false },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ border: `1.5px solid ${p.selected ? "#333" : "#e4e4e4"}`, background: "#fff" }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: p.selected ? "#333" : "#ccc" }}
              >
                {p.selected && <div className="w-2 h-2 bg-[#333] rounded-full" />}
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#f0f0f0", border: "1px solid #e0e0e0", fontSize: 18 }}
              >
                {p.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-[#111]">{p.label}</span>
                <span className="text-[10px] text-[#aaa]">{p.sub}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="flex flex-col gap-2">
          <SectionHead title="Order Summary" />
          <div
            className="p-3 rounded-2xl flex flex-col gap-3"
            style={{ border: "1px solid #e4e4e4", background: "#fff" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#e0e0e0", border: "1px solid #ccc" }}
              >
                <span className="text-[8px] text-[#666]">Cyl.</span>
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-xs font-bold text-[#111]">12 kg LPG Cylinder</span>
                <span className="text-[10px] text-[#888]">Accra Gas Company · Qty: 1</span>
              </div>
              <span className="text-xs font-bold text-[#111]">GH₵ 85</span>
            </div>
            <Divider />
            {[["Subtotal", "GH₵ 85"], ["Delivery fee", "GH₵ 10"], ["Service fee", "GH₵ 2"], ["Discount", "−GH₵ 0"]].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-[11px] text-[#888]">{l}</span>
                <span className="text-[11px] text-[#444]">{v}</span>
              </div>
            ))}
            <Divider />
            <div className="flex justify-between">
              <span className="text-xs font-bold text-[#111]">Total</span>
              <span className="text-xs font-bold text-[#111]">GH₵ 97</span>
            </div>
          </div>
        </div>
        {/* Promo */}
        <div
          className="flex items-center gap-2 px-3 rounded-xl h-11"
          style={{ border: "1.5px dashed #ccc", background: "#fafafa" }}
        >
          <span className="text-sm text-[#bbb]">%</span>
          <span className="text-xs text-[#bbb]">Enter promo / referral code</span>
        </div>
        <Btn label="Confirm Order  —  GH₵ 97" />
        <p className="text-center text-[10px] text-[#bbb] -mt-2">Estimated delivery: 20–30 mins</p>
      </div>
    </div>
  );
}

// ─── Screen 10: Order Tracking ────────────────────────────────────────────────

function ScreenTracking() {
  const steps = [
    { label: "Order Placed", time: "10:32 AM", done: true },
    { label: "Vendor Confirmed", time: "10:34 AM", done: true },
    { label: "Rider Assigned", time: "10:36 AM", done: true },
    { label: "En Route to You", time: "10:40 AM", done: true, active: true },
    { label: "Delivered", time: "—", done: false },
  ];
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Track Order" action="Help" />
      <Placeholder type="map" h={220} label="Live Map" />
      {/* Rider */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#eee]"
        style={{ flexShrink: 0 }}
      >
        <Placeholder type="avatar" w={48} h={48} label="" className="rounded-full flex-shrink-0" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton w={120} h={14} />
          <span className="text-[10px] text-[#888]">Delivery Rider · ⭐ 4.9</span>
          <div className="flex gap-1">
            <Tag label="Motorbike" />
            <Tag label="GR-4521-22" />
          </div>
        </div>
        <div className="flex gap-2">
          {["📞", "💬"].map((ic) => (
            <div
              key={ic}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#f0f0f0", border: "1px solid #e0e0e0", fontSize: 16 }}
            >
              {ic}
            </div>
          ))}
        </div>
      </div>
      {/* ETA */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-[#eee]"
        style={{ background: "#f7f7f7", flexShrink: 0 }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-[#aaa] font-medium uppercase tracking-wider">Estimated Arrival</span>
          <span className="text-[15px] font-bold text-[#111]">10:58 AM · ~12 min</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[9px] text-[#aaa] uppercase tracking-wider">Order</span>
          <span className="text-xs font-bold text-[#444]">#GN-1042</span>
        </div>
      </div>
      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <SectionHead title="Delivery Status" />
        <div className="mt-4 flex flex-col">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: s.done ? "#333" : "#ddd",
                    background: s.done ? "#333" : "#fff",
                    outline: (s as any).active ? "2px solid #aaa" : "none",
                    outlineOffset: 2,
                  }}
                >
                  {s.done && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px" style={{ height: 32, background: s.done ? "#bbb" : "#eee" }} />
                )}
              </div>
              <div className="flex justify-between flex-1 pb-6">
                <span className="text-xs font-semibold" style={{ color: s.done ? "#111" : "#bbb" }}>
                  {s.label}
                </span>
                <span className="text-[10px] text-[#aaa]">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 11: Order History ─────────────────────────────────────────────────

function ScreenHistory() {
  const orders = [
    { id: "#GN-1042", vendor: "Accra Gas Co.", items: "12 kg × 1", total: "GH₵ 97", date: "Today, 10:30 AM", status: "Delivered" },
    { id: "#GN-1038", vendor: "SwiftFuel Ltd", items: "6 kg × 2", total: "GH₵ 100", date: "Yesterday, 3:15 PM", status: "Delivered" },
    { id: "#GN-1031", vendor: "QuickGas Hub", items: "14.5 kg × 1", total: "GH₵ 112", date: "12 Jul 2026", status: "Cancelled" },
    { id: "#GN-1020", vendor: "Accra Gas Co.", items: "12 kg × 1", total: "GH₵ 97", date: "9 Jul 2026", status: "Delivered" },
  ];
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="My Orders" />
      {/* Tabs */}
      <div className="flex bg-white border-b border-[#eee]" style={{ flexShrink: 0 }}>
        {["All", "Delivered", "Cancelled", "Ongoing"].map((t, i) => (
          <div
            key={t}
            className="flex-1 py-3 text-center font-semibold"
            style={{
              fontSize: 11,
              borderBottom: `2px solid ${i === 0 ? "#111" : "transparent"}`,
              color: i === 0 ? "#111" : "#bbb",
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 py-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="rounded-2xl p-3 flex flex-col gap-2.5"
            style={{ border: "1px solid #e4e4e4", background: "#fff" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#ebebeb", border: "1px solid #ddd", fontSize: 18 }}
              >
                📦
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111]">{o.id}</span>
                  <span
                    className="text-[9px] font-semibold px-1.5 rounded"
                    style={{
                      border: `1px solid ${o.status === "Cancelled" ? "#ddd" : "#bbb"}`,
                      color: o.status === "Cancelled" ? "#bbb" : "#444",
                      lineHeight: "18px",
                    }}
                  >
                    {o.status}
                  </span>
                </div>
                <span className="text-[10px] text-[#888]">{o.vendor}</span>
                <span className="text-[9px] text-[#bbb]">{o.date}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-between pt-2"
              style={{ borderTop: "1px solid #f0f0f0" }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[#888]">{o.items}</span>
                <span className="text-xs font-bold text-[#111]">{o.total}</span>
              </div>
              <div className="flex gap-2">
                <Btn label="Details" variant="ghost" size="sm" full={false} />
                {o.status !== "Cancelled" && <Btn label="Reorder" variant="secondary" size="sm" full={false} />}
              </div>
            </div>
          </div>
        ))}
        <EmptyState icon="📭" title="No more orders" sub="Place your first order to get gas delivered to your door." />
      </div>
      <BottomNav active={1} />
    </div>
  );
}

// ─── Screen 12: Profile ───────────────────────────────────────────────────────

function ScreenProfile() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar title="My Profile" action="Edit" />
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div
          className="flex flex-col items-center gap-3 px-4 py-6 bg-white border-b border-[#eee]"
        >
          <div className="relative">
            <Placeholder type="avatar" w={80} h={80} label="" className="rounded-full" />
            <div
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#333", border: "2px solid white" }}
            >
              <span className="text-[10px] text-white">✏</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Skeleton w={140} h={18} />
            <Skeleton w={120} h={12} />
          </div>
          <div className="flex gap-2">
            <Tag label="✓ Verified" />
            <Tag label="12 Orders" />
            <Tag label="Member since 2024" />
          </div>
        </div>
        <div className="flex flex-col gap-0 mt-3">
          <SettingsGroup title="Account">
            <SettingRow icon="👤" label="Personal Information" />
            <SettingRow icon="📍" label="Saved Addresses" value="2 saved" />
            <SettingRow icon="💳" label="Payment Methods" value="MTN MoMo" last />
          </SettingsGroup>
          <div className="mt-3" />
          <SettingsGroup title="Activity">
            <SettingRow icon="📋" label="Order History" />
            <SettingRow icon="⭐" label="My Reviews" />
            <SettingRow icon="🎁" label="Referrals & Rewards" last />
          </SettingsGroup>
          <div className="mt-3" />
          <SettingsGroup title="Preferences">
            <SettingRow icon="🔔" label="Notifications" toggle value="on" />
            <SettingRow icon="⚙" label="Settings" last />
          </SettingsGroup>
          <div className="mt-3" />
          <SettingsGroup title="">
            <SettingRow icon="🚪" label="Log Out" danger last />
          </SettingsGroup>
          <div className="h-4" />
        </div>
      </div>
      <BottomNav active={3} />
    </div>
  );
}

// ─── Screen 13: Settings ──────────────────────────────────────────────────────

function ScreenSettings() {
  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <TopBar back title="Settings" />
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 py-3">
        <SettingsGroup title="General">
          <SettingRow icon="🌐" label="Language" value="English (EN)" />
          <SettingRow icon="📲" label="Push Notifications" toggle value="on" />
          <SettingRow icon="🌙" label="Dark Mode" toggle value="off" last />
        </SettingsGroup>
        <SettingsGroup title="Security">
          <SettingRow icon="🔒" label="Change Password" />
          <SettingRow icon="🔑" label="Two-Factor Auth" toggle value="off" />
          <SettingRow icon="👆" label="Biometric Login" toggle value="on" last />
        </SettingsGroup>
        <SettingsGroup title="Privacy">
          <SettingRow icon="📍" label="Location Access" value="While using" />
          <SettingRow icon="📊" label="Analytics & Data" toggle value="on" last />
        </SettingsGroup>
        <SettingsGroup title="Help & Support">
          <SettingRow icon="❓" label="Help Center" />
          <SettingRow icon="💬" label="Contact Support" />
          <SettingRow icon="⭐" label="Rate GasNow" last />
        </SettingsGroup>
        <SettingsGroup title="Legal">
          <SettingRow icon="📄" label="Privacy Policy" />
          <SettingRow icon="📋" label="Terms of Service" />
          <SettingRow icon="ℹ️" label="App Version" value="v2.1.4" last />
        </SettingsGroup>
        {/* Danger */}
        <div className="px-4 pb-4">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1.5px dashed #ccc" }}
          >
            <div className="px-4 py-2" style={{ background: "#f5f5f5" }}>
              <span className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest">Danger Zone</span>
            </div>
            <div className="px-4 py-3 bg-white">
              <Btn label="Delete Account" variant="danger" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen registry ──────────────────────────────────────────────────────────

const SCREENS: { title: string; component: React.ReactNode }[] = [
  { title: "Splash Screen", component: <ScreenSplash /> },
  { title: "Welcome", component: <ScreenWelcome /> },
  { title: "Register", component: <ScreenRegister /> },
  { title: "Login", component: <ScreenLogin /> },
  { title: "OTP Verification", component: <ScreenOTP /> },
  { title: "Customer Home", component: <ScreenHome /> },
  { title: "Vendor Listing", component: <ScreenVendorListing /> },
  { title: "Vendor Details", component: <ScreenVendorDetails /> },
  { title: "Checkout", component: <ScreenCheckout /> },
  { title: "Order Tracking", component: <ScreenTracking /> },
  { title: "Order History", component: <ScreenHistory /> },
  { title: "Profile", component: <ScreenProfile /> },
  { title: "Settings", component: <ScreenSettings /> },
];

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#dcdcdc", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#d0d0d0] sticky top-0 z-20"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ background: "#333" }} />
            <span className="text-sm font-bold text-[#111] tracking-tight">GasNow</span>
            <span className="text-xs text-[#aaa] font-medium">/ Customer Wireframes</span>
          </div>
          <span className="text-[10px] text-[#bbb]">
            {SCREENS.length} screens · 390 × 844 · Low-fidelity grayscale · 8px grid
          </span>
        </div>
        <div className="flex items-center gap-3">
          {zoom !== null && (
            <button
              onClick={() => setZoom(null)}
              className="text-[11px] bg-[#111] text-white px-4 py-2 rounded-lg font-semibold"
            >
              ✕ Close
            </button>
          )}
          <span className="text-[10px] text-[#bbb] border border-[#e0e0e0] px-3 py-1.5 rounded-lg bg-white">
            Click any screen to zoom
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="flex gap-8 px-8 py-8 items-start" style={{ width: "max-content", minHeight: "100%" }}>
          {SCREENS.map((s, i) => (
            <Frame key={i} title={s.title} index={i + 1} onClick={() => setZoom(i)}>
              {s.component}
            </Frame>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {zoom !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setZoom(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "92vh", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b border-[#eee] flex-shrink-0"
              style={{ background: "#fafafa" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-bold text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#555" }}
                >
                  {zoom + 1}
                </span>
                <span className="text-sm font-bold text-[#111]">{SCREENS[zoom].title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0, zoom - 1))}
                  disabled={zoom === 0}
                  className="text-[11px] border border-[#ddd] px-3 py-1.5 rounded-lg font-semibold text-[#444] disabled:opacity-30 bg-white"
                >
                  ← Prev
                </button>
                <span className="text-[10px] text-[#aaa] w-12 text-center">
                  {zoom + 1} / {SCREENS.length}
                </span>
                <button
                  onClick={() => setZoom(Math.min(SCREENS.length - 1, zoom + 1))}
                  disabled={zoom === SCREENS.length - 1}
                  className="text-[11px] border border-[#ddd] px-3 py-1.5 rounded-lg font-semibold text-[#444] disabled:opacity-30 bg-white"
                >
                  Next →
                </button>
                <button
                  onClick={() => setZoom(null)}
                  className="text-[11px] bg-[#111] text-white px-3 py-1.5 rounded-lg font-semibold"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Screen */}
            <div className="overflow-auto" style={{ maxHeight: "calc(92vh - 60px)" }}>
              <div style={{ width: W, height: H, fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                {SCREENS[zoom].component}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
