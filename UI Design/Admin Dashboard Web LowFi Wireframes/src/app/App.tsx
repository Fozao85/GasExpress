import { useState, useEffect, useCallback } from "react";

// ─── SCALE HOOK ────────────────────────────────────────────────────────────────
function useFrameScale(frameW: number, frameH: number, pad = 32) {
  const [scale, setScale] = useState(1);
  const update = useCallback(() => {
    const sx = (window.innerWidth - pad) / frameW;
    const sy = (window.innerHeight - 56 - pad) / frameH;
    setScale(Math.min(sx, sy, 1));
  }, [frameW, frameH, pad]);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return scale;
}

// ─── WIREFRAME PRIMITIVES ──────────────────────────────────────────────────────

function PhBox({
  label,
  className = "",
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex items-center justify-center border border-dashed border-[#C0C0C0] bg-[#E8E8E8] overflow-hidden ${className}`}
      style={style}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#999" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#999" strokeWidth="1" />
      </svg>
      {label && (
        <span className="relative z-10 text-[10px] font-mono text-[#888] bg-[#E8E8E8] px-1">
          {label}
        </span>
      )}
    </div>
  );
}

function GBox({
  label,
  className = "",
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-[#D4D4D4] flex items-center justify-center ${className}`}
      style={style}
    >
      {label && (
        <span className="text-[10px] font-mono text-[#777]">{label}</span>
      )}
    </div>
  );
}

function Btn({
  label,
  variant = "primary",
  size = "md",
  className = "",
}: {
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "px-2 py-1 text-[10px]", md: "px-3 py-1.5 text-xs", lg: "px-4 py-2 text-xs" };
  const variants = {
    primary: "bg-[#1A1A1A] text-white border-[#1A1A1A]",
    secondary: "bg-white text-[#333] border-[#C8C8C8]",
    ghost: "bg-transparent text-[#666] border-transparent",
    danger: "bg-[#555] text-white border-[#555]",
  };
  return (
    <div
      className={`inline-flex items-center justify-center font-mono border cursor-pointer whitespace-nowrap ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {label}
    </div>
  );
}

function Input({ placeholder, className = "" }: { placeholder?: string; className?: string }) {
  return (
    <div className={`h-9 border border-[#C8C8C8] bg-white flex items-center px-3 ${className}`}>
      <span className="text-[11px] font-mono text-[#ABABAB]">{placeholder ?? "Input"}</span>
    </div>
  );
}

function Badge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}) {
  const variants = {
    default: "bg-[#E4E4E4] text-[#555]",
    success: "bg-[#D0D0D0] text-[#1A1A1A]",
    warning: "bg-[#BEBEBE] text-[#1A1A1A]",
    error: "bg-[#888] text-white",
    info: "bg-[#CCCCCC] text-[#333]",
  };
  return (
    <span className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wide ${variants[variant]}`}>
      {label}
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`w-10 h-5 border flex items-center px-0.5 ${on ? "bg-[#1A1A1A] border-[#1A1A1A] justify-end" : "bg-[#E4E4E4] border-[#C8C8C8] justify-start"}`}
    >
      <div className="w-4 h-4 bg-white" />
    </div>
  );
}

type Row = (string | React.ReactNode)[];

function Table({
  headers,
  rows,
  className = "",
}: {
  headers: string[];
  rows: Row[];
  className?: string;
}) {
  return (
    <div className={`border border-[#D1D1D1] bg-white overflow-hidden ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-[#F0F0F0] border-b border-[#D1D1D1]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3 py-2 text-[9px] font-mono text-[#666] uppercase tracking-widest font-semibold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-[10px] font-mono text-[#444] whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KPICard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
}) {
  return (
    <div className="bg-white border border-[#D1D1D1] p-4 flex flex-col gap-2">
      <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest">{label}</span>
      <span className="text-2xl font-mono font-bold text-[#1A1A1A] leading-none">{value}</span>
      {sub && <span className="text-[10px] font-mono text-[#888]">{sub}</span>}
      {trend && <span className="text-[10px] font-mono text-[#555]">{trend}</span>}
    </div>
  );
}

function BarChart({ label, className = "" }: { label?: string; className?: string }) {
  const bars = [38, 62, 48, 78, 55, 88, 68, 82, 59, 72, 86, 94];
  return (
    <div className={`border border-[#D1D1D1] bg-white overflow-hidden ${className}`}>
      {label && (
        <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
          <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div className="flex items-end gap-1 px-4 pb-4 pt-2" style={{ height: "calc(100% - 37px)" }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-[#C8C8C8]" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function AreaChart({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`border border-[#D1D1D1] bg-white overflow-hidden ${className}`}>
      {label && (
        <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
          <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div style={{ height: "calc(100% - 37px)" }}>
        <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path
            d="M0,100 L33,78 L66,86 L100,52 L133,64 L166,38 L200,56 L233,24 L266,40 L300,16 L333,28 L366,10 L400,22 L400,120 L0,120 Z"
            fill="#D4D4D4"
            opacity="0.6"
          />
          <path
            d="M0,100 L33,78 L66,86 L100,52 L133,64 L166,38 L200,56 L233,24 L266,40 L300,16 L333,28 L366,10 L400,22"
            fill="none"
            stroke="#888"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

function LineChart({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`border border-[#D1D1D1] bg-white overflow-hidden ${className}`}>
      {label && (
        <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
          <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div style={{ height: "calc(100% - 37px)" }}>
        <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
          <path
            d="M0,90 L50,72 L100,80 L150,55 L200,62 L250,42 L300,50 L350,30 L400,38"
            fill="none"
            stroke="#888"
            strokeWidth="2"
          />
          <path
            d="M0,110 L50,95 L100,100 L150,80 L200,85 L250,68 L300,74 L350,55 L400,62"
            fill="none"
            stroke="#C0C0C0"
            strokeWidth="2"
            strokeDasharray="4,3"
          />
        </svg>
      </div>
    </div>
  );
}

function DonutChart({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`border border-[#D1D1D1] bg-white overflow-hidden ${className}`}>
      {label && (
        <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
          <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-6 px-4" style={{ height: "calc(100% - 37px)" }}>
        <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#D4D4D4" strokeWidth="18" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#888" strokeWidth="18"
            strokeDasharray="65 145" strokeDashoffset="0" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#ABABAB" strokeWidth="18"
            strokeDasharray="45 165" strokeDashoffset="-65" />
        </svg>
        <div className="flex flex-col gap-2">
          {[["50kg", "42%", "#888"], ["25kg", "35%", "#ABABAB"], ["12.5kg", "23%", "#D4D4D4"]].map(
            ([l, p, c], i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 shrink-0" style={{ background: c }} />
                <span className="text-[10px] font-mono text-[#555]">{l}</span>
                <span className="text-[10px] font-mono text-[#888]">{p}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({ total, shown }: { total: string; shown: string }) {
  return (
    <div className="flex items-center justify-between bg-white border border-[#D1D1D1] border-t-0 px-4 py-2">
      <span className="text-[10px] font-mono text-[#888]">
        Showing {shown} of {total}
      </span>
      <div className="flex gap-px">
        {["‹", "1", "2", "3", "...", "›"].map((p, i) => (
          <div
            key={i}
            className={`w-7 h-7 flex items-center justify-center text-[10px] font-mono border cursor-pointer ${
              p === "1"
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-[#555] border-[#D1D1D1]"
            }`}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Customers", key: "customers" },
  { label: "Vendors", key: "vendors" },
  { label: "Riders", key: "riders" },
  { label: "Orders", key: "orders" },
  { label: "Payments", key: "payments" },
  { label: "Analytics", key: "analytics" },
  { label: "Settings", key: "settings" },
];

function Sidebar({ active }: { active: string }) {
  return (
    <div className="w-[220px] shrink-0 bg-[#1A1A1A] flex flex-col h-full">
      <div className="px-5 py-4 border-b border-[#333]">
        <div className="flex items-center gap-2.5">
          <GBox className="w-7 h-7" label="" />
          <div>
            <p className="text-xs font-mono font-bold text-white tracking-widest">GASNOW</p>
            <p className="text-[9px] font-mono text-[#666] uppercase tracking-wider">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {NAV.map((item) => (
          <div
            key={item.key}
            className={`flex items-center gap-3 px-3 py-2 text-[11px] font-mono cursor-pointer ${
              active === item.key
                ? "bg-white text-[#1A1A1A] font-semibold"
                : "text-[#9A9A9A] hover:bg-[#2D2D2D] hover:text-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                active === item.key ? "bg-[#1A1A1A]" : "bg-[#444]"
              }`}
            />
            {item.label}
          </div>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-[#333] flex items-center gap-2.5">
        <GBox className="w-8 h-8 rounded-full shrink-0" />
        <div className="min-w-0">
          <p className="text-[11px] font-mono text-white truncate">Super Admin</p>
          <p className="text-[9px] font-mono text-[#666] truncate">admin@gasnow.ng</p>
        </div>
      </div>
    </div>
  );
}

function TopBar({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="h-13 bg-white border-b border-[#E4E4E4] flex items-center px-6 gap-4 shrink-0 py-3">
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-mono font-bold text-[#1A1A1A] leading-none">{title}</h1>
        {sub && <p className="text-[10px] font-mono text-[#888] mt-0.5">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-44 h-8 border border-[#D1D1D1] bg-[#F5F5F5] flex items-center px-2 gap-1.5">
          <span className="text-[#999] text-xs leading-none">⌕</span>
          <span className="text-[10px] font-mono text-[#ABABAB]">Search...</span>
        </div>
        <div className="relative w-8 h-8 border border-[#D1D1D1] flex items-center justify-center text-xs cursor-pointer">
          🔔
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#555] flex items-center justify-center">
            <span className="text-[8px] text-white font-mono">3</span>
          </div>
        </div>
        <div className="w-8 h-8 border border-[#D1D1D1] flex items-center justify-center text-xs cursor-pointer">
          ⚙
        </div>
      </div>
    </div>
  );
}

function Shell({
  active,
  title,
  sub,
  children,
}: {
  active: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full bg-[#F0F0F0]">
      <Sidebar active={active} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={title} sub={sub} />
        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function LoginScreen() {
  return (
    <div className="h-full bg-[#E8E8E8] flex">
      {/* Left branding panel */}
      <div className="w-[480px] bg-[#1A1A1A] flex flex-col items-center justify-center gap-6 p-12">
        <GBox className="w-20 h-20" label="LOGO" />
        <div className="text-center">
          <p className="text-2xl font-mono font-bold text-white tracking-widest">GASNOW</p>
          <p className="text-xs font-mono text-[#666] mt-1 uppercase tracking-wider">LPG Delivery Platform</p>
        </div>
        <div className="mt-8 w-full flex flex-col gap-3">
          {["8,412 Active Customers", "147 Verified Vendors", "389 Delivery Riders", "₦42.8M Monthly Revenue"].map(
            (s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 border border-[#333] bg-[#222]">
                <span className="w-1.5 h-1.5 bg-[#888]" />
                <span className="text-[10px] font-mono text-[#888]">{s}</span>
              </div>
            )
          )}
        </div>
      </div>
      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[380px] bg-white border border-[#D1D1D1] p-8 flex flex-col gap-5">
          <div>
            <h2 className="text-base font-mono font-bold text-[#1A1A1A]">Admin Sign In</h2>
            <p className="text-[10px] font-mono text-[#888] mt-1">Authorized personnel only</p>
          </div>
          <div className="border-t border-[#E8E8E8]" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-[#555] uppercase tracking-widest">Email Address</label>
              <Input placeholder="admin@gasnow.ng" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-[#555] uppercase tracking-widest">Password</label>
              <Input placeholder="••••••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-[#C8C8C8] bg-white" />
                <span className="text-[10px] font-mono text-[#666]">Remember me</span>
              </div>
              <span className="text-[10px] font-mono text-[#555] underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <Btn label="Sign In →" variant="primary" size="lg" className="w-full mt-1" />
          </div>
          <div className="border-t border-[#E8E8E8] pt-3">
            <div className="flex items-center gap-2 p-2 border border-[#E8E8E8] bg-[#F9F9F9]">
              <span className="text-[10px]">🔐</span>
              <span className="text-[9px] font-mono text-[#999]">2FA required on next step</span>
            </div>
          </div>
          <p className="text-center text-[9px] font-mono text-[#ABABAB]">
            GasNow Admin v2.1.0 · Secure Access
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <Shell active="dashboard" title="Dashboard" sub="Welcome back, Super Admin — July 13, 2025">
      {/* KPI row */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <KPICard label="Revenue (MTD)" value="₦42.8M" sub="vs ₦37.5M last month" trend="↑ +14.2%" />
        <KPICard label="Total Orders" value="1,284" sub="Active: 89 · Pending: 47" trend="↑ +8.1%" />
        <KPICard label="Customers" value="8,412" sub="New this week: 84" trend="↑ +5.2%" />
        <KPICard label="Vendors" value="147" sub="Active: 132 · Pending: 12" trend="↑ +2" />
        <KPICard label="Riders" value="389" sub="Online now: 241" trend="↓ −3 today" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <AreaChart label="Revenue Overview — Last 12 Months" className="col-span-2 h-48" />
        <DonutChart label="Order Distribution by Cylinder" className="h-48" />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col">
          <div className="bg-white border border-[#D1D1D1] border-b-0">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8] flex items-center justify-between">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                Recent Orders
              </span>
              <Btn label="View All →" variant="ghost" size="sm" />
            </div>
          </div>
          <Table
            headers={["Order ID", "Customer", "Vendor", "Amount", "Status", "Time"]}
            rows={[
              ["#ORD-7823", "Chukwuemeka A.", "CityGas Ltd", "₦8,500", <Badge label="Delivered" variant="success" />, "2m ago"],
              ["#ORD-7822", "Fatima Bello", "QuickGas NG", "₦12,000", <Badge label="In Transit" variant="info" />, "14m ago"],
              ["#ORD-7821", "Taiwo Okafor", "MegaGas Co.", "₦6,750", <Badge label="Processing" variant="warning" />, "31m ago"],
              ["#ORD-7820", "Adaeze Nwosu", "CityGas Ltd", "₦9,200", <Badge label="Delivered" variant="success" />, "1h ago"],
              ["#ORD-7819", "Musa Ibrahim", "QuickGas NG", "₦15,500", <Badge label="Cancelled" variant="error" />, "2h ago"],
            ]}
          />
          <Pagination total="1,284 orders" shown="1–5" />
        </div>
        {/* Activity */}
        <div className="bg-white border border-[#D1D1D1]">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Recent Activity
            </span>
          </div>
          <div className="p-3 flex flex-col gap-0">
            {[
              { t: "New vendor registered", s: "EkoBotGas Ltd — pending review", time: "5m" },
              { t: "Rider verified", s: "Emeka Eze — ID confirmed", time: "18m" },
              { t: "Refund processed", s: "#ORD-7801 — ₦6,500 returned", time: "42m" },
              { t: "System alert", s: "Payment gateway latency spike", time: "1h" },
              { t: "New customer", s: "Ngozi Obi — Lagos, NG", time: "2h" },
              { t: "Vendor suspended", s: "FastGas Co. — policy violation", time: "3h" },
              { t: "Settlement sent", s: "CityGas Ltd — ₦1.2M disbursed", time: "5h" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-2.5 py-2.5 border-b border-[#F0F0F0] last:border-0"
              >
                <GBox className="w-6 h-6 rounded-full shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-[#333]">{item.t}</p>
                  <p className="text-[9px] font-mono text-[#999] truncate">{item.s}</p>
                </div>
                <span className="text-[9px] font-mono text-[#BDBDBD] shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function CustomersScreen() {
  return (
    <Shell active="customers" title="Customers" sub="Manage all registered platform customers">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[["Total Customers", "8,412"], ["Active (30d)", "5,284"], ["New This Month", "324"], ["Suspended", "89"]].map(
          ([l, v], i) => (
            <div key={i} className="bg-white border border-[#D1D1D1] p-3 flex flex-col gap-1">
              <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest">{l}</span>
              <span className="text-xl font-mono font-bold text-[#1A1A1A]">{v}</span>
            </div>
          )
        )}
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-8 border border-[#C8C8C8] bg-white flex items-center px-2 gap-1.5">
          <span className="text-[#999] text-xs">⌕</span>
          <span className="text-[10px] font-mono text-[#BDBDBD]">
            Search by name, phone, or email…
          </span>
        </div>
        <Btn label="Status ▾" variant="secondary" />
        <Btn label="Date ▾" variant="secondary" />
        <Btn label="Location ▾" variant="secondary" />
        <Btn label="Export CSV" variant="secondary" />
      </div>
      <div className="flex gap-3">
        {/* Table */}
        <div className="flex-1">
          <Table
            headers={["ID", "Name", "Phone", "Location", "Orders", "Total Spent", "Status", "Joined", ""]}
            rows={[
              ["CUS-001", "Chukwuemeka Adeyemi", "+234 801 234 5678", "Lagos", "24", "₦187,500", <Badge label="Active" variant="success" />, "Jan 2024", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-002", "Fatima Bello", "+234 802 345 6789", "Abuja", "11", "₦89,200", <Badge label="Active" variant="success" />, "Feb 2024", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-003", "Taiwo Okafor", "+234 803 456 7890", "Lagos", "6", "₦48,750", <Badge label="Inactive" variant="warning" />, "Mar 2024", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-004", "Adaeze Nwosu", "+234 804 567 8901", "Port Harcourt", "33", "₦264,000", <Badge label="Active" variant="success" />, "Nov 2023", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-005", "Musa Ibrahim", "+234 805 678 9012", "Kano", "3", "₦22,500", <Badge label="Suspended" variant="error" />, "Apr 2024", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-006", "Ngozi Obi", "+234 806 789 0123", "Lagos", "18", "₦142,600", <Badge label="Active" variant="success" />, "Dec 2023", <Btn label="···" variant="ghost" size="sm" />],
              ["CUS-007", "Tunde Fashola", "+234 807 890 1234", "Ibadan", "7", "₦56,000", <Badge label="Active" variant="success" />, "Mar 2024", <Btn label="···" variant="ghost" size="sm" />],
            ]}
          />
          <Pagination total="8,412 customers" shown="1–7" />
        </div>
        {/* Profile panel */}
        <div className="w-[260px] shrink-0 bg-white border border-[#D1D1D1]">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Customer Profile
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2">
              <GBox className="w-14 h-14 rounded-full" label="AVT" />
              <div className="text-center">
                <p className="text-xs font-mono font-bold text-[#1A1A1A]">Chukwuemeka Adeyemi</p>
                <p className="text-[9px] font-mono text-[#888]">CUS-001</p>
                <Badge label="Active" variant="success" />
              </div>
            </div>
            <div className="border-t border-[#E8E8E8]" />
            {[
              ["Phone", "+234 801 234 5678"],
              ["Email", "chukwu@email.com"],
              ["Location", "Lagos Island, NG"],
              ["Joined", "January 15, 2024"],
              ["Total Orders", "24"],
              ["Total Spent", "₦187,500"],
              ["Last Order", "2 days ago"],
              ["Referrals", "3 customers"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-[9px] font-mono text-[#999] uppercase shrink-0">{k}</span>
                <span className="text-[10px] font-mono text-[#333] text-right">{v}</span>
              </div>
            ))}
            <div className="border-t border-[#E8E8E8]" />
            <div className="flex flex-col gap-1.5">
              <Btn label="View Full Profile" variant="primary" size="sm" className="w-full" />
              <Btn label="Send Notification" variant="secondary" size="sm" className="w-full" />
              <Btn label="Suspend Account" variant="secondary" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function VendorsScreen() {
  const [tab, setTab] = useState(0);
  return (
    <Shell active="vendors" title="Vendors" sub="Manage LPG vendors, verification, and compliance">
      {/* Tabs */}
      <div className="flex gap-px mb-4 w-fit border border-[#D1D1D1]">
        {["All Vendors", "Pending Verification", "Suspended"].map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`px-4 py-2 text-[10px] font-mono cursor-pointer border-r border-[#D1D1D1] last:border-0 flex items-center gap-1.5 ${
              tab === i ? "bg-[#1A1A1A] text-white" : "bg-white text-[#555]"
            }`}
          >
            {t}
            {t === "Pending Verification" && (
              <span className="bg-[#888] text-white text-[8px] px-1 py-px font-mono">12</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-8 border border-[#C8C8C8] bg-white flex items-center px-2 gap-1.5">
              <span className="text-[#999] text-xs">⌕</span>
              <span className="text-[10px] font-mono text-[#BDBDBD]">Search vendors…</span>
            </div>
            <Btn label="Category ▾" variant="secondary" />
            <Btn label="Location ▾" variant="secondary" />
            <Btn label="+ Add Vendor" variant="primary" />
          </div>
          <Table
            headers={["ID", "Business Name", "Owner", "Location", "Cylinders", "Orders", "Rating", "Status", ""]}
            rows={[
              ["VND-001", "CityGas Ltd", "Emeka Okonkwo", "Lagos Island", "50kg, 25kg", "1,240", "4.8 ★", <Badge label="Active" variant="success" />, <Btn label="···" variant="ghost" size="sm" />],
              ["VND-002", "QuickGas Nigeria", "Bola Adebayo", "Ikeja, Lagos", "50kg, 12.5kg", "892", "4.6 ★", <Badge label="Active" variant="success" />, <Btn label="···" variant="ghost" size="sm" />],
              ["VND-003", "MegaGas Co.", "Aisha Usman", "Abuja FCT", "50kg, 25kg, 12.5kg", "2,108", "4.9 ★", <Badge label="Active" variant="success" />, <Btn label="···" variant="ghost" size="sm" />],
              ["VND-004", "EkoBotGas Ltd", "Tunde Adebayo", "Victoria Island", "25kg", "—", "—", <Badge label="Pending" variant="warning" />, <Btn label="···" variant="ghost" size="sm" />],
              ["VND-005", "LagosGas Hub", "Chioma Obi", "Surulere", "50kg, 25kg", "—", "—", <Badge label="Pending" variant="warning" />, <Btn label="···" variant="ghost" size="sm" />],
              ["VND-006", "FastGas Co.", "Musa Yusuf", "Kano, NG", "12.5kg", "341", "3.1 ★", <Badge label="Suspended" variant="error" />, <Btn label="···" variant="ghost" size="sm" />],
            ]}
          />
          <Pagination total="147 vendors" shown="1–6" />
        </div>

        {/* Vendor detail */}
        <div className="w-[268px] shrink-0 bg-white border border-[#D1D1D1]">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8] flex items-center justify-between">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Vendor Details
            </span>
            <Badge label="Pending" variant="warning" />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2">
              <PhBox label="Store Photo" className="w-full h-20" />
              <div className="text-center">
                <p className="text-xs font-mono font-bold text-[#1A1A1A]">EkoBotGas Ltd</p>
                <p className="text-[9px] font-mono text-[#888]">VND-004 · Applied 2h ago</p>
              </div>
            </div>
            <div className="border-t border-[#E8E8E8]" />
            {[
              ["Owner", "Tunde Adebayo"],
              ["Phone", "+234 807 123 4567"],
              ["Email", "info@ekobotgas.ng"],
              ["Address", "Victoria Island, Lagos"],
              ["CAC No.", "RC-1234567"],
              ["Cylinders", "25kg (80 units)"],
              ["DPR License", "DPR/2025/4872"],
              ["License Exp.", "Dec 31, 2025"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-[9px] font-mono text-[#999] uppercase shrink-0">{k}</span>
                <span className="text-[10px] font-mono text-[#333] text-right">{v}</span>
              </div>
            ))}
            <div className="border-t border-[#E8E8E8]" />
            <span className="text-[9px] font-mono text-[#999] uppercase tracking-widest">Documents</span>
            <div className="flex flex-col gap-1">
              {["CAC Certificate", "DPR License", "NIS Certificate", "Owner NIN"].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 border border-[#EBEBEB] bg-[#F9F9F9]">
                  <span className="text-[9px] font-mono text-[#555]">📄 {doc}</span>
                  <Btn label="View" variant="ghost" size="sm" />
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E8E8]" />
            <div className="flex gap-2">
              <Btn label="✓ Approve" variant="primary" size="sm" className="flex-1" />
              <Btn label="✕ Reject" variant="danger" size="sm" className="flex-1" />
            </div>
            <Btn label="Request More Info" variant="secondary" size="sm" className="w-full" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function RidersScreen() {
  return (
    <Shell active="riders" title="Riders" sub="Manage delivery riders, verification, and assignments">
      {/* Tabs */}
      <div className="flex gap-px mb-4 w-fit border border-[#D1D1D1]">
        {["All Riders", "Verification Queue", "Suspended"].map((t, i) => (
          <button
            key={i}
            className={`px-4 py-2 text-[10px] font-mono cursor-pointer border-r border-[#D1D1D1] last:border-0 flex items-center gap-1.5 ${
              i === 0 ? "bg-[#1A1A1A] text-white" : "bg-white text-[#555]"
            }`}
          >
            {t}
            {t === "Verification Queue" && (
              <span className="bg-[#888] text-white text-[8px] px-1 py-px font-mono">8</span>
            )}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[["Total Riders", "389"], ["Online Now", "241"], ["In Delivery", "89"], ["Verification Queue", "8"]].map(
          ([l, v], i) => (
            <div key={i} className="bg-white border border-[#D1D1D1] p-3">
              <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest block">{l}</span>
              <span className="text-xl font-mono font-bold text-[#1A1A1A]">{v}</span>
            </div>
          )
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-8 border border-[#C8C8C8] bg-white flex items-center px-2 gap-1.5">
              <span className="text-[#999] text-xs">⌕</span>
              <span className="text-[10px] font-mono text-[#BDBDBD]">Search riders…</span>
            </div>
            <Btn label="Zone ▾" variant="secondary" />
            <Btn label="Status ▾" variant="secondary" />
            <Btn label="+ Onboard Rider" variant="primary" />
          </div>
          <Table
            headers={["ID", "Name", "Phone", "Zone", "Vehicle", "Deliveries", "Rating", "Status", ""]}
            rows={[
              ["RDR-001", "Emeka Eze", "+234 801 111 2222", "Lagos Island", "Motorcycle", "342", "4.7 ★", <Badge label="Online" variant="success" />, <Btn label="···" variant="ghost" size="sm" />],
              ["RDR-002", "Uche Nnamdi", "+234 802 222 3333", "Ikeja", "Motorcycle", "218", "4.5 ★", <Badge label="In Delivery" variant="info" />, <Btn label="···" variant="ghost" size="sm" />],
              ["RDR-003", "Seun Adeleke", "+234 803 333 4444", "VI / Lekki", "Tricycle", "156", "4.9 ★", <Badge label="Offline" />, <Btn label="···" variant="ghost" size="sm" />],
              ["RDR-004", "Biodun Osu", "+234 804 444 5555", "Surulere", "Motorcycle", "89", "4.3 ★", <Badge label="Online" variant="success" />, <Btn label="···" variant="ghost" size="sm" />],
              ["RDR-005", "Kayode Ige", "+234 805 555 6666", "Abuja", "Van", "—", "—", <Badge label="Pending" variant="warning" />, <Btn label="···" variant="ghost" size="sm" />],
              ["RDR-006", "Emeka Chukwu", "+234 806 666 7777", "Kano", "Motorcycle", "—", "—", <Badge label="Pending" variant="warning" />, <Btn label="···" variant="ghost" size="sm" />],
            ]}
          />
          <Pagination total="389 riders" shown="1–6" />
        </div>

        {/* Rider detail */}
        <div className="w-[260px] shrink-0 bg-white border border-[#D1D1D1]">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Rider Details
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2">
              <GBox className="w-14 h-14 rounded-full" label="AVT" />
              <div className="text-center">
                <p className="text-xs font-mono font-bold">Emeka Eze</p>
                <p className="text-[9px] font-mono text-[#888]">RDR-001 · Lagos Island Zone</p>
                <Badge label="Online" variant="success" />
              </div>
            </div>
            <div className="border-t border-[#E8E8E8]" />
            {[
              ["Phone", "+234 801 111 2222"],
              ["Vehicle", "Honda CG 125"],
              ["Plate No.", "LG 234 XY"],
              ["Total Deliveries", "342"],
              ["Rating", "4.7 / 5.0"],
              ["Earnings (MTD)", "₦48,600"],
              ["Joined", "Oct 12, 2023"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-[9px] font-mono text-[#999] uppercase shrink-0">{k}</span>
                <span className="text-[10px] font-mono text-[#333] text-right">{v}</span>
              </div>
            ))}
            <div className="border-t border-[#E8E8E8]" />
            <span className="text-[9px] font-mono text-[#999] uppercase tracking-widest">Documents</span>
            <div className="grid grid-cols-2 gap-1.5">
              <PhBox label="ID Card" className="h-14" />
              <PhBox label="Vehicle Docs" className="h-14" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Btn label="View Full Profile" variant="primary" size="sm" className="w-full" />
              <Btn label="Assign to Zone" variant="secondary" size="sm" className="w-full" />
              <Btn label="Suspend Rider" variant="secondary" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function OrdersScreen() {
  return (
    <Shell active="orders" title="Orders" sub="Track and manage all platform delivery orders">
      {/* Filters */}
      <div className="bg-white border border-[#D1D1D1] p-3 mb-3 flex items-center gap-2 flex-wrap">
        <div className="flex-1 min-w-[180px] h-8 border border-[#C8C8C8] bg-[#F5F5F5] flex items-center px-2 gap-1.5">
          <span className="text-[#999] text-xs">⌕</span>
          <span className="text-[10px] font-mono text-[#BDBDBD]">Search order ID, customer, vendor…</span>
        </div>
        {["Status ▾", "Vendor ▾", "Rider ▾", "Date ▾", "Amount ▾"].map((f, i) => (
          <div key={i} className="h-8 px-3 border border-[#C8C8C8] bg-white flex items-center text-[10px] font-mono text-[#555] cursor-pointer">
            {f}
          </div>
        ))}
        <Btn label="Clear" variant="ghost" size="sm" />
        <Btn label="Export" variant="secondary" size="sm" />
      </div>

      {/* Status tabs */}
      <div className="flex gap-1.5 mb-3">
        {[["All", "1,284", true], ["Pending", "47", false], ["Processing", "89", false], ["In Transit", "124", false], ["Delivered", "982", false], ["Cancelled", "42", false]].map(
          ([l, c, active], i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono border cursor-pointer ${
                active ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#555] border-[#D1D1D1]"
              }`}
            >
              {l}
              <span className={`text-[9px] px-1 ${active ? "bg-[#444] text-white" : "bg-[#E8E8E8] text-[#777]"}`}>
                {c}
              </span>
            </div>
          )
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Table
            headers={["Order ID", "Customer", "Vendor", "Rider", "Item", "Amount", "Status", "Date", ""]}
            rows={[
              ["#ORD-7823", "Chukwuemeka A.", "CityGas Ltd", "Emeka Eze", "50kg × 1", "₦8,500", <Badge label="Delivered" variant="success" />, "Jul 13 14:22", <Btn label="···" variant="ghost" size="sm" />],
              ["#ORD-7822", "Fatima Bello", "QuickGas NG", "Uche N.", "25kg × 2", "₦12,000", <Badge label="In Transit" variant="info" />, "Jul 13 14:08", <Btn label="···" variant="ghost" size="sm" />],
              ["#ORD-7821", "Taiwo Okafor", "MegaGas Co.", "—", "12.5kg × 1", "₦6,750", <Badge label="Processing" variant="warning" />, "Jul 13 13:51", <Btn label="···" variant="ghost" size="sm" />],
              ["#ORD-7820", "Adaeze Nwosu", "CityGas Ltd", "Seun A.", "50kg × 1", "₦9,200", <Badge label="Delivered" variant="success" />, "Jul 13 12:30", <Btn label="···" variant="ghost" size="sm" />],
              ["#ORD-7819", "Musa Ibrahim", "QuickGas NG", "—", "25kg × 1", "₦15,500", <Badge label="Cancelled" variant="error" />, "Jul 13 11:15", <Btn label="···" variant="ghost" size="sm" />],
              ["#ORD-7818", "Ngozi Obi", "CityGas Ltd", "Biodun O.", "50kg × 2", "₦17,000", <Badge label="Delivered" variant="success" />, "Jul 13 10:45", <Btn label="···" variant="ghost" size="sm" />],
            ]}
          />
          <Pagination total="1,284 orders" shown="1–6" />
        </div>

        {/* Order detail panel */}
        <div className="w-[268px] shrink-0 bg-white border border-[#D1D1D1] overflow-y-auto">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8] flex items-center justify-between">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              #ORD-7823
            </span>
            <Badge label="Delivered" variant="success" />
          </div>
          <div className="p-4 flex flex-col gap-3">
            {/* Timeline */}
            <div className="flex flex-col">
              {[
                ["Order Placed", "14:22"],
                ["Vendor Confirmed", "14:25"],
                ["Rider Assigned", "14:28"],
                ["Picked Up", "14:35"],
                ["Delivered", "14:58"],
              ].map(([l, t], i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 bg-[#2D2D2D] rounded-full border-2 border-[#2D2D2D]" />
                    {i < 4 && <div className="w-px h-5 bg-[#D1D1D1]" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-[10px] font-mono text-[#333]">{l}</p>
                    <p className="text-[9px] font-mono text-[#999]">{t}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E8E8]" />
            {[
              ["Customer", "Chukwuemeka A."],
              ["Vendor", "CityGas Ltd"],
              ["Rider", "Emeka Eze"],
              ["Item", "50kg Cylinder × 1"],
              ["Delivery Fee", "₦500"],
              ["Subtotal", "₦8,000"],
              ["Total", "₦8,500"],
              ["Payment", "Paystack · Card"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-[9px] font-mono text-[#999] uppercase shrink-0">{k}</span>
                <span className={`text-[10px] font-mono text-right ${k === "Total" ? "font-bold text-[#1A1A1A]" : "text-[#333]"}`}>{v}</span>
              </div>
            ))}
            <div className="border-t border-[#E8E8E8]" />
            <PhBox label="Delivery Map" className="h-24" />
            <div className="grid grid-cols-2 gap-1.5">
              <Btn label="Invoice" variant="secondary" size="sm" className="w-full" />
              <Btn label="Refund" variant="secondary" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function PaymentsScreen() {
  return (
    <Shell active="payments" title="Payments" sub="Transactions, settlements, and refunds">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[["Revenue (MTD)", "₦42.8M"], ["Pending Settlement", "₦3.2M"], ["Refunds (MTD)", "₦480K"], ["Failed Txns", "24"]].map(
          ([l, v], i) => (
            <div key={i} className="bg-white border border-[#D1D1D1] p-3">
              <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest block">{l}</span>
              <span className="text-xl font-mono font-bold text-[#1A1A1A]">{v}</span>
            </div>
          )
        )}
      </div>
      {/* Tabs */}
      <div className="flex gap-px mb-4 w-fit border border-[#D1D1D1]">
        {["Transactions", "Refunds", "Settlements", "Failed"].map((t, i) => (
          <button
            key={i}
            className={`px-4 py-2 text-[10px] font-mono cursor-pointer border-r border-[#D1D1D1] last:border-0 ${
              i === 0 ? "bg-[#1A1A1A] text-white" : "bg-white text-[#555]"
            }`}
          >
            {t}
            {t === "Failed" && (
              <span className="ml-1 bg-[#888] text-white text-[8px] px-1 py-px font-mono">24</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-8 border border-[#C8C8C8] bg-white flex items-center px-2 gap-1.5">
              <span className="text-[#999] text-xs">⌕</span>
              <span className="text-[10px] font-mono text-[#BDBDBD]">Search TXN ID, customer, amount…</span>
            </div>
            <Btn label="Date Range ▾" variant="secondary" />
            <Btn label="Gateway ▾" variant="secondary" />
            <Btn label="Export" variant="secondary" />
          </div>
          <Table
            headers={["TXN ID", "Order Ref", "Customer", "Amount", "Gateway", "Fee", "Net", "Status", "Date"]}
            rows={[
              ["TXN-98231", "#ORD-7823", "Chukwuemeka A.", "₦8,500", "Paystack", "₦215", "₦8,285", <Badge label="Successful" variant="success" />, "Jul 13 14:22"],
              ["TXN-98230", "#ORD-7822", "Fatima Bello", "₦12,000", "Flutterwave", "₦300", "₦11,700", <Badge label="Successful" variant="success" />, "Jul 13 14:08"],
              ["TXN-98229", "#ORD-7820", "Adaeze Nwosu", "₦9,200", "Paystack", "₦230", "₦8,970", <Badge label="Successful" variant="success" />, "Jul 13 12:30"],
              ["TXN-98228", "#ORD-7819", "Musa Ibrahim", "₦15,500", "Paystack", "₦390", "—", <Badge label="Refunded" variant="warning" />, "Jul 13 11:15"],
              ["TXN-98227", "#ORD-7817", "Grace Amadi", "₦7,800", "Bank Transfer", "₦0", "₦7,800", <Badge label="Failed" variant="error" />, "Jul 13 10:05"],
              ["TXN-98226", "#ORD-7816", "Tunde Fashola", "₦6,000", "Moniepoint", "₦150", "₦5,850", <Badge label="Successful" variant="success" />, "Jul 13 09:40"],
            ]}
          />
          <Pagination total="18,492 transactions" shown="1–6" />
        </div>

        {/* Payment detail */}
        <div className="w-[268px] shrink-0 bg-white border border-[#D1D1D1]">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Payment Detail
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="bg-[#F5F5F5] border border-[#E4E4E4] p-4 text-center flex flex-col gap-1">
              <span className="text-2xl font-mono font-bold text-[#1A1A1A]">₦8,500</span>
              <p className="text-[9px] font-mono text-[#888]">TXN-98231</p>
              <Badge label="Successful" variant="success" />
            </div>
            <div className="border-t border-[#E8E8E8]" />
            {[
              ["Order Ref", "#ORD-7823"],
              ["Customer", "Chukwuemeka A."],
              ["Gateway", "Paystack"],
              ["Channel", "Debit Card (Visa)"],
              ["Auth Code", "AUTH_abc123xyz"],
              ["Platform Fee", "2.5% = ₦215"],
              ["Net to Vendor", "₦8,285"],
              ["Timestamp", "Jul 13 2025 14:22:31"],
              ["Settlement", "Jul 15 2025 (T+2)"],
            ].map(([k, v], i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="text-[9px] font-mono text-[#999] uppercase shrink-0">{k}</span>
                <span className="text-[10px] font-mono text-[#333] text-right">{v}</span>
              </div>
            ))}
            <div className="border-t border-[#E8E8E8]" />
            <div className="flex flex-col gap-1.5">
              <Btn label="Initiate Refund" variant="secondary" size="sm" className="w-full" />
              <Btn label="Download Receipt" variant="ghost" size="sm" className="w-full" />
              <Btn label="Flag Transaction" variant="ghost" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function AnalyticsScreen() {
  return (
    <Shell active="analytics" title="Reports & Analytics" sub="Platform performance and business intelligence">
      {/* Date controls */}
      <div className="flex items-center gap-2 mb-4">
        {["Today", "7 Days", "30 Days", "90 Days", "Custom Range"].map((t, i) => (
          <div
            key={i}
            className={`px-3 py-1.5 text-[10px] font-mono border cursor-pointer ${
              i === 2 ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#555] border-[#D1D1D1]"
            }`}
          >
            {t}
          </div>
        ))}
        <div className="ml-auto flex gap-2">
          <Btn label="Export PDF" variant="secondary" />
          <Btn label="Export CSV" variant="secondary" />
          <Btn label="Schedule Report" variant="secondary" />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {[
          ["Revenue", "₦42.8M", "↑ +14.2%"],
          ["Orders", "12,841", "↑ +8.1%"],
          ["Avg Order Val.", "₦9,240", "↑ +2.3%"],
          ["Avg Delivery Time", "28 min", "↓ −4 min"],
          ["Customer NPS", "78 / 100", "↑ +3 pts"],
        ].map(([l, v, t], i) => (
          <div key={i} className="bg-white border border-[#D1D1D1] p-3">
            <span className="text-[9px] font-mono text-[#888] uppercase tracking-widest block">{l}</span>
            <span className="text-lg font-mono font-bold text-[#1A1A1A]">{v}</span>
            <span className="text-[9px] font-mono text-[#666] block">{t}</span>
          </div>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <AreaChart label="Revenue & Orders — Last 30 Days" className="h-48" />
        <BarChart label="Delivery Metrics — Avg Time by Zone (minutes)" className="h-48" />
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-3 gap-3">
        <LineChart label="User Growth — New vs Returning Customers" className="h-44" />
        <BarChart label="Vendor Performance Score (Top 10)" className="h-44" />
        <div className="bg-white border border-[#D1D1D1] h-44">
          <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Top Vendors by Revenue
            </span>
          </div>
          <div className="p-3 flex flex-col gap-2.5">
            {[["MegaGas Co.", "₦8.4M", 92], ["CityGas Ltd", "₦7.1M", 82], ["QuickGas NG", "₦6.8M", 78], ["SwiftGas Hub", "₦4.2M", 50], ["EkoCylinder", "₦3.9M", 46]].map(
              ([n, r, p], i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <div className="flex justify-between">
                    <span className="text-[9px] font-mono text-[#333]">{n}</span>
                    <span className="text-[9px] font-mono text-[#888]">{r}</span>
                  </div>
                  <div className="h-1.5 bg-[#EBEBEB]">
                    <div className="h-full bg-[#888]" style={{ width: `${p}%` }} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function NotificationsScreen() {
  return (
    <Shell active="settings" title="Notifications" sub="System announcements, alerts, and broadcasts">
      <div className="flex items-center gap-2 mb-4">
        <Btn label="+ New Announcement" variant="primary" />
        <Btn label="+ Send Alert" variant="secondary" />
        <div className="ml-auto flex gap-2">
          <Btn label="Mark All Read" variant="secondary" />
          <Btn label="Type ▾" variant="secondary" />
          <Btn label="Date ▾" variant="secondary" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-3">
          {/* Announcements */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8] flex items-center justify-between">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                System Announcements
              </span>
              <Btn label="+ Create" variant="secondary" size="sm" />
            </div>
            <div className="divide-y divide-[#F0F0F0]">
              {[
                {
                  title: "Scheduled Maintenance — July 20",
                  body: "GasNow will undergo scheduled maintenance on July 20, 2025 from 2:00 AM – 4:00 AM WAT. All services will be temporarily unavailable. Vendors and customers will be notified automatically.",
                  time: "2h ago",
                  type: "Maintenance",
                  unread: true,
                },
                {
                  title: "Moniepoint Integration Live",
                  body: "Moniepoint has been successfully integrated as a payment option. Vendors can now receive settlements via Moniepoint in addition to existing gateways.",
                  time: "1d ago",
                  type: "Update",
                  unread: false,
                },
                {
                  title: "Q2 2025 Performance Report",
                  body: "The Q2 2025 platform performance report is available. Key metrics: 34% growth in order volume, ₦142M revenue, 97.3% delivery success rate.",
                  time: "3d ago",
                  type: "Report",
                  unread: false,
                },
              ].map((n, i) => (
                <div key={i} className={`p-4 flex gap-3 ${n.unread ? "bg-[#F9F9F9]" : ""}`}>
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-[#555]" : "bg-transparent border border-[#D1D1D1]"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-[#1A1A1A]">{n.title}</span>
                      <Badge label={n.type} />
                    </div>
                    <p className="text-[10px] font-mono text-[#666] leading-relaxed">{n.body}</p>
                    <span className="text-[9px] font-mono text-[#BDBDBD] mt-1 block">{n.time}</span>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <Btn label="Edit" variant="ghost" size="sm" />
                    <Btn label="Delete" variant="ghost" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          {/* Alerts */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                System Alerts
              </span>
            </div>
            <div className="divide-y divide-[#F0F0F0]">
              {[
                { l: "Payment gateway latency", sev: "Warning", time: "18m" },
                { l: "Vendor VND-006 auto-suspended", sev: "Action", time: "3h" },
                { l: "Unusual login — new IP", sev: "Critical", time: "6h" },
                { l: "Daily backup completed", sev: "Info", time: "8h" },
                { l: "OTP service fully restored", sev: "Info", time: "1d" },
              ].map((a, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      a.sev === "Critical" ? "bg-[#1A1A1A]" : a.sev === "Warning" ? "bg-[#555]" : "bg-[#C8C8C8]"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono text-[#333]">{a.l}</p>
                    <p className="text-[9px] font-mono text-[#999]">{a.time} ago</p>
                  </div>
                  <Badge
                    label={a.sev}
                    variant={a.sev === "Critical" ? "error" : a.sev === "Warning" ? "warning" : "default"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notification channels */}
          <div className="bg-white border border-[#D1D1D1] p-4 flex flex-col gap-3">
            <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
              Notification Channels
            </span>
            {[
              ["Email Alerts", true],
              ["SMS Notifications", true],
              ["Slack Webhook", false],
              ["Push Notifications", true],
              ["In-App Alerts", true],
            ].map(([l, on], i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#555]">{l as string}</span>
                <Toggle on={on as boolean} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function SettingsScreen() {
  const [tab, setTab] = useState("platform");
  const tabs = ["Platform", "Admin Users", "Roles & Permissions", "Security"];

  return (
    <Shell active="settings" title="Settings" sub="Platform configuration and administration">
      <div className="flex gap-px mb-5 w-fit border border-[#D1D1D1]">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(t.toLowerCase())}
            className={`px-4 py-2 text-[10px] font-mono cursor-pointer border-r border-[#D1D1D1] last:border-0 ${
              tab === t.toLowerCase() ? "bg-[#1A1A1A] text-white" : "bg-white text-[#555]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          {/* General settings */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                General Platform Settings
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {[
                ["Platform Name", "GasNow"],
                ["Support Email", "support@gasnow.ng"],
                ["Support Phone", "+234 800 GASNOW (427669)"],
                ["Default Currency", "NGN (₦)"],
                ["Default Delivery Radius", "15 km"],
                ["Platform Commission", "8.5%"],
                ["Minimum Order Amount", "₦5,000"],
              ].map(([l, v], i) => (
                <div key={i} className="flex items-center gap-4">
                  <label className="w-52 text-[10px] font-mono text-[#555] shrink-0">{l}</label>
                  <div className="flex-1 h-8 border border-[#D1D1D1] bg-[#F9F9F9] flex items-center px-3">
                    <span className="text-[10px] font-mono text-[#333]">{v}</span>
                  </div>
                  <Btn label="Edit" variant="ghost" size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Feature toggles */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                Feature Toggles
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                ["Vendor Self-Registration", true],
                ["Rider Self-Onboarding", true],
                ["Customer Reviews", true],
                ["Scheduled Deliveries", false],
                ["Subscription Orders", false],
                ["Bulk Order Discounts", true],
                ["Real-Time Order Tracking", true],
                ["Referral Programme", false],
              ].map(([l, on], i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-[#F0F0F0]">
                  <span className="text-[10px] font-mono text-[#333]">{l as string}</span>
                  <Toggle on={on as boolean} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Admin users */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8] flex items-center justify-between">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                Admin Users
              </span>
              <Btn label="+ Invite" variant="secondary" size="sm" />
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              {[
                { name: "Super Admin", email: "admin@gasnow.ng", role: "Super Admin" },
                { name: "Amaka Osei", email: "amaka@gasnow.ng", role: "Operations" },
                { name: "Babatunde L.", email: "bab@gasnow.ng", role: "Finance" },
                { name: "Chidinma E.", email: "chidi@gasnow.ng", role: "Support" },
                { name: "Rotimi K.", email: "rotimi@gasnow.ng", role: "Vendor Ops" },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-2 p-2 border border-[#F0F0F0]">
                  <GBox className="w-7 h-7 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono text-[#333] truncate">{u.name}</p>
                    <p className="text-[9px] font-mono text-[#999] truncate">{u.email}</p>
                  </div>
                  <Badge label={u.role} />
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border border-[#D1D1D1]">
            <div className="px-4 py-2.5 border-b border-[#E8E8E8]">
              <span className="text-[9px] font-mono font-semibold text-[#555] uppercase tracking-widest">
                Security Settings
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {[
                ["Two-Factor Auth (2FA)", true],
                ["Session Timeout (30m)", true],
                ["IP Allowlist", false],
                ["Audit Logging", true],
                ["CAPTCHA on Login", true],
                ["Password Policy (Strong)", true],
              ].map(([l, on], i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#555]">{l as string}</span>
                  <Toggle on={on as boolean} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function StatesScreen() {
  return (
    <Shell className="h-full bg-[#E8E8E8] p-6 overflow-auto">
      <p className="text-[9px] font-mono text-[#888] uppercase tracking-widest mb-5">
        UI States — Loading · Empty · Error
      </p>
      <div className="grid grid-cols-3 gap-6">
        {/* LOADING */}
        <div className="flex flex-col gap-3">
          <p className="text-[9px] font-mono text-[#888] uppercase tracking-widest">Loading State</p>
          <div className="bg-white border border-[#D1D1D1] p-4 flex flex-col gap-3">
            <div className="h-3 bg-[#E8E8E8] w-3/4 rounded-sm animate-pulse" />
            <div className="h-2.5 bg-[#EFEFEF] w-full rounded-sm animate-pulse" />
            <div className="h-2.5 bg-[#EFEFEF] w-5/6 rounded-sm animate-pulse" />
            <div className="h-2.5 bg-[#EFEFEF] w-2/3 rounded-sm animate-pulse" />
          </div>
          <div className="bg-white border border-[#D1D1D1]">
            <div className="h-8 bg-[#E8E8E8] animate-pulse border-b border-[#D1D1D1]" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 border-b border-[#F0F0F0] px-3 flex items-center gap-3">
                <div className="h-2.5 bg-[#EFEFEF] animate-pulse w-10 rounded-sm" />
                <div className="h-2.5 bg-[#EFEFEF] animate-pulse flex-1 rounded-sm" />
                <div className="h-2.5 bg-[#EFEFEF] animate-pulse w-14 rounded-sm" />
                <div className="h-4 bg-[#E8E8E8] animate-pulse w-12 rounded-sm" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#D1D1D1] p-3">
                <div className="h-2 bg-[#EFEFEF] animate-pulse w-12 mb-2 rounded-sm" />
                <div className="h-5 bg-[#E4E4E4] animate-pulse w-16 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY */}
        <div className="flex flex-col gap-3">
          <p className="text-[9px] font-mono text-[#888] uppercase tracking-widest">Empty State</p>
          <div className="bg-white border border-[#D1D1D1] p-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-2 border-dashed border-[#C8C8C8] flex items-center justify-center">
              <span className="text-3xl text-[#D1D1D1] leading-none font-thin">○</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-mono font-semibold text-[#555]">No orders found</p>
              <p className="text-[10px] font-mono text-[#999] mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
            <Btn label="Clear Filters" variant="secondary" />
          </div>
          <div className="bg-white border border-[#D1D1D1] p-8 flex flex-col items-center gap-4">
            <PhBox className="w-20 h-16" label="No Data" />
            <div className="text-center">
              <p className="text-sm font-mono font-semibold text-[#555]">
                No vendors pending
              </p>
              <p className="text-[10px] font-mono text-[#999] mt-1">
                All applications have been reviewed
              </p>
            </div>
          </div>
          <div className="bg-white border border-dashed border-[#C8C8C8] p-6 flex flex-col items-center gap-3">
            <GBox className="w-12 h-12" label="+" />
            <p className="text-[10px] font-mono text-[#888] text-center">
              No riders onboarded yet.<br />Add the first rider to get started.
            </p>
            <Btn label="+ Onboard Rider" variant="primary" size="sm" />
          </div>
        </div>

        {/* ERROR */}
        <div className="flex flex-col gap-3">
          <p className="text-[9px] font-mono text-[#888] uppercase tracking-widest">Error State</p>
          <div className="bg-white border-2 border-dashed border-[#888] p-8 flex flex-col items-center gap-4">
            <GBox className="w-14 h-14 text-xl" label="✕" />
            <div className="text-center">
              <p className="text-sm font-mono font-bold text-[#1A1A1A]">Failed to load data</p>
              <p className="text-[10px] font-mono text-[#777] mt-1 leading-relaxed">
                Unable to reach the server. Check your connection and try again.
              </p>
            </div>
            <div className="flex gap-2">
              <Btn label="Retry" variant="primary" size="sm" />
              <Btn label="Go Back" variant="secondary" size="sm" />
            </div>
          </div>
          <div className="bg-[#F5F5F5] border border-[#C8C8C8] p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <GBox className="w-4 h-4 shrink-0" label="!" />
              <span className="text-[10px] font-mono font-semibold text-[#333]">
                Error 500 — Internal Server Error
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#666] leading-relaxed">
              The request could not be completed. Error code:{" "}
              <span className="font-semibold">PAYMENT_GATEWAY_TIMEOUT</span>
            </p>
            <div className="flex gap-2 mt-1">
              <Btn label="Retry" variant="secondary" size="sm" />
              <Btn label="Contact Support" variant="ghost" size="sm" />
            </div>
          </div>
          <div className="bg-white border border-[#D1D1D1] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-[#888] text-white text-[9px] flex items-center justify-center font-mono shrink-0">
                !
              </div>
              <span className="text-[10px] font-mono font-semibold text-[#333]">Access Denied — 403</span>
            </div>
            <p className="text-[10px] font-mono text-[#666] leading-relaxed">
              You don't have permission to view this resource. Contact your Super Admin to request access.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const SCREENS = [
  { key: "login", label: "01 — Login" },
  { key: "dashboard", label: "02 — Dashboard" },
  { key: "customers", label: "03 — Customers" },
  { key: "vendors", label: "04 — Vendors" },
  { key: "riders", label: "05 — Riders" },
  { key: "orders", label: "06 — Orders" },
  { key: "payments", label: "07 — Payments" },
  { key: "analytics", label: "08 — Analytics" },
  { key: "notifications", label: "09 — Notifications" },
  { key: "settings", label: "10 — Settings" },
  { key: "states", label: "↳ States" },
];

function renderScreen(key: string) {
  switch (key) {
    case "login": return <LoginScreen />;
    case "dashboard": return <DashboardScreen />;
    case "customers": return <CustomersScreen />;
    case "vendors": return <VendorsScreen />;
    case "riders": return <RidersScreen />;
    case "orders": return <OrdersScreen />;
    case "payments": return <PaymentsScreen />;
    case "analytics": return <AnalyticsScreen />;
    case "notifications": return <NotificationsScreen />;
    case "settings": return <SettingsScreen />;
    case "states": return <StatesScreen />;
    default: return <DashboardScreen />;
  }
}

export default function App() {
  const [active, setActive] = useState("login");
  const scale = useFrameScale(1440, 1024);
  const idx = SCREENS.findIndex((s) => s.key === active);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#111" }}>
      {/* Viewer toolbar */}
      <div
        className="shrink-0 flex items-center gap-3 px-4 border-b"
        style={{ background: "#0E0E0E", borderColor: "#2A2A2A", height: "44px" }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-5 h-5 flex items-center justify-center text-[8px] font-mono text-white"
            style={{ background: "#444" }}
          >
            GN
          </div>
          <span className="text-[10px] font-mono" style={{ color: "#777" }}>
            GasNow Admin Wireframes
          </span>
          <span
            className="text-[9px] font-mono px-1.5 py-px border"
            style={{ color: "#555", borderColor: "#333" }}
          >
            1440 × 1024
          </span>
        </div>

        {/* Screen tabs */}
        <div className="flex-1 flex items-center gap-px overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SCREENS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className="shrink-0 px-3 py-1 text-[9px] font-mono cursor-pointer border whitespace-nowrap transition-colors"
              style={{
                background: active === s.key ? "#FFFFFF" : "transparent",
                color: active === s.key ? "#1A1A1A" : "#666",
                borderColor: active === s.key ? "#FFFFFF" : "#333",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setActive(SCREENS[Math.max(0, idx - 1)].key)}
            disabled={idx === 0}
            className="w-7 h-7 flex items-center justify-center text-[10px] font-mono border disabled:opacity-25"
            style={{ color: "#666", borderColor: "#444", background: "transparent" }}
          >
            ‹
          </button>
          <span className="text-[9px] font-mono w-12 text-center" style={{ color: "#555" }}>
            {idx + 1} / {SCREENS.length}
          </span>
          <button
            onClick={() => setActive(SCREENS[Math.min(SCREENS.length - 1, idx + 1)].key)}
            disabled={idx === SCREENS.length - 1}
            className="w-7 h-7 flex items-center justify-center text-[10px] font-mono border disabled:opacity-25"
            style={{ color: "#666", borderColor: "#444", background: "transparent" }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Frame viewport */}
      <div
        className="flex-1 flex items-start justify-center overflow-hidden"
        style={{ background: "#1C1C1C", padding: "16px" }}
      >
        <div
          className="bg-white shadow-2xl overflow-hidden"
          style={{
            width: "1440px",
            height: "1024px",
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {renderScreen(active)}
        </div>
      </div>
    </div>
  );
}
