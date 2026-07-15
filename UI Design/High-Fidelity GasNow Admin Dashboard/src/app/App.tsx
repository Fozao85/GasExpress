import { useState } from "react";
import {
  LayoutDashboard, Users, Store, Bike, ShoppingCart, CreditCard,
  BarChart2, Bell, Settings, LogOut, Search, ChevronDown, ChevronRight,
  TrendingUp, TrendingDown, Package, MapPin, Phone, Mail, Star,
  CheckCircle, XCircle, Clock, AlertTriangle, Info, ArrowUpRight,
  Filter, Download, Plus, Eye, RefreshCw, Shield, ToggleLeft, ToggleRight,
  Flame, Truck, UserCheck, FileText, Activity, DollarSign, ChevronLeft,
  MoreHorizontal, X, Check, Send, Edit3, Trash2, Lock, Globe, Zap,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

type Page =
  | "login" | "dashboard" | "customers" | "vendors"
  | "riders" | "orders" | "payments" | "analytics"
  | "notifications" | "settings";

// ─── Color palette ────────────────────────────────────────────────────────────
const C = {
  blue: "#1565C0",
  blueLight: "#E8F0FE",
  blueDark: "#0D47A1",
  orange: "#FF8F00",
  orangeLight: "#FFF3E0",
  green: "#2E7D32",
  greenLight: "#E8F5E9",
  red: "#D32F2F",
  redLight: "#FFEBEE",
  purple: "#7B1FA2",
  purpleLight: "#F3E5F5",
  bg: "#F1F5F9",
  card: "#ffffff",
  sidebar: "#0F172A",
  sidebarMid: "#1E293B",
  border: "#E2E8F0",
  text: "#0F172A",
  textMid: "#334155",
  textMuted: "#64748B",
  textLight: "#94A3B8",
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  ACTIVE:      { bg: C.greenLight,  text: C.green,  dot: C.green,  label: "Active" },
  INACTIVE:    { bg: "#F1F5F9",     text: C.textMuted, dot: C.textMuted, label: "Inactive" },
  SUSPENDED:   { bg: C.redLight,    text: C.red,    dot: C.red,    label: "Suspended" },
  PENDING:     { bg: C.orangeLight, text: C.orange, dot: C.orange, label: "Pending" },
  DELIVERED:   { bg: C.greenLight,  text: C.green,  dot: C.green,  label: "Delivered" },
  "IN TRANSIT":{ bg: C.blueLight,   text: C.blue,   dot: C.blue,   label: "In Transit" },
  PROCESSING:  { bg: C.orangeLight, text: C.orange, dot: C.orange, label: "Processing" },
  CANCELLED:   { bg: C.redLight,    text: C.red,    dot: C.red,    label: "Cancelled" },
  SUCCESSFUL:  { bg: C.greenLight,  text: C.green,  dot: C.green,  label: "Successful" },
  REFUNDED:    { bg: C.purpleLight, text: C.purple, dot: C.purple, label: "Refunded" },
  FAILED:      { bg: C.redLight,    text: C.red,    dot: C.red,    label: "Failed" },
  ONLINE:      { bg: C.greenLight,  text: C.green,  dot: C.green,  label: "Online" },
  OFFLINE:     { bg: "#F1F5F9",     text: C.textMuted, dot: C.textMuted, label: "Offline" },
  "IN DELIVERY":{ bg: C.blueLight,  text: C.blue,   dot: C.blue,   label: "In Delivery" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusConfig[status] || { bg: "#F1F5F9", text: C.textMuted, dot: C.textMuted, label: status };
  return (
    <span style={{ background: s.bg, color: s.text }} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
      <span style={{ background: s.dot }} className="w-1.5 h-1.5 rounded-full" />
      {s.label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 32, color }: { name: string; size?: number; color?: string }) {
  const colors = [C.blue, C.orange, C.green, C.purple, "#0097A7", "#E64A19"];
  const idx = name.charCodeAt(0) % colors.length;
  const bg = color || colors[idx];
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0">
      {initials}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, icon: Icon, color, className = "" }:
  { label: string; value: string; sub?: string; trend?: string; icon: any; color: string; className?: string }) {
  const isPos = trend?.startsWith("+");
  return (
    <div style={{ background: C.card, borderRadius: 16 }} className={`p-5 shadow-sm border border-slate-100 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div style={{ background: color + "18" }} className="p-2.5 rounded-xl">
          <Icon size={20} style={{ color }} />
        </div>
        {trend && (
          <span style={{ color: isPos ? C.green : C.red }} className="flex items-center gap-0.5 text-xs font-semibold">
            {isPos ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}
          </span>
        )}
      </div>
      <div style={{ color: C.text }} className="text-2xl font-bold mb-0.5">{value}</div>
      <div style={{ color: C.textMuted }} className="text-xs font-medium">{label}</div>
      {sub && <div style={{ color: C.textLight }} className="text-xs mt-1">{sub}</div>}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard",     label: "Dashboard",      icon: LayoutDashboard },
  { id: "customers",     label: "Customers",       icon: Users },
  { id: "vendors",       label: "Vendors",         icon: Store },
  { id: "riders",        label: "Riders",          icon: Bike },
  { id: "orders",        label: "Orders",          icon: ShoppingCart },
  { id: "payments",      label: "Payments",        icon: CreditCard },
  { id: "analytics",     label: "Analytics",       icon: BarChart2 },
  { id: "notifications", label: "Notifications",   icon: Bell },
  { id: "settings",      label: "Settings",        icon: Settings },
];

function Sidebar({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  return (
    <aside style={{ background: C.sidebar, width: 240, minHeight: "100vh" }}
      className="flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-3">
        <div style={{ background: C.blue }} className="w-9 h-9 rounded-xl flex items-center justify-center">
          <Flame size={18} color="white" />
        </div>
        <div>
          <div className="text-white font-bold text-base tracking-wide">GasNow</div>
          <div style={{ color: C.textMuted }} className="text-[10px] uppercase tracking-widest">Admin Portal</div>
        </div>
      </div>

      <div style={{ borderColor: C.sidebarMid }} className="border-t mx-4 mb-4" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = current === id;
          return (
            <button key={id} onClick={() => onNav(id as Page)}
              style={{
                background: active ? C.blue : "transparent",
                color: active ? "white" : C.textMuted,
                borderRadius: 10,
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-700 hover:text-white text-left">
              <Icon size={16} />
              {label}
              {id === "notifications" && (
                <span style={{ background: C.orange }} className="ml-auto text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
              )}
              {id === "vendors" && (
                <span style={{ background: C.orange }} className="ml-auto text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">11</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ borderColor: C.sidebarMid }} className="border-t mx-4 mt-4 pt-4 pb-5 px-1">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar name="Super Admin" size={32} color={C.blue} />
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">Super Admin</div>
            <div style={{ color: C.textMuted }} className="text-xs truncate">admin@gasnow.ng</div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors"><LogOut size={14} /></button>
        </div>
      </div>
    </aside>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}
      className="flex items-center justify-between px-8 py-4 shrink-0">
      <div>
        <h1 style={{ color: C.text }} className="text-lg font-semibold">{title}</h1>
        <p style={{ color: C.textMuted }} className="text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10 }}
          className="flex items-center gap-2 px-3 py-2">
          <Search size={14} style={{ color: C.textMuted }} />
          <input placeholder="Search…" style={{ background: "transparent", color: C.text, outline: "none", width: 180 }}
            className="text-sm placeholder-slate-400" />
        </div>
        <button style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10 }}
          className="relative p-2.5">
          <Bell size={16} style={{ color: C.textMuted }} />
          <span style={{ background: C.orange }} className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" />
        </button>
        <Avatar name="Super Admin" size={34} color={C.blue} />
      </div>
    </header>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
function Btn({ children, variant = "primary", icon: Icon, onClick, small, className = "" }:
  { children: React.ReactNode; variant?: "primary"|"secondary"|"ghost"|"danger"; icon?: any; onClick?: () => void; small?: boolean; className?: string }) {
  const styles = {
    primary:   { background: C.blue, color: "white", border: "none" },
    secondary: { background: C.bg, color: C.textMid, border: `1px solid ${C.border}` },
    ghost:     { background: "transparent", color: C.textMid, border: `1px solid ${C.border}` },
    danger:    { background: C.redLight, color: C.red, border: `1px solid ${C.red}22` },
  };
  return (
    <button onClick={onClick} style={{ ...styles[variant], borderRadius: 10, cursor: "pointer" }}
      className={`flex items-center gap-2 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} font-semibold transition-opacity hover:opacity-80 ${className}`}>
      {Icon && <Icon size={small ? 12 : 14} />}
      {children}
    </button>
  );
}

// ─── Search bar ───────────────────────────────────────────────────────────────
function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 }}
      className="flex items-center gap-2 px-3 py-2 flex-1">
      <Search size={14} style={{ color: C.textMuted }} />
      <input placeholder={placeholder} style={{ background: "transparent", color: C.text, outline: "none", width: "100%" }}
        className="text-sm placeholder-slate-400" />
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
function Table({ headers, rows, onRowClick, selectedRow }:
  { headers: string[]; rows: (string | React.ReactNode)[][]; onRowClick?: (i: number) => void; selectedRow?: number }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
      <table className="w-full text-sm">
        <thead style={{ background: C.bg }}>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ color: C.textMuted, borderBottom: `1px solid ${C.border}` }}
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} onClick={() => onRowClick?.(i)}
              style={{
                background: selectedRow === i ? C.blueLight : i % 2 === 0 ? C.card : "#FAFBFC",
                cursor: onRowClick ? "pointer" : "default",
                borderBottom: `1px solid ${C.border}`,
              }}
              className="hover:bg-blue-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} style={{ color: C.textMid }} className="px-4 py-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ total, showing }: { total: string; showing: string }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <span style={{ color: C.textMuted }} className="text-xs">{showing}</span>
      <div className="flex items-center gap-1">
        <button style={{ border: `1px solid ${C.border}`, borderRadius: 7 }}
          className="p-1.5 hover:bg-slate-100"><ChevronLeft size={14} style={{ color: C.textMuted }} /></button>
        {[1, 2, 3, "…", 12].map((p, i) => (
          <button key={i} style={{
            background: p === 1 ? C.blue : "transparent",
            color: p === 1 ? "white" : C.textMuted,
            border: `1px solid ${p === 1 ? C.blue : C.border}`,
            borderRadius: 7, minWidth: 30,
          }} className="py-1 text-xs font-semibold">{p}</button>
        ))}
        <button style={{ border: `1px solid ${C.border}`, borderRadius: 7 }}
          className="p-1.5 hover:bg-slate-100"><ChevronRight size={14} style={{ color: C.textMuted }} /></button>
      </div>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ background: on ? C.blue : C.border, borderRadius: 999, width: 40, height: 22, padding: 3, transition: "background 0.2s" }}
      className="flex items-center cursor-pointer">
      <div style={{ background: "white", width: 16, height: 16, borderRadius: 999, transform: on ? "translateX(18px)" : "translateX(0)", transition: "transform 0.2s" }} />
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, ...style }}
      className={`shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div style={{ background: C.sidebar, minHeight: "100vh" }} className="flex">
      {/* Left panel */}
      <div style={{ width: 380, background: C.sidebarMid }} className="flex flex-col items-center justify-center p-12 shrink-0">
        <div style={{ background: C.blue }} className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Flame size={32} color="white" />
        </div>
        <h1 className="text-white text-3xl font-bold mb-1">GasNow</h1>
        <p style={{ color: C.textMuted }} className="text-sm mb-12 tracking-widest uppercase">LPG Delivery Platform</p>

        <div className="w-full space-y-3">
          {[
            { icon: Users, label: "8,412 Active Customers" },
            { icon: Store, label: "147 Verified Vendors" },
            { icon: Bike,  label: "389 Delivery Riders" },
            { icon: DollarSign, label: "₦42.8M Monthly Revenue" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ background: "#ffffff0d", borderRadius: 10, border: "1px solid #ffffff12" }}
              className="flex items-center gap-3 px-4 py-3">
              <Icon size={16} style={{ color: C.orange }} />
              <span style={{ color: "#CBD5E1" }} className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center" style={{ background: "#F8FAFC" }}>
        <div style={{ background: C.card, borderRadius: 20, width: 420 }} className="p-10 shadow-xl border border-slate-100">
          <div className="mb-8">
            <h2 style={{ color: C.text }} className="text-2xl font-bold mb-1">Admin Sign In</h2>
            <p style={{ color: C.textMuted }} className="text-sm">Authorized personnel only</p>
          </div>

          <div className="space-y-5">
            <div>
              <label style={{ color: C.textMid }} className="block text-xs font-semibold uppercase tracking-wide mb-2">Email Address</label>
              <input defaultValue="admin@gasnow.ng"
                style={{ border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, background: C.bg }}
                className="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label style={{ color: C.textMid }} className="block text-xs font-semibold uppercase tracking-wide mb-2">Password</label>
              <input type="password" defaultValue="password"
                style={{ border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, background: C.bg }}
                className="w-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span style={{ color: C.textMuted }} className="text-sm">Remember me</span>
              </label>
              <button style={{ color: C.blue }} className="text-sm font-medium hover:underline">Forgot password?</button>
            </div>

            <button onClick={onLogin}
              style={{ background: C.blue, borderRadius: 10 }}
              className="w-full py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
              Sign In →
            </button>

            <div style={{ background: C.orangeLight, border: `1px solid ${C.orange}30`, borderRadius: 10 }}
              className="flex items-center gap-3 px-4 py-3">
              <Shield size={16} style={{ color: C.orange }} />
              <span style={{ color: C.orange }} className="text-xs font-medium">2FA required on next step</span>
            </div>
          </div>

          <p style={{ color: C.textLight }} className="text-center text-xs mt-8">
            GasNow Admin v2.1.0 · Secure Access
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Aug", revenue: 28 }, { month: "Sep", revenue: 31 }, { month: "Oct", revenue: 27 },
  { month: "Nov", revenue: 35 }, { month: "Dec", revenue: 42 }, { month: "Jan", revenue: 38 },
  { month: "Feb", revenue: 33 }, { month: "Mar", revenue: 39 }, { month: "Apr", revenue: 45 },
  { month: "May", revenue: 41 }, { month: "Jun", revenue: 48 }, { month: "Jul", revenue: 43 },
];
const cylinderData = [
  { name: "50kg", value: 42, color: C.blue },
  { name: "25kg", value: 35, color: C.orange },
  { name: "12.5kg", value: 23, color: C.green },
];
const recentOrders = [
  { id: "#ORD-7823", customer: "Chukwuemeka A.", vendor: "CityGas Ltd",    amount: "₦8,500",  status: "DELIVERED",   time: "2m ago" },
  { id: "#ORD-7822", customer: "Fatima Bello",   vendor: "QuickGas NG",   amount: "₦12,000", status: "IN TRANSIT",  time: "14m ago" },
  { id: "#ORD-7821", customer: "Taiwo Okafor",   vendor: "MegaGas Co.",   amount: "₦6,750",  status: "PROCESSING",  time: "31m ago" },
  { id: "#ORD-7820", customer: "Adaeze Nwosu",   vendor: "CityGas Ltd",   amount: "₦9,200",  status: "DELIVERED",   time: "1h ago" },
  { id: "#ORD-7819", customer: "Musa Ibrahim",   vendor: "QuickGas NG",   amount: "₦15,500", status: "CANCELLED",   time: "2h ago" },
];
const activity = [
  { icon: Store,     label: "New vendor registered",    sub: "EkoHotGas Ltd – pending review",   time: "5s",  color: C.blue },
  { icon: UserCheck, label: "Rider verified",           sub: "Emeka Eze – ID confirmed",         time: "10s", color: C.green },
  { icon: RefreshCw, label: "Refund processed",         sub: "#ORD-7800 – ₦6,500 returned",     time: "42s", color: C.purple },
  { icon: AlertTriangle, label: "System alert",         sub: "Payment gateway latency spike",    time: "1m",  color: C.orange },
  { icon: Users,     label: "New customer",             sub: "Ngozi Obi – Lagos, NG",            time: "2m",  color: C.blue },
  { icon: XCircle,   label: "Vendor suspended",         sub: "TastKes Co. – policy violation",  time: "5m",  color: C.red },
  { icon: DollarSign, label: "Settlement sent",         sub: "CityGas Ltd – ₦1.2M disbursed",  time: "8m",  color: C.green },
];

function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto" style={{ background: C.bg }}>
      <TopBar title="Dashboard" subtitle={`Welcome back, Super Admin · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`} />
      <div className="p-8 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard label="Revenue (MTD)"   value="₦42.8M" trend="+14.2%" sub="vs ₦37.5M last month" icon={DollarSign} color={C.blue} />
          <StatCard label="Total Orders"    value="1,284"  trend="+8.1%"  sub="Active: 89 · Pending: 47" icon={ShoppingCart} color={C.orange} />
          <StatCard label="Customers"       value="8,412"  trend="+5.2%"  sub="New this week: 84" icon={Users} color={C.purple} />
          <StatCard label="Vendors"         value="147"    trend="+2"     sub="Active: 132 · Pending: 32" icon={Store} color={C.green} />
          <StatCard label="Riders"          value="389"    sub="Online now: 241 · -3 today" trend="+7" icon={Bike} color={C.orange} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Revenue chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 style={{ color: C.text }} className="font-semibold text-sm">Revenue Overview</h3>
                <p style={{ color: C.textMuted }} className="text-xs mt-0.5">Last 12 months</p>
              </div>
              <Btn variant="secondary" small icon={Download}>Export</Btn>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.blue} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `₦${v}M`} />
                <Tooltip formatter={(v: any) => [`₦${v}M`, "Revenue"]} contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke={C.blue} strokeWidth={2.5} fill="url(#rev)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Cylinder distribution */}
          <Card className="p-6">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-1">Order Distribution</h3>
            <p style={{ color: C.textMuted }} className="text-xs mb-4">By cylinder size</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={cylinderData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                  {cylinderData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {cylinderData.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ background: d.color }} className="w-2.5 h-2.5 rounded-sm" />
                    <span style={{ color: C.textMid }} className="text-xs">{d.name}</span>
                  </div>
                  <span style={{ color: C.text }} className="text-xs font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent orders */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: C.text }} className="font-semibold text-sm">Recent Orders</h3>
              <button style={{ color: C.blue }} className="text-xs font-semibold hover:underline flex items-center gap-1">
                View All <ArrowUpRight size={12} />
              </button>
            </div>
            <Table
              headers={["Order ID", "Customer", "Vendor", "Amount", "Status", "Time"]}
              rows={recentOrders.map(o => [
                <span style={{ color: C.blue }} className="font-mono text-xs font-semibold">{o.id}</span>,
                o.customer, o.vendor,
                <span className="font-semibold">{o.amount}</span>,
                <StatusBadge status={o.status} />,
                <span style={{ color: C.textMuted }} className="text-xs">{o.time}</span>,
              ])}
            />
          </Card>

          {/* Activity feed */}
          <Card className="p-6">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div style={{ background: a.color + "18", borderRadius: 8 }} className="p-1.5 shrink-0 mt-0.5">
                    <a.icon size={12} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ color: C.text }} className="text-xs font-semibold">{a.label}</div>
                    <div style={{ color: C.textMuted }} className="text-xs truncate">{a.sub}</div>
                  </div>
                  <span style={{ color: C.textLight }} className="text-[10px] shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
const customers = [
  { id: "CUS-001", name: "Chukwuemeka Adeyemi", phone: "+234 801 234 5678", location: "Lagos",        orders: 24, spent: "₦187,500", status: "ACTIVE",    joined: "Jan 2024" },
  { id: "CUS-002", name: "Fatima Bello",        phone: "+234 802 345 6789", location: "Abuja",        orders: 11, spent: "₦89,200",  status: "ACTIVE",    joined: "Feb 2024" },
  { id: "CUS-003", name: "Taiwo Okafor",        phone: "+234 803 456 7890", location: "Lagos",        orders:  6, spent: "₦48,750",  status: "INACTIVE",  joined: "Mar 2024" },
  { id: "CUS-004", name: "Adaeze Nwosu",        phone: "+234 804 567 8901", location: "Port Harcourt",orders: 33, spent: "₦264,000", status: "ACTIVE",    joined: "Nov 2023" },
  { id: "CUS-005", name: "Musa Ibrahim",        phone: "+234 805 678 9012", location: "Kano",         orders:  3, spent: "₦22,500",  status: "SUSPENDED", joined: "Apr 2024" },
  { id: "CUS-006", name: "Ngozi Obi",           phone: "+234 806 789 0123", location: "Lagos",        orders: 18, spent: "₦142,600", status: "ACTIVE",    joined: "Dec 2023" },
  { id: "CUS-007", name: "Tunde Fashola",       phone: "+234 807 890 1234", location: "Ibadan",       orders:  7, spent: "₦56,000",  status: "ACTIVE",    joined: "Mar 2024" },
];

function CustomersPage() {
  const [selected, setSelected] = useState(0);
  const c = customers[selected];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Customers" subtitle="Manage all registered platform customers" />
      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Customers" value="8,412"  icon={Users}     color={C.blue}   />
          <StatCard label="Active (180)"    value="5,284"  icon={UserCheck} color={C.green}  />
          <StatCard label="New This Month"  value="324"    icon={TrendingUp} color={C.orange} trend="+12%" />
          <StatCard label="Suspended"       value="89"     icon={XCircle}   color={C.red}    />
        </div>

        <div className="flex gap-6 flex-1">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SearchBar placeholder="Search by name, phone, or email…" />
              <Btn variant="secondary" icon={Filter} small>Status</Btn>
              <Btn variant="secondary" icon={Filter} small>Date</Btn>
              <Btn variant="secondary" icon={MapPin} small>Location</Btn>
              <Btn variant="secondary" icon={Download} small>Export CSV</Btn>
            </div>
            <Card>
              <Table
                headers={["ID", "Name", "Phone", "Location", "Orders", "Total Spent", "Status", "Joined", ""]}
                selectedRow={selected}
                onRowClick={setSelected}
                rows={customers.map(c => [
                  <span style={{ color: C.textMuted }} className="font-mono text-xs">{c.id}</span>,
                  <div className="flex items-center gap-2.5"><Avatar name={c.name} size={26} /><span className="font-medium">{c.name}</span></div>,
                  c.phone, c.location,
                  <span className="font-semibold">{c.orders}</span>,
                  <span className="font-semibold">{c.spent}</span>,
                  <StatusBadge status={c.status} />,
                  <span style={{ color: C.textMuted }} className="text-xs">{c.joined}</span>,
                  <MoreHorizontal size={14} style={{ color: C.textMuted }} />,
                ])}
              />
              <div className="px-4 py-3">
                <Pagination total="8,412" showing="Showing 1–7 of 8,412 customers" />
              </div>
            </Card>
          </div>

          {/* Profile panel */}
          <Card style={{ width: 280, height: "fit-content" }} className="p-5 shrink-0">
            <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-4">Customer Profile</h3>
            <div className="flex flex-col items-center mb-5">
              <Avatar name={c.name} size={56} />
              <div style={{ color: C.text }} className="font-bold text-sm mt-2 text-center">{c.name}</div>
              <div style={{ color: C.textMuted }} className="text-xs mt-0.5">{c.id}</div>
              <StatusBadge status={c.status} />
            </div>
            {[
              ["Phone",        c.phone],
              ["Email",        "chukwu@email.com"],
              ["Location",     "Lagos Island, NG"],
              ["Joined",       "January 15, 2024"],
              ["Total Orders", String(c.orders)],
              ["Total Spent",  c.spent],
              ["Last Order",   "2 days ago"],
              ["Referrals",    "3 customers"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textMuted }} className="text-xs">{k}</span>
                <span style={{ color: C.text }} className="text-xs font-semibold text-right">{v}</span>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <Btn variant="primary" className="w-full justify-center">View Full Profile</Btn>
              <Btn variant="secondary" className="w-full justify-center">Send Notification</Btn>
              <Btn variant="danger" className="w-full justify-center">Suspend Account</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── VENDORS ──────────────────────────────────────────────────────────────────
const vendors = [
  { id: "VND-001", name: "CityGas Ltd",      owner: "Emeka Okonkwo", location: "Lagos Island", cylinders: "50kg, 25kg",     orders: 1240, rating: 4.8, status: "ACTIVE"  },
  { id: "VND-002", name: "QuickGas Nigeria", owner: "Bola Adebayo",  location: "Ikeja, Lagos", cylinders: "50kg, 12.5kg",  orders: 892,  rating: 4.6, status: "ACTIVE"  },
  { id: "VND-003", name: "MegaGas Co.",      owner: "Aisha Usman",   location: "Abuja FCT",    cylinders: "50kg, 25kg, 12.5kg", orders: 2108, rating: 4.9, status: "ACTIVE"  },
  { id: "VND-004", name: "EkoHotGas Ltd",    owner: "Tunde Adebayo", location: "Victoria Island", cylinders: "25kg",      orders: 0,    rating: 0,   status: "PENDING" },
  { id: "VND-005", name: "LagosGas Hub",     owner: "Chioma Obi",    location: "Surulere",     cylinders: "50kg, 25kg",  orders: 0,    rating: 0,   status: "PENDING" },
  { id: "VND-006", name: "FastGas Co.",      owner: "Musa Yusuf",    location: "Kano, NG",     cylinders: "12.5kg",      orders: 341,  rating: 3.1, status: "SUSPENDED" },
];

function VendorsPage() {
  const [tab, setTab] = useState("All Vendors");
  const [selected, setSelected] = useState(3);
  const v = vendors[selected];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Vendors" subtitle="Manage LPG vendors, verification, and compliance" />
      <div className="p-8 flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex gap-1" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, alignSelf: "flex-start" }}>
          {["All Vendors", "Pending Verification 11", "Suspended"].map(t => (
            <button key={t} onClick={() => setTab(t.split(" ")[0])}
              style={{ background: tab === t.split(" ")[0] ? C.blue : "transparent", color: tab === t.split(" ")[0] ? "white" : C.textMuted, borderRadius: 8 }}
              className="px-4 py-2 text-sm font-semibold transition-all">{t}</button>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SearchBar placeholder="Search vendors…" />
              <Btn variant="secondary" icon={Filter} small>Category</Btn>
              <Btn variant="secondary" icon={MapPin} small>Location</Btn>
              <Btn variant="primary" icon={Plus} small>Add Vendor</Btn>
            </div>
            <Card>
              <Table
                headers={["ID", "Business Name", "Owner", "Location", "Cylinders", "Orders", "Rating", "Status", ""]}
                selectedRow={selected}
                onRowClick={setSelected}
                rows={vendors.map(v => [
                  <span style={{ color: C.textMuted }} className="font-mono text-xs">{v.id}</span>,
                  <span className="font-semibold">{v.name}</span>,
                  v.owner, v.location, v.cylinders,
                  v.orders > 0 ? <span className="font-semibold">{v.orders.toLocaleString()}</span> : <span style={{ color: C.textLight }}>–</span>,
                  v.rating > 0 ? <span className="flex items-center gap-1"><Star size={11} fill={C.orange} stroke={C.orange} /><span className="font-semibold">{v.rating}</span></span> : <span style={{ color: C.textLight }}>–</span>,
                  <StatusBadge status={v.status} />,
                  <MoreHorizontal size={14} style={{ color: C.textMuted }} />,
                ])}
              />
              <div className="px-4 py-3">
                <Pagination total="147" showing="Showing 1–6 of 147 vendors" />
              </div>
            </Card>
          </div>

          {/* Vendor details panel */}
          <Card style={{ width: 300, height: "fit-content" }} className="p-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest">Vendor Details</h3>
              <StatusBadge status={v.status} />
            </div>
            <div style={{ background: C.bg, borderRadius: 12, height: 80 }} className="flex items-center justify-center mb-4">
              <div style={{ background: C.blueLight, borderRadius: 10, padding: "8px 16px" }}>
                <span style={{ color: C.blue }} className="text-sm font-bold">{v.name}</span>
              </div>
            </div>
            <div style={{ color: C.text }} className="font-bold text-sm mb-0.5">{v.name}</div>
            <div style={{ color: C.textMuted }} className="text-xs mb-4">{v.id} · Applied 2h ago</div>
            {[
              ["Owner",       v.owner],
              ["Phone",       "+234 807 123 4567"],
              ["Email",       "info@ekohotgas.ng"],
              ["Address",     "Victoria Island, Lagos"],
              ["CAC No.",     "RC-1234567"],
              ["Cylinders",   "25kg (80 units)"],
              ["DPR License", "DPR/2025/4872"],
              ["License Exp.", "Dec 31, 2025"],
            ].map(([k, val]) => (
              <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textMuted }} className="text-xs">{k}</span>
                <span style={{ color: C.text }} className="text-xs font-semibold text-right">{val}</span>
              </div>
            ))}
            <div className="mt-4">
              <div style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-2">Documents</div>
              {["CAC Certificate", "DPR License", "NIS Certificate", "Owner NIN"].map(doc => (
                <div key={doc} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2">
                    <FileText size={12} style={{ color: C.textMuted }} />
                    <span style={{ color: C.textMid }} className="text-xs">{doc}</span>
                  </div>
                  <button style={{ color: C.blue }} className="text-xs font-semibold">View</button>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                <button style={{ background: C.green, color: "white", borderRadius: 10, flex: 1 }}
                  className="py-2 text-sm font-semibold flex items-center justify-center gap-1">
                  <Check size={13} /> Approve
                </button>
                <button style={{ background: C.redLight, color: C.red, borderRadius: 10, flex: 1, border: `1px solid ${C.red}30` }}
                  className="py-2 text-sm font-semibold flex items-center justify-center gap-1">
                  <X size={13} /> Reject
                </button>
              </div>
              <Btn variant="secondary" className="w-full justify-center">Request More Info</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── RIDERS ───────────────────────────────────────────────────────────────────
const riders = [
  { id: "RDR-001", name: "Emeka Eze",     phone: "+234 801 111 2222", zone: "Lagos Island", vehicle: "Motorcycle", deliveries: 342, rating: 4.7, status: "ONLINE" },
  { id: "RDR-002", name: "Uche Nnandi",   phone: "+234 802 222 3333", zone: "Ikeja",        vehicle: "Motorcycle", deliveries: 218, rating: 4.5, status: "IN DELIVERY" },
  { id: "RDR-003", name: "Seun Adeleke",  phone: "+234 803 333 4444", zone: "VI / Lekki",   vehicle: "Tricycle",   deliveries: 156, rating: 4.5, status: "OFFLINE" },
  { id: "RDR-004", name: "Biodun Osu",    phone: "+234 804 444 5555", zone: "Surulere",     vehicle: "Motorcycle", deliveries: 89,  rating: 4.3, status: "ONLINE" },
  { id: "RDR-005", name: "Kayode Ige",    phone: "+234 805 555 6666", zone: "Abuja",        vehicle: "Van",        deliveries: 0,   rating: 0,   status: "PENDING" },
  { id: "RDR-006", name: "Emeka Chukwu",  phone: "+234 806 666 7777", zone: "Kano",         vehicle: "Motorcycle", deliveries: 0,   rating: 0,   status: "PENDING" },
];

function RidersPage() {
  const [selected, setSelected] = useState(0);
  const r = riders[selected];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Riders" subtitle="Manage delivery riders, verification, and assignments" />
      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Riders"      value="389" icon={Bike}      color={C.blue}   />
          <StatCard label="Online Now"         value="241" icon={Activity}  color={C.green}  trend="+4" />
          <StatCard label="In Delivery"        value="89"  icon={Truck}     color={C.orange} />
          <StatCard label="Verification Queue" value="8"   icon={UserCheck} color={C.purple} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, alignSelf: "flex-start" }}>
          {["All Riders", "Verification Queue 8", "Suspended"].map(t => (
            <button key={t} style={{ background: t.startsWith("All") ? C.blue : "transparent", color: t.startsWith("All") ? "white" : C.textMuted, borderRadius: 8 }}
              className="px-4 py-2 text-sm font-semibold">{t}</button>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SearchBar placeholder="Search riders…" />
              <Btn variant="secondary" icon={MapPin} small>Zone</Btn>
              <Btn variant="secondary" icon={Filter} small>Status</Btn>
              <Btn variant="primary" icon={Plus} small>Onboard Rider</Btn>
            </div>
            <Card>
              <Table
                headers={["ID", "Name", "Phone", "Zone", "Vehicle", "Deliveries", "Rating", "Status", ""]}
                selectedRow={selected}
                onRowClick={setSelected}
                rows={riders.map(r => [
                  <span style={{ color: C.textMuted }} className="font-mono text-xs">{r.id}</span>,
                  <div className="flex items-center gap-2.5"><Avatar name={r.name} size={26} /><span className="font-medium">{r.name}</span></div>,
                  r.phone, r.zone, r.vehicle,
                  r.deliveries > 0 ? <span className="font-semibold">{r.deliveries}</span> : <span style={{ color: C.textLight }}>–</span>,
                  r.rating > 0 ? <span className="flex items-center gap-1"><Star size={11} fill={C.orange} stroke={C.orange} /><span className="font-semibold">{r.rating}</span></span> : <span style={{ color: C.textLight }}>–</span>,
                  <StatusBadge status={r.status} />,
                  <MoreHorizontal size={14} style={{ color: C.textMuted }} />,
                ])}
              />
              <div className="px-4 py-3">
                <Pagination total="389" showing="Showing 1–6 of 389 riders" />
              </div>
            </Card>
          </div>

          <Card style={{ width: 280, height: "fit-content" }} className="p-5 shrink-0">
            <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-4">Rider Details</h3>
            <div className="flex flex-col items-center mb-4">
              <Avatar name={r.name} size={52} />
              <div style={{ color: C.text }} className="font-bold text-sm mt-2">{r.name}</div>
              <div style={{ color: C.textMuted }} className="text-xs">{r.id} · {r.zone} Zone</div>
              <div className="mt-1"><StatusBadge status={r.status} /></div>
            </div>
            {[
              ["Phone",            r.phone],
              ["Vehicle",          "Honda CB 125"],
              ["Plate No.",        "LS 234 XY"],
              ["Total Deliveries", String(r.deliveries || "–")],
              ["Rating",           r.rating > 0 ? `${r.rating} / 5.0` : "–"],
              ["Earnings (MTD)",   r.deliveries > 0 ? "₦48,600" : "–"],
              ["Joined",           "Oct 12, 2023"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textMuted }} className="text-xs">{k}</span>
                <span style={{ color: C.text }} className="text-xs font-semibold">{v}</span>
              </div>
            ))}
            <div className="mt-3">
              <div style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-2">Documents</div>
              <div className="flex gap-2">
                {["ID Card", "Vehicle Docs"].map(d => (
                  <div key={d} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.textMid }}
                    className="flex-1 py-2 text-center text-xs font-semibold cursor-pointer hover:bg-blue-50">{d}</div>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Btn variant="primary" className="w-full justify-center">View Full Profile</Btn>
              <Btn variant="secondary" className="w-full justify-center">Assign to Zone</Btn>
              <Btn variant="danger" className="w-full justify-center">Suspend Rider</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
const orders = [
  { id: "#ORD-7823", customer: "Chukwuemeka A.", vendor: "CityGas Ltd",   rider: "Emeka Eze",  item: "50kg × 1", amount: "₦8,500",  status: "DELIVERED",  date: "Jul 13 14:22" },
  { id: "#ORD-7822", customer: "Fatima Bello",   vendor: "QuickGas NG",  rider: "Uche N.",    item: "25kg × 2", amount: "₦12,000", status: "IN TRANSIT", date: "Jul 13 14:08" },
  { id: "#ORD-7821", customer: "Taiwo Okafor",   vendor: "MegaGas Co.",  rider: "–",          item: "12.5kg × 1", amount: "₦6,750", status: "PROCESSING", date: "Jul 13 13:51" },
  { id: "#ORD-7820", customer: "Adaeze Nwosu",   vendor: "CityGas Ltd",  rider: "Seun A.",    item: "50kg × 1", amount: "₦9,200",  status: "DELIVERED",  date: "Jul 13 12:30" },
  { id: "#ORD-7819", customer: "Musa Ibrahim",   vendor: "QuickGas NG",  rider: "–",          item: "25kg × 1", amount: "₦15,500", status: "CANCELLED",  date: "Jul 13 11:15" },
  { id: "#ORD-7818", customer: "Ngozi Obi",      vendor: "CityGas Ltd",  rider: "Biodun O.",  item: "50kg × 2", amount: "₦17,000", status: "DELIVERED",  date: "Jul 13 10:45" },
];
const orderTabs = [
  { label: "All",        count: "1,284", active: true },
  { label: "Pending",    count: "47" },
  { label: "Processing", count: "83" },
  { label: "In Transit", count: "124" },
  { label: "Delivered",  count: "982" },
  { label: "Cancelled",  count: "48" },
];

function OrdersPage() {
  const [selected, setSelected] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const o = orders[selected];
  const steps = [
    { label: "Order Placed",      time: "14:22", done: true },
    { label: "Vendor Confirmed",  time: "14:25", done: true },
    { label: "Rider Assigned",    time: "14:28", done: true },
    { label: "Picked Up",         time: "14:31", done: o.status === "DELIVERED" || o.status === "IN TRANSIT" },
    { label: "Delivered",         time: "14:58", done: o.status === "DELIVERED" },
  ];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Orders" subtitle="Track and manage all platform delivery orders" />
      <div className="p-8 flex flex-col gap-5">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <SearchBar placeholder="Search order ID, customer, vendor…" />
          {["Status", "Vendor", "Rider", "Date", "Amount"].map(f => (
            <Btn key={f} variant="secondary" icon={ChevronDown} small>{f}</Btn>
          ))}
          <Btn variant="ghost" small>Clear</Btn>
          <Btn variant="secondary" icon={Download} small>Export</Btn>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 flex-wrap" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, alignSelf: "flex-start" }}>
          {orderTabs.map(t => (
            <button key={t.label} onClick={() => setActiveTab(t.label)}
              style={{ background: activeTab === t.label ? C.blue : "transparent", color: activeTab === t.label ? "white" : C.textMuted, borderRadius: 8 }}
              className="px-3 py-1.5 text-sm font-semibold flex items-center gap-1.5">
              {t.label}
              <span style={{ background: activeTab === t.label ? "rgba(255,255,255,0.25)" : C.bg, color: activeTab === t.label ? "white" : C.textMuted }}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full">{t.count}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-3">
            <Card>
              <Table
                headers={["Order ID", "Customer", "Vendor", "Rider", "Item", "Amount", "Status", "Date", ""]}
                selectedRow={selected}
                onRowClick={setSelected}
                rows={orders.map(o => [
                  <span style={{ color: C.blue }} className="font-mono text-xs font-semibold">{o.id}</span>,
                  o.customer, o.vendor,
                  <span style={{ color: o.rider === "–" ? C.textLight : C.textMid }}>{o.rider}</span>,
                  o.item,
                  <span className="font-semibold">{o.amount}</span>,
                  <StatusBadge status={o.status} />,
                  <span style={{ color: C.textMuted }} className="text-xs">{o.date}</span>,
                  <MoreHorizontal size={14} style={{ color: C.textMuted }} />,
                ])}
              />
              <div className="px-4 py-3">
                <Pagination total="1,284" showing="Showing 1–6 of 1,284 orders" />
              </div>
            </Card>
          </div>

          {/* Order detail */}
          <Card style={{ width: 300, height: "fit-content" }} className="p-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span style={{ color: C.blue }} className="font-mono text-sm font-bold">{o.id}</span>
              <StatusBadge status={o.status} />
            </div>
            {/* Timeline */}
            <div className="mb-5">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="flex flex-col items-center">
                    <div style={{ background: s.done ? C.blue : C.border, borderRadius: "50%", width: 16, height: 16 }}
                      className="flex items-center justify-center shrink-0">
                      {s.done && <Check size={9} color="white" />}
                    </div>
                    {i < steps.length - 1 && <div style={{ width: 2, height: 16, background: s.done ? C.blue : C.border }} />}
                  </div>
                  <div>
                    <div style={{ color: s.done ? C.text : C.textMuted }} className="text-xs font-semibold">{s.label}</div>
                    {s.done && <div style={{ color: C.textLight }} className="text-[10px]">{s.time}</div>}
                  </div>
                </div>
              ))}
            </div>
            {[
              ["Customer", o.customer],
              ["Vendor",   o.vendor],
              ["Rider",    o.rider === "–" ? "Not assigned" : o.rider],
              ["Item",     o.item],
              ["Delivery Fee", "₦500"],
              ["Subtotal", o.amount.replace(/(\d+)/, (m) => String(parseInt(m) - 500))],
              ["Total",    o.amount],
              ["Payment",  "Paystack · Card"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textMuted }} className="text-xs">{k}</span>
                <span style={{ color: C.text }} className="text-xs font-semibold">{v}</span>
              </div>
            ))}
            {/* Map placeholder */}
            <div style={{ background: C.bg, borderRadius: 10, height: 80, border: `1px solid ${C.border}` }}
              className="flex items-center justify-center mt-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: C.textMuted }} />
                <span style={{ color: C.textMuted }} className="text-xs">Delivery Map</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="secondary" className="flex-1 justify-center" icon={FileText}>Invoice</Btn>
              <Btn variant="danger" className="flex-1 justify-center" icon={RefreshCw}>Refund</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
const transactions = [
  { id: "TXN-98231", orderRef: "#ORD-7823", customer: "Chukwuemeka A.", amount: "₦8,500",  gateway: "Paystack",    fee: "₦215", net: "₦8,285", status: "SUCCESSFUL", date: "Jul 13 14:22" },
  { id: "TXN-98230", orderRef: "#ORD-7822", customer: "Fatima Bello",   amount: "₦12,000", gateway: "Flutterwave", fee: "₦300", net: "₦11,700", status: "SUCCESSFUL", date: "Jul 13 14:08" },
  { id: "TXN-98229", orderRef: "#ORD-7820", customer: "Adaeze Nwosu",   amount: "₦9,200",  gateway: "Paystack",    fee: "₦230", net: "₦8,970", status: "SUCCESSFUL", date: "Jul 13 12:30" },
  { id: "TXN-98228", orderRef: "#ORD-7819", customer: "Musa Ibrahim",   amount: "₦15,500", gateway: "Paystack",    fee: "₦390", net: "–",      status: "REFUNDED",   date: "Jul 13 11:15" },
  { id: "TXN-98227", orderRef: "#ORD-7817", customer: "Grace Amadi",    amount: "₦7,800",  gateway: "Bank Transfer", fee: "₦0", net: "₦7,800", status: "FAILED",     date: "Jul 13 10:05" },
  { id: "TXN-98226", orderRef: "#ORD-7816", customer: "Tunde Fashola",  amount: "₦6,000",  gateway: "Moniepoint",  fee: "₦150", net: "₦5,850", status: "SUCCESSFUL", date: "Jul 13 09:40" },
];

function PaymentsPage() {
  const [tab, setTab] = useState("Transactions");
  const [selected, setSelected] = useState(0);
  const t = transactions[selected];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Payments" subtitle="Transactions, settlements, and refunds" />
      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Revenue (MTD)"     value="₦42.8M" trend="+14.2%" icon={DollarSign} color={C.blue} />
          <StatCard label="Pending Settlement" value="₦3.2M"  icon={Clock}  color={C.orange} />
          <StatCard label="Refunds (MTD)"      value="₦480K"  icon={RefreshCw} color={C.purple} />
          <StatCard label="Failed Txns"        value="24"     icon={AlertTriangle} color={C.red} />
        </div>

        <div className="flex gap-1" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, alignSelf: "flex-start" }}>
          {["Transactions", "Refunds", "Settlements", "Failed 24"].map(t2 => (
            <button key={t2} onClick={() => setTab(t2.split(" ")[0])}
              style={{ background: tab === t2.split(" ")[0] ? C.blue : "transparent", color: tab === t2.split(" ")[0] ? "white" : C.textMuted, borderRadius: 8 }}
              className="px-4 py-2 text-sm font-semibold">{t2}</button>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <SearchBar placeholder="Search TXN ID, customer, amount…" />
              <Btn variant="secondary" icon={Filter} small>Date Range</Btn>
              <Btn variant="secondary" icon={Filter} small>Gateway</Btn>
              <Btn variant="secondary" icon={Download} small>Export</Btn>
            </div>
            <Card>
              <Table
                headers={["TXN ID", "Order Ref", "Customer", "Amount", "Gateway", "Fee", "Net", "Status", "Date"]}
                selectedRow={selected}
                onRowClick={setSelected}
                rows={transactions.map(t => [
                  <span style={{ color: C.blue }} className="font-mono text-xs font-semibold">{t.id}</span>,
                  <span style={{ color: C.textMuted }} className="font-mono text-xs">{t.orderRef}</span>,
                  t.customer,
                  <span className="font-semibold">{t.amount}</span>,
                  t.gateway,
                  <span style={{ color: C.textMuted }} className="text-xs">{t.fee}</span>,
                  <span className="font-semibold">{t.net}</span>,
                  <StatusBadge status={t.status} />,
                  <span style={{ color: C.textMuted }} className="text-xs">{t.date}</span>,
                ])}
              />
              <div className="px-4 py-3">
                <Pagination total="18,492" showing="Showing 1–6 of 18,492 transactions" />
              </div>
            </Card>
          </div>

          {/* Payment detail */}
          <Card style={{ width: 280, height: "fit-content" }} className="p-5 shrink-0">
            <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-4">Payment Detail</h3>
            <div className="text-center mb-5">
              <div style={{ color: C.text }} className="text-3xl font-bold">{t.amount}</div>
              <div style={{ color: C.textMuted }} className="text-xs mt-1 font-mono">{t.id}</div>
              <div className="mt-2 flex justify-center"><StatusBadge status={t.status} /></div>
            </div>
            {[
              ["Order Ref",    t.orderRef],
              ["Customer",     t.customer],
              ["Gateway",      t.gateway],
              ["Channel",      "Debit Card (Visa)"],
              ["Auth Code",    "Auth_abc123xyz"],
              ["Platform Fee", `2.5% = ${t.fee}`],
              ["Net to Vendor", t.net],
              ["Timestamp",    t.date + " 2025"],
              ["Settlement",   "Jul 15 2025 (T+2)"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textMuted }} className="text-xs">{k}</span>
                <span style={{ color: C.text }} className="text-xs font-semibold text-right max-w-[140px] truncate">{v}</span>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <Btn variant="danger" className="w-full justify-center" icon={RefreshCw}>Initiate Refund</Btn>
              <Btn variant="secondary" className="w-full justify-center" icon={Download}>Download Receipt</Btn>
              <button style={{ color: C.red }} className="w-full text-xs font-semibold text-center py-1.5 hover:underline">Flag Transaction</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
const revenueOrders = [
  { day: "Jun 13", revenue: 1.2, orders: 380 }, { day: "Jun 16", revenue: 1.4, orders: 420 },
  { day: "Jun 19", revenue: 1.1, orders: 310 }, { day: "Jun 22", revenue: 1.7, orders: 490 },
  { day: "Jun 25", revenue: 1.5, orders: 450 }, { day: "Jun 28", revenue: 1.9, orders: 520 },
  { day: "Jul 1",  revenue: 2.1, orders: 580 }, { day: "Jul 4",  revenue: 1.8, orders: 510 },
  { day: "Jul 7",  revenue: 2.4, orders: 640 }, { day: "Jul 10", revenue: 2.2, orders: 600 },
  { day: "Jul 13", revenue: 2.6, orders: 680 },
];
const deliveryZones = [
  { zone: "VI/Lekki", time: 22 }, { zone: "Ikeja", time: 28 }, { zone: "Surulere", time: 35 },
  { zone: "Yaba", time: 31 }, { zone: "Oshodi", time: 38 }, { zone: "Abuja", time: 25 },
  { zone: "Kano", time: 42 }, { zone: "PH", time: 30 },
];
const userGrowth = [
  { week: "W1", newUsers: 48, returning: 120 }, { week: "W2", newUsers: 62, returning: 145 },
  { week: "W3", newUsers: 55, returning: 162 }, { week: "W4", newUsers: 71, returning: 189 },
  { week: "W5", newUsers: 84, returning: 210 },
];
const vendorPerf = [
  { vendor: "CityGas", score: 92 }, { vendor: "QuickGas", score: 88 }, { vendor: "MegaGas", score: 95 },
  { vendor: "LagosGas", score: 74 }, { vendor: "FastGas", score: 61 }, { vendor: "EkoHot", score: 82 },
];
const topVendors = [
  { name: "MegaGas Co.",     revenue: "₦8.4M", pct: 92 },
  { name: "CityGas Ltd",     revenue: "₦7.1M", pct: 78 },
  { name: "QuickGas NG",     revenue: "₦6.3M", pct: 69 },
  { name: "SelfGas Hub",     revenue: "₦4.2M", pct: 46 },
  { name: "EkoCylinder",     revenue: "₦3.5M", pct: 38 },
];

function AnalyticsPage() {
  const [range, setRange] = useState("30 Days");
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Reports & Analytics" subtitle="Platform performance and business intelligence" />
      <div className="p-8 flex flex-col gap-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}` }}>
            {["Today", "7 Days", "30 Days", "90 Days", "Custom Range"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                style={{ background: range === r ? C.blue : "transparent", color: range === r ? "white" : C.textMuted, borderRadius: 8 }}
                className="px-3 py-1.5 text-xs font-semibold">{r}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <Btn variant="secondary" icon={Download} small>Export PDF</Btn>
            <Btn variant="secondary" icon={Download} small>Export CSV</Btn>
            <Btn variant="primary" icon={Activity} small>Schedule Report</Btn>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard label="Revenue"          value="₦42.8M" trend="+14.2%" icon={DollarSign}  color={C.blue}   />
          <StatCard label="Orders"           value="12,841" trend="+8.1%"  icon={ShoppingCart} color={C.orange} />
          <StatCard label="Avg Order Value"  value="₦9,240" trend="+2.3%"  icon={TrendingUp}   color={C.green}  />
          <StatCard label="Avg Delivery Time" value="28 min" sub="± 4 min" icon={Clock}         color={C.purple} />
          <StatCard label="Customer NPS"     value="78 / 100" trend="+3 pts" icon={Star}        color={C.orange} />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-1">Revenue & Orders – Last 30 Days</h3>
            <p style={{ color: C.textMuted }} className="text-xs mb-4">Daily breakdown</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={revenueOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `₦${v}M`} />
                <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line yAxisId="rev" type="monotone" dataKey="revenue" stroke={C.blue} strokeWidth={2} dot={false} name="Revenue (₦M)" />
                <Line yAxisId="ord" type="monotone" dataKey="orders"  stroke={C.orange} strokeWidth={2} dot={false} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-1">Delivery Metrics – Avg Time by Zone</h3>
            <p style={{ color: C.textMuted }} className="text-xs mb-4">Minutes per zone</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={deliveryZones} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="zone" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${v}m`} />
                <Tooltip formatter={(v: any) => [`${v} min`, "Avg Time"]} contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Bar dataKey="time" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-5">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-1">User Growth</h3>
            <p style={{ color: C.textMuted }} className="text-xs mb-4">New vs returning customers</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="week" tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="newUsers"   stroke={C.blue}   strokeWidth={2} dot={false} name="New" />
                <Line type="monotone" dataKey="returning"  stroke={C.orange} strokeWidth={2} dot={false} strokeDasharray="5 5" name="Returning" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-1">Vendor Performance Score</h3>
            <p style={{ color: C.textMuted }} className="text-xs mb-4">Top 6 vendors by score</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={vendorPerf} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="vendor" tick={{ fontSize: 8, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {vendorPerf.map((_, i) => (
                    <Cell key={i} fill={_.score >= 85 ? C.green : _.score >= 70 ? C.orange : C.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 style={{ color: C.text }} className="font-semibold text-sm mb-4">Top Vendors by Revenue</h3>
            <div className="space-y-3">
              {topVendors.map((v, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span style={{ color: C.textMid }} className="text-xs font-medium">{v.name}</span>
                    <span style={{ color: C.text }} className="text-xs font-bold">{v.revenue}</span>
                  </div>
                  <div style={{ background: C.bg, borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${v.pct}%`, background: i === 0 ? C.green : i === 1 ? C.blue : C.orange, borderRadius: 4, height: "100%", transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const announcements = [
  {
    title: "Scheduled Maintenance – July 20",
    tag: "MAINTENANCE",
    tagColor: C.orange,
    body: "GasNow will undergo scheduled maintenance on July 20, 2025 from 2:00 AM – 4:00 AM WAT. All services will be temporarily unavailable. Vendors and customers will be notified automatically.",
    time: "2h ago",
    active: true,
  },
  {
    title: "Moniepoint Integration Live",
    tag: "UPDATE",
    tagColor: C.blue,
    body: "Moniepoint has been successfully integrated as a payment option. Vendors can now receive settlements via Moniepoint in addition to existing gateways.",
    time: "1d ago",
    active: false,
  },
  {
    title: "Q2 2025 Performance Report",
    tag: "REPORT",
    tagColor: C.green,
    body: "The Q2 2025 platform performance report is available. Key metrics: 34% growth in order volume, ₦142M revenue, 97.3% delivery success rate.",
    time: "3d ago",
    active: false,
  },
];
const sysAlerts = [
  { label: "Payment gateway latency",  sub: "18s ago", severity: "WARNING",  color: C.orange },
  { label: "Vendor VND-006 auto-suspended", sub: "3h ago", severity: "ACTION", color: C.red },
  { label: "Unusual login – new IP",  sub: "5h ago", severity: "CRITICAL", color: C.red },
  { label: "Daily backup completed",   sub: "6h ago", severity: "INFO",    color: C.green },
  { label: "OTP service fully restored", sub: "1d ago", severity: "INFO",  color: C.green },
];

function NotificationsPage() {
  const channels = [
    { label: "Email Alerts", on: true }, { label: "SMS Notifications", on: true },
    { label: "Slack Webhook", on: false }, { label: "Push Notifications", on: true },
    { label: "In-App Alerts", on: true },
  ];
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Notifications" subtitle="System announcements, alerts, and broadcasts" />
      <div className="p-8 flex flex-col gap-6">
        <div className="flex gap-3">
          <Btn variant="primary" icon={Plus}>New Announcement</Btn>
          <Btn variant="secondary" icon={Send}>Send Alert</Btn>
          <div className="flex-1" />
          <Btn variant="ghost" small>Mark All Read</Btn>
          <Btn variant="secondary" icon={Filter} small>Type</Btn>
          <Btn variant="secondary" icon={Filter} small>Date</Btn>
        </div>

        <div className="flex gap-6">
          {/* Announcements */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 style={{ color: C.text }} className="font-semibold text-sm uppercase tracking-wide">System Announcements</h3>
              <Btn variant="primary" icon={Plus} small>Create</Btn>
            </div>
            {announcements.map((a, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-start gap-3">
                  <div style={{ background: a.active ? a.tagColor : C.textLight, width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0 }} className="shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: C.text }} className="font-semibold text-sm">{a.title}</span>
                      <span style={{ background: a.tagColor + "20", color: a.tagColor, borderRadius: 6 }}
                        className="text-[10px] font-bold px-2 py-0.5 uppercase">{a.tag}</span>
                    </div>
                    <p style={{ color: C.textMuted }} className="text-xs leading-relaxed">{a.body}</p>
                    <div style={{ color: C.textLight }} className="text-[10px] mt-2">{a.time}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button style={{ color: C.blue }} className="text-xs font-semibold flex items-center gap-1"><Edit3 size={11} /> Edit</button>
                    <button style={{ color: C.red }} className="text-xs font-semibold flex items-center gap-1"><Trash2 size={11} /> Delete</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Right column */}
          <div className="w-72 flex flex-col gap-4 shrink-0">
            <Card className="p-5">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-3">System Alerts</h3>
              <div className="space-y-2">
                {sysAlerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ background: a.color, width: 7, height: 7, borderRadius: "50%", marginTop: 4 }} className="shrink-0" />
                    <div className="flex-1">
                      <div style={{ color: C.text }} className="text-xs font-medium">{a.label}</div>
                      <div style={{ color: C.textMuted }} className="text-[10px]">{a.sub}</div>
                    </div>
                    <span style={{ background: a.color + "20", color: a.color, borderRadius: 6 }}
                      className="text-[9px] font-bold px-1.5 py-0.5 uppercase shrink-0">{a.severity}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-3">Notification Channels</h3>
              <div className="space-y-3">
                {channels.map(ch => (
                  <div key={ch.label} className="flex items-center justify-between">
                    <span style={{ color: C.textMid }} className="text-sm">{ch.label}</span>
                    <Toggle on={ch.on} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
const adminUsers = [
  { name: "Super Admin",  email: "admin@gasnow.ng",     role: "SUPER ADMIN",  color: C.blue },
  { name: "Amaka Obci",   email: "amaka@gasnow.ng",     role: "OPERATIONS",   color: C.green },
  { name: "Babatunde L.", email: "bab@gasnow.ng",       role: "FINANCE",      color: C.purple },
  { name: "Chidinma S.",  email: "chid@gasnow.ng",      role: "SUPPORT",      color: C.orange },
  { name: "Rotimi K.",    email: "rotimi@gasnow.ng",    role: "VENDOR OPS",   color: C.green },
];
const securitySettings = [
  { label: "Two-Factor Auth (2FA)", on: true },
  { label: "Session Timeout (30m)", on: true },
  { label: "IP Allowlist",          on: false },
  { label: "Audit Logging",         on: true },
  { label: "CAPTCHA on Login",      on: true },
  { label: "Password Policy (Strong)", on: true },
];
const featureToggles = [
  { label: "Vendor Self-Registration",  on: true },  { label: "Rider Self-Onboarding", on: true },
  { label: "Customer Reviews",          on: true },  { label: "Scheduled Deliveries",  on: false },
  { label: "Subscription Orders",       on: false }, { label: "Bulk Order Discounts",  on: true },
  { label: "Real-Time Order Tracking",  on: true },  { label: "Referral Programme",    on: false },
];

function SettingsPage() {
  const [tab, setTab] = useState("Platform");
  return (
    <div className="flex-1 overflow-auto flex flex-col" style={{ background: C.bg }}>
      <TopBar title="Settings" subtitle="Platform configuration and administration" />
      <div className="p-8 flex flex-col gap-6">
        <div className="flex gap-1" style={{ background: C.card, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, alignSelf: "flex-start" }}>
          {["Platform", "Admin Users", "Roles & Permissions", "Security"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ background: tab === t ? C.blue : "transparent", color: tab === t ? "white" : C.textMuted, borderRadius: 8 }}
              className="px-4 py-2 text-sm font-semibold">{t}</button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Main settings */}
          <div className="flex-1 flex flex-col gap-5">
            <Card className="p-6">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-4">General Platform Settings</h3>
              <div className="space-y-3">
                {[
                  ["Platform Name",         "GasNow"],
                  ["Support Email",         "support@gasnow.ng"],
                  ["Support Phone",         "+234 800 GASNOW (427669)"],
                  ["Default Currency",      "NGN (₦)"],
                  ["Default Delivery Radius","15 km"],
                  ["Platform Commission",   "8.5%"],
                  ["Minimum Order Amount",  "₦5,000"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center gap-4">
                    <label style={{ color: C.textMuted, width: 200 }} className="text-xs font-semibold shrink-0">{label}</label>
                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, flex: 1 }}
                      className="px-3 py-2 text-sm flex items-center justify-between">
                      <span style={{ color: C.text }}>{value}</span>
                      <button style={{ color: C.blue }} className="text-xs font-semibold ml-4">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-4">Feature Toggles</h3>
              <div className="grid grid-cols-2 gap-4">
                {featureToggles.map(f => (
                  <div key={f.label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.textMid }} className="text-sm">{f.label}</span>
                    <Toggle on={f.on} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="w-72 flex flex-col gap-4 shrink-0">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest">Admin Users</h3>
                <Btn variant="primary" icon={Plus} small>Invite</Btn>
              </div>
              <div className="space-y-2">
                {adminUsers.map(u => (
                  <div key={u.name} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <Avatar name={u.name} size={30} color={u.color} />
                    <div className="flex-1 min-w-0">
                      <div style={{ color: C.text }} className="text-xs font-semibold truncate">{u.name}</div>
                      <div style={{ color: C.textMuted }} className="text-[10px] truncate">{u.email}</div>
                    </div>
                    <span style={{ background: u.color + "18", color: u.color, borderRadius: 6 }}
                      className="text-[9px] font-bold px-1.5 py-0.5 uppercase shrink-0 whitespace-nowrap">{u.role}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 style={{ color: C.textMuted }} className="text-[10px] font-bold uppercase tracking-widest mb-3">Security Settings</h3>
              <div className="space-y-3">
                {securitySettings.map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span style={{ color: C.textMid }} className="text-sm">{s.label}</span>
                    <Toggle on={s.on} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<Page>("login");

  if (page === "login") {
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  }

  const pageEl: Record<Exclude<Page, "login">, React.ReactNode> = {
    dashboard:     <DashboardPage />,
    customers:     <CustomersPage />,
    vendors:       <VendorsPage />,
    riders:        <RidersPage />,
    orders:        <OrdersPage />,
    payments:      <PaymentsPage />,
    analytics:     <AnalyticsPage />,
    notifications: <NotificationsPage />,
    settings:      <SettingsPage />,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: "100vh" }} className="flex">
      <Sidebar current={page} onNav={setPage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {pageEl[page as Exclude<Page, "login">]}
      </main>
    </div>
  );
}
