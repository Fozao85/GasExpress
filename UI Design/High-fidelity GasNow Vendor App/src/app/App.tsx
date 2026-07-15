import { useState, useEffect, useRef } from "react";
import {
  Home, ShoppingBag, Package, User, Bell, Settings, ChevronRight,
  ArrowLeft, Eye, EyeOff, Check, X, Clock, Truck, AlertTriangle,
  TrendingUp, Plus, Minus, Star, MapPin, Phone, Mail, Shield,
  HelpCircle, LogOut, Edit2, Upload, RefreshCw, CheckCircle2,
  BarChart2, Calendar, FileText, Zap, Menu, Search, Filter,
  ChevronDown, Info, Building2, BadgeCheck, Flame
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const B = {
  blue: "#1565C0",
  blueLight: "#E3F0FF",
  blueMid: "#1976D2",
  orange: "#FF8F00",
  orangeLight: "#FFF8E1",
  green: "#2E7D32",
  greenLight: "#E8F5E9",
  red: "#D32F2F",
  redLight: "#FFEBEE",
  surface: "#F5F7FA",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0D1117",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
};

// ─── Reusable primitives ─────────────────────────────────────────────────────

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0D1117 0%, #1a2744 50%, #0D1117 100%)" }}>
      <div className="relative flex flex-col" style={{ width: 390, height: 844, borderRadius: 48, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 2px rgba(255,255,255,0.05)" }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50" style={{ width: 126, height: 34, background: "#000", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : B.text;
  return (
    <div className="flex items-center justify-between px-6 pt-14 pb-2 flex-shrink-0" style={{ color: c, fontSize: 13, fontWeight: 600 }}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="0.5" width="3" height="11.5" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".3"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4C5.6 2.4 3.4 3.4 1.8 5L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.2 5C12.6 3.4 10.4 2.4 8 2.4z" opacity=".3"/><path d="M8 5.6c-1.5 0-2.8.6-3.8 1.5L2.4 5.3C3.8 4 5.8 3.2 8 3.2s4.2.8 5.6 2.1L11.8 7.1C10.8 6.2 9.5 5.6 8 5.6z"/><circle cx="8" cy="10" r="2"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity=".35"/><rect x="1.5" y="2.5" width="15" height="7" rx="1.2"/><path d="M23 4.5v3a1.5 1.5 0 000-3z"/></svg>
      </div>
    </div>
  );
}

function Btn({ label, onPress, variant = "primary", full = true, small = false, disabled = false, icon }: {
  label: string; onPress: () => void; variant?: "primary" | "secondary" | "ghost" | "danger" | "orange";
  full?: boolean; small?: boolean; disabled?: boolean; icon?: React.ReactNode;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: disabled ? "#9CA3AF" : B.blue, color: "#fff" },
    secondary: { background: "transparent", color: B.blue, border: `1.5px solid ${B.blue}` },
    ghost: { background: "transparent", color: B.textSecondary },
    danger: { background: "transparent", color: B.red, border: `1.5px solid ${B.red}` },
    orange: { background: B.orange, color: "#fff" },
  };
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      style={{
        ...styles[variant],
        borderRadius: 12,
        padding: small ? "10px 20px" : "15px 24px",
        fontSize: small ? 14 : 16,
        fontWeight: 600,
        width: full ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "Inter, sans-serif",
        transition: "opacity 0.15s",
      }}
    >
      {icon}{label}
    </button>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, suffix }: {
  label?: string; placeholder: string; type?: string; value?: string;
  onChange?: (v: string) => void; suffix?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: B.text, fontFamily: "Inter,sans-serif" }}>{label}</span>}
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 12,
            border: `1.5px solid ${B.border}`,
            background: "#F8FAFC",
            fontSize: 15,
            color: B.text,
            fontFamily: "Inter,sans-serif",
            outline: "none",
            boxSizing: "border-box",
            paddingRight: suffix ? 48 : 16,
          }}
        />
        {suffix && <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>{suffix}</div>}
      </div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: "blue" | "orange" | "green" | "red" | "gray" | "yellow" }) {
  const map = {
    blue: { bg: B.blueLight, text: B.blue },
    orange: { bg: B.orangeLight, text: B.orange },
    green: { bg: B.greenLight, text: B.green },
    red: { bg: B.redLight, text: B.red },
    gray: { bg: "#F1F5F9", text: B.textSecondary },
    yellow: { bg: "#FFFBEB", text: "#D97706" },
  };
  const s = map[color];
  return (
    <span style={{ background: s.bg, color: s.text, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, fontFamily: "Inter,sans-serif", letterSpacing: 0.3 }}>
      {label}
    </span>
  );
}

function NavBar({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const tabs = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
    { id: "profile", icon: User, label: "Profile" },
  ];
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${B.border}`, background: "#fff", paddingBottom: 8 }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 4px", gap: 3, background: "none", border: "none", cursor: "pointer" }}>
            <t.icon size={22} color={on ? B.blue : B.textMuted} strokeWidth={on ? 2.2 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 500, color: on ? B.blue : B.textMuted, fontFamily: "Inter,sans-serif" }}>{t.label}</span>
            {on && <div style={{ width: 4, height: 4, borderRadius: 2, background: B.blue, marginTop: 1 }} />}
          </button>
        );
      })}
    </div>
  );
}

function TopBar({ title, onBack, action }: { title: string; onBack?: () => void; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px", background: "#fff", borderBottom: `1px solid ${B.border}`, gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: B.surface, border: "none", cursor: "pointer" }}>
          <ArrowLeft size={18} color={B.text} />
        </button>
      )}
      <span style={{ flex: 1, fontSize: 17, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif" }}>{title}</span>
      {action}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: B.border, margin: "0 20px" }} />;
}

function SectionLabel({ label }: { label: string }) {
  return <div style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 700, color: B.textMuted, letterSpacing: 1, textTransform: "uppercase", fontFamily: "Inter,sans-serif" }}>{label}</div>;
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 200); return 100; } return p + 4; }), 50);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: B.blue, gap: 0 }}>
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{ width: 96, height: 96, borderRadius: 24, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
          <Flame size={48} color="#FF8F00" strokeWidth={2} />
        </div>
        <div style={{ position: "absolute", inset: -4, borderRadius: 28, border: "2px solid rgba(255,255,255,0.25)" }} />
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "Inter,sans-serif", letterSpacing: -0.5 }}>GasNow</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif", marginTop: 4, marginBottom: 48 }}>Vendor Portal</div>
      <div style={{ width: 160, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: B.orange, borderRadius: 4, transition: "width 0.05s linear" }} />
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "Inter,sans-serif" }}>Loading…</div>
    </div>
  );
}

function LoginScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: B.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={20} color={B.blue} />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: B.blue, fontFamily: "Inter,sans-serif" }}>GasNow</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif", margin: 0, lineHeight: 1.2 }}>Welcome back</h1>
          <p style={{ fontSize: 15, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginTop: 6 }}>Sign in to your vendor account</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 12 }}>
          <Field label="Phone Number" placeholder="+234 800 000 0000" type="tel" value={phone} onChange={setPhone} />
          <Field label="Password" placeholder="Enter your password" type={showPw ? "text" : "password"} value={pw} onChange={setPw}
            suffix={<button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", color: B.textSecondary, display: "flex" }}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>} />
        </div>
        <div style={{ textAlign: "right", marginBottom: 28 }}>
          <span style={{ fontSize: 14, color: B.blue, fontWeight: 600, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Forgot password?</span>
        </div>
        <Btn label="Login" onPress={onLogin} />
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>
          {"Don't have an account? "}
          <span onClick={onRegister} style={{ color: B.blue, fontWeight: 700, cursor: "pointer" }}>Register</span>
        </div>
      </div>
      {/* Bottom illustration strip */}
      <div style={{ height: 80, background: `linear-gradient(180deg, transparent 0%, ${B.blueLight} 100%)`, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 16, gap: 24 }}>
        {[Shield, Zap, CheckCircle2].map((Icon, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Icon size={18} color={B.blue} opacity={0.6} />
            <span style={{ fontSize: 10, color: B.blue, opacity: 0.6, fontFamily: "Inter,sans-serif" }}>{["Secure", "Fast", "Verified"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [form, setForm] = useState({ bizName: "", owner: "", phone: "", email: "", pw: "" });
  const [showPw, setShowPw] = useState(false);
  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
      <StatusBar />
      <TopBar title="Register Business" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: "12px 16px", borderRadius: 12, background: B.blueLight, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Info size={16} color={B.blue} style={{ marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: B.blue, fontFamily: "Inter,sans-serif", margin: 0, lineHeight: 1.5 }}>Create a vendor account to start selling on GasNow.</p>
        </div>
        <Field label="Business Name" placeholder="e.g. Adeyemi Gas Station" value={form.bizName} onChange={set("bizName")} />
        <Field label="Owner Name" placeholder="Full legal name" value={form.owner} onChange={set("owner")} />
        <Field label="Phone Number" placeholder="+234 800 000 0000" type="tel" value={form.phone} onChange={set("phone")} />
        <Field label="Email Address (Optional)" placeholder="vendor@business.com" type="email" value={form.email} onChange={set("email")} />
        <Field label="Password" placeholder="Min. 8 characters" type={showPw ? "text" : "password"} value={form.pw} onChange={set("pw")}
          suffix={<button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", color: B.textSecondary, display: "flex" }}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>} />
        <div style={{ marginTop: 8 }}>
          <Btn label="Create Account" onPress={onNext} />
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>
          Already registered?{" "}
          <span onClick={onBack} style={{ color: B.blue, fontWeight: 700, cursor: "pointer" }}>Login</span>
        </div>
      </div>
    </div>
  );
}

function OTPScreen({ onBack, onVerify }: { onBack: () => void; onVerify: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(43);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => { const t = setInterval(() => setTimer(p => p > 0 ? p - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const handleInput = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...digits]; next[i] = v.slice(-1);
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
      <StatusBar />
      <TopBar title="Verify Phone" onBack={onBack} />
      <div style={{ flex: 1, padding: "40px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: B.blueLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <Phone size={30} color={B.blue} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif", margin: 0 }}>Enter OTP Code</h2>
        <p style={{ fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif", textAlign: "center", marginTop: 8, lineHeight: 1.6 }}>
          A 6-digit code was sent to<br /><strong style={{ color: B.blue }}>+234 800 000 0000</strong>
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 32, marginBottom: 36 }}>
          {digits.map((d, i) => (
            <input key={i} ref={el => refs.current[i] = el} maxLength={1} value={d} onChange={e => handleInput(i, e.target.value)}
              style={{ width: 48, height: 56, borderRadius: 12, border: `2px solid ${d ? B.blue : B.border}`, background: d ? B.blueLight : "#F8FAFC", textAlign: "center", fontSize: 22, fontWeight: 700, color: B.blue, fontFamily: "Inter,sans-serif", outline: "none" }} />
          ))}
        </div>
        <div style={{ width: "100%", marginBottom: 20 }}>
          <Btn label="Verify OTP" onPress={onVerify} />
        </div>
        <div style={{ fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif", textAlign: "center" }}>
          {"Didn't receive it? "}
          <span style={{ color: timer > 0 ? B.textMuted : B.blue, fontWeight: 700, cursor: timer > 0 ? "default" : "pointer" }}>Resend OTP</span>
        </div>
        {timer > 0 && <div style={{ marginTop: 8, fontSize: 13, color: B.textMuted, fontFamily: "Inter,sans-serif" }}>Resend available in 00:{String(timer).padStart(2, "0")}</div>}
      </div>
    </div>
  );
}

function VerifyBusinessScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [address, setAddress] = useState("");
  const UploadBox = ({ label }: { label: string }) => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: B.text, fontFamily: "Inter,sans-serif", marginBottom: 8 }}>{label}</div>
      <div style={{ border: `2px dashed ${B.border}`, borderRadius: 16, padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "#FAFBFC", cursor: "pointer" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: B.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Upload size={20} color={B.blue} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: B.text, fontFamily: "Inter,sans-serif" }}>Tap to upload</span>
        <span style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif" }}>JPG or PDF</span>
      </div>
    </div>
  );
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
      <StatusBar />
      <TopBar title="Verify Business" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: "12px 16px", borderRadius: 12, background: B.orangeLight, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <AlertTriangle size={16} color={B.orange} style={{ marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "#7A5C00", fontFamily: "Inter,sans-serif", margin: 0, lineHeight: 1.5 }}>Upload documents to verify your business. Review takes 24–48 hours.</p>
        </div>
        <UploadBox label="Business License / CAC Certificate" />
        <UploadBox label="National ID / International Passport" />
        <Field label="Business Address" placeholder="Street, City, State" value={address} onChange={setAddress} />
        <div style={{ marginTop: 4 }}>
          <Btn label="Submit for Verification" onPress={onSubmit} />
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif", lineHeight: 1.6 }}>
          By submitting, you agree to our{" "}
          <span style={{ color: B.blue, fontWeight: 600 }}>Terms of Service</span> and{" "}
          <span style={{ color: B.blue, fontWeight: 600 }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

function PendingScreen({ onContact }: { onContact: () => void }) {
  const rows = [
    { label: "Status", value: "Under Review", orange: true },
    { label: "Submitted", value: "12 Jul 2026" },
    { label: "Expected by", value: "14 Jul 2026" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "40px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 0, overflowY: "auto" }}>
        <div style={{ width: 100, height: 100, borderRadius: 28, background: B.orangeLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative" }}>
          <Clock size={44} color={B.orange} />
          <div style={{ position: "absolute", bottom: -6, right: -6, width: 28, height: 28, borderRadius: 8, background: B.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <RefreshCw size={14} color="#fff" />
          </div>
        </div>
        <Badge label="UNDER REVIEW" color="yellow" />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif", margin: "16px 0 8px", textAlign: "center" }}>Verification Pending</h2>
        <p style={{ fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif", textAlign: "center", lineHeight: 1.6, marginBottom: 32 }}>
          Your documents are being reviewed. We'll notify you when complete (24–48 hrs).
        </p>
        <div style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${B.border}`, overflow: "hidden", marginBottom: 32 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < rows.length - 1 ? `1px solid ${B.border}` : "none", background: i % 2 === 0 ? "#fff" : "#FAFBFC" }}>
              <span style={{ fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: r.orange ? B.orange : B.text, fontFamily: "Inter,sans-serif" }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%" }}>
          <Btn label="Contact Support" onPress={onContact} variant="secondary" />
        </div>
      </div>
    </div>
  );
}

function DashboardScreen({ onNav, onNotif, onOrder }: { onNav: (s: string) => void; onNotif: () => void; onOrder: () => void }) {
  const stats = [
    { label: "Total Orders", value: "24", sub: "↑ 3 from yesterday", color: B.blue, bg: B.blueLight, icon: ShoppingBag },
    { label: "Pending", value: "6", sub: "Awaiting action", color: B.orange, bg: B.orangeLight, icon: Clock },
    { label: "Completed", value: "18", sub: "Today", color: B.green, bg: B.greenLight, icon: CheckCircle2 },
    { label: "Revenue", value: "₦42,500", sub: "Today", color: B.blue, bg: B.blueLight, icon: TrendingUp },
  ];
  const quickActions = [
    { label: "New Order", icon: Plus, color: B.blue, bg: B.blueLight },
    { label: "Inventory", icon: Package, color: B.orange, bg: B.orangeLight },
    { label: "Revenue", icon: BarChart2, color: B.green, bg: B.greenLight },
    { label: "Support", icon: HelpCircle, color: B.textSecondary, bg: "#F1F5F9" },
  ];
  const orders = [
    { id: "#GN-1042", customer: "Chioma Obi", detail: "12.5kg × 2", status: "PENDING", statusColor: "orange" as const },
    { id: "#GN-1041", customer: "Tunde Bello", detail: "25kg × 1", status: "IN TRANSIT", statusColor: "blue" as const },
    { id: "#GN-1040", customer: "Emeka Eze", detail: "6kg × 4", status: "COMPLETED", statusColor: "green" as const },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      {/* Header */}
      <div style={{ padding: "8px 20px 16px", background: `linear-gradient(135deg, ${B.blue} 0%, #1976D2 100%)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "Inter,sans-serif" }}>Good morning,</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "Inter,sans-serif", marginTop: 2 }}>Adeyemi Gas Station</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={onNotif} style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={20} color="#fff" />
              <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, background: B.orange, border: "2px solid transparent" }} />
            </button>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <User size={20} color="#fff" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Stats */}
        <div style={{ padding: "16px 16px 8px" }}>
          <SectionLabel label="Today's Summary" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 4px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{s.label}</span>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={14} color={s.color} />
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "Inter,sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: "8px 20px" }}>
          <SectionLabel label="Quick Actions" />
          <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
            {quickActions.map((a, i) => (
              <button key={i} onClick={() => { if (i === 1) onNav("inventory"); else if (i === 2) onNav("revenue"); }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <a.icon size={22} color={a.color} />
                </div>
                <span style={{ fontSize: 11, color: B.text, fontFamily: "Inter,sans-serif", fontWeight: 600, textAlign: "center" }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div style={{ padding: "8px 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <SectionLabel label="Recent Orders" />
            <span onClick={() => onNav("orders")} style={{ fontSize: 13, color: B.blue, fontWeight: 600, fontFamily: "Inter,sans-serif", cursor: "pointer", paddingRight: 0 }}>See all</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.map((o, i) => (
              <button key={i} onClick={onOrder} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "none", cursor: "pointer", textAlign: "left" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif" }}>{o.id}</div>
                  <div style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{o.customer} · {o.detail}</div>
                </div>
                <Badge label={o.status} color={o.statusColor} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <NavBar active="dashboard" onNav={onNav} />
    </div>
  );
}

function OrdersScreen({ onNav, onOrder }: { onNav: (s: string) => void; onOrder: () => void }) {
  const orders = [
    { id: "#GN-1043", time: "2 min ago", customer: "Funke Adewale", cylinder: "12.5kg Cylinder", qty: "3 units", total: "₦12,750" },
    { id: "#GN-1044", time: "5 min ago", customer: "Emeka Eze", cylinder: "6kg Cylinder", qty: "1 unit", total: "₦3,200" },
    { id: "#GN-1045", time: "12 min ago", customer: "Amara Nwosu", cylinder: "25kg Cylinder", qty: "2 units", total: "₦34,000" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 14px", background: "#fff", borderBottom: `1px solid ${B.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif" }}>Incoming Orders</span>
          <Badge label="3 NEW" color="orange" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {orders.map((o, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${B.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 15, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif" }}>{o.id}</span>
                <div style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{o.time}</div>
              </div>
              <Badge label="NEW" color="orange" />
            </div>
            {[["Customer", o.customer], ["Cylinder", o.cylinder], ["Quantity", o.qty], ["Total", o.total]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: k === "Total" ? B.blue : B.text, fontFamily: "Inter,sans-serif" }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: B.border, margin: "12px 0" }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ flex: 1, padding: "12px", borderRadius: 12, border: `1.5px solid ${B.red}`, background: "transparent", color: B.red, fontWeight: 700, fontSize: 14, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Reject</button>
              <button onClick={onOrder} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: B.blue, color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Accept</button>
            </div>
          </div>
        ))}
      </div>
      <NavBar active="orders" onNav={onNav} />
    </div>
  );
}

function OrderDetailScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: string) => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <TopBar title="Order #GN-1043" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Customer */}
        <div style={{ margin: "12px 16px", background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, fontFamily: "Inter,sans-serif" }}>Customer Info</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${B.blue}, #42A5F5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif" }}>Funke Adewale</div>
              <div style={{ fontSize: 13, color: B.blue, fontFamily: "Inter,sans-serif", marginTop: 2 }}>+234 812 345 6789</div>
            </div>
            <button style={{ marginLeft: "auto", width: 36, height: 36, borderRadius: 10, background: B.blueLight, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Phone size={16} color={B.blue} />
            </button>
          </div>
        </div>

        {/* Delivery address */}
        <div style={{ margin: "0 16px 12px", background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, fontFamily: "Inter,sans-serif" }}>Delivery Address</div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
            <MapPin size={16} color={B.orange} style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: B.text, fontFamily: "Inter,sans-serif", fontWeight: 600 }}>14 Abeokuta Street, Ikeja, Lagos State</span>
          </div>
          {/* Map placeholder */}
          <div style={{ height: 100, borderRadius: 12, background: `linear-gradient(135deg, #E8F4FD 0%, #C8E6FF 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(#a8c5da 1px, transparent 1px), linear-gradient(90deg, #a8c5da 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <MapPin size={24} color={B.blue} />
              <span style={{ fontSize: 12, color: B.blue, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>Map Preview</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{ margin: "0 16px 12px", background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: B.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, fontFamily: "Inter,sans-serif" }}>Items Ordered</div>
          {[["12.5kg LPG Cylinder", "₦4,250 × 3", false], ["Delivery Fee", "₦500", false], ["Total", "₦13,250", true]].map(([k, v, bold], i, arr) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize: 14, color: bold ? B.text : B.textSecondary, fontWeight: bold ? 800 : 400, fontFamily: "Inter,sans-serif" }}>{k as string}</span>
              <span style={{ fontSize: 14, fontWeight: bold ? 800 : 600, color: bold ? B.blue : B.text, fontFamily: "Inter,sans-serif" }}>{v as string}</span>
            </div>
          ))}
        </div>

        {/* Payment + Status */}
        <div style={{ margin: "0 16px 16px", background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          {[["Payment Method", "Cash on Delivery"], ["Order Status", "Pending"]].map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i === 0 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize: 14, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: v === "Pending" ? B.orange : B.text, fontFamily: "Inter,sans-serif" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action bar */}
      <div style={{ padding: "12px 16px 16px", background: "#fff", borderTop: `1px solid ${B.border}`, display: "flex", gap: 10 }}>
        <button style={{ flex: 1, padding: "14px", borderRadius: 12, border: `1.5px solid ${B.red}`, background: "transparent", color: B.red, fontWeight: 700, fontSize: 15, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Reject</button>
        <button style={{ flex: 2, padding: "14px", borderRadius: 12, border: "none", background: B.blue, color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Accept Order</button>
      </div>
    </div>
  );
}

function InventoryScreen({ onNav }: { onNav: (s: string) => void }) {
  const items = [
    { name: "6kg Cylinder", price: "₦3,200 / unit", stock: 45, status: "IN STOCK", statusColor: "green" as const },
    { name: "12.5kg Cylinder", price: "₦4,250 / unit", stock: 22, status: "IN STOCK", statusColor: "green" as const },
    { name: "25kg Cylinder", price: "₦17,000 / unit", stock: 8, status: "LOW STOCK", statusColor: "yellow" as const },
    { name: "50kg Cylinder", price: "₦34,500 / unit", stock: 0, status: "OUT OF STOCK", statusColor: "red" as const },
  ];
  const cylinderColors = [B.blueLight, B.orangeLight, B.greenLight, "#F1F5F9"];
  const cylinderIconColors = [B.blue, B.orange, B.green, B.textSecondary];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 14px", background: "#fff", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif" }}>Inventory</span>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: B.blue, border: "none", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>
          <Plus size={14} /><span>Add Item</span>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${B.border}` }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: cylinderColors[i], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Flame size={26} color={cylinderIconColors[i]} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif" }}>{item.name}</div>
              <div style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{item.price}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif" }}>Stock: {item.stock}</span>
                <Badge label={item.status} color={item.statusColor} />
              </div>
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 10, background: B.blueLight, border: "none", color: B.blue, fontWeight: 700, fontSize: 13, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Edit</button>
          </div>
        ))}
        <p style={{ textAlign: "center", fontSize: 13, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 8 }}>Tap "+ Add Item" to add new inventory</p>
      </div>
      <NavBar active="inventory" onNav={onNav} />
    </div>
  );
}

const revenueData = [
  { day: "Mon", amount: 38000 },
  { day: "Tue", amount: 52000 },
  { day: "Wed", amount: 45000 },
  { day: "Thu", amount: 61000 },
  { day: "Fri", amount: 78000 },
  { day: "Sat", amount: 42500 },
  { day: "Sun", amount: 29000 },
];

function RevenueScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: string) => void }) {
  const [tab, setTab] = useState("Daily");
  const transactions = [
    { name: "Chioma Obi", detail: "#GN-1042 · Today · 10:30 AM", amount: "₦12,750" },
    { name: "Tunde Bello", detail: "#GN-1041 · Today · 09:15 AM", amount: "₦17,000" },
    { name: "Emeka Eze", detail: "#GN-1040 · Yesterday · 04:20 PM", amount: "₦9,600" },
    { name: "Fatima Garba", detail: "#GN-1039 · Yesterday · 11:00 AM", amount: "₦3,150" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <TopBar title="Revenue" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Tabs */}
        <div style={{ margin: "12px 16px", background: "#fff", borderRadius: 14, padding: 4, display: "flex", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {["Daily", "Weekly", "Monthly"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: tab === t ? B.blue : "transparent", color: tab === t ? "#fff" : B.textSecondary, fontWeight: 700, fontSize: 14, fontFamily: "Inter,sans-serif", cursor: "pointer", transition: "all 0.2s" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ margin: "0 16px 12px", background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginBottom: 16 }}>Daily Revenue — July 2026</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revenueData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border} vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: B.textMuted, fontFamily: "Inter" }} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: B.blueLight }}
                contentStyle={{ borderRadius: 10, border: `1px solid ${B.border}`, fontSize: 12, fontFamily: "Inter" }}
                formatter={(v: number) => [`₦${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="amount" fill={B.blue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "0 16px 12px" }}>
          {[{ label: "Today", value: "₦42,500", color: B.blue }, { label: "This Week", value: "₦218,000", color: B.green }].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 12, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "Inter,sans-serif" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ margin: "0 16px 12px", background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 12, color: B.textSecondary, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>This Month</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: B.blue, fontFamily: "Inter,sans-serif" }}>₦1,046,500</div>
          <div style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 4 }}>July 2026</div>
        </div>

        {/* Transactions */}
        <div style={{ margin: "0 16px 20px" }}>
          <SectionLabel label="Recent Transactions" />
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            {transactions.map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: i < transactions.length - 1 ? `1px solid ${B.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{t.detail}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: B.green, fontFamily: "Inter,sans-serif" }}>{t.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavBar active="dashboard" onNav={onNav} />
    </div>
  );
}

function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const notifs = [
    { title: "New order received", body: "Funke Adewale placed an order for 3 × 12.5kg cylinders", tag: "ORDER", tagColor: "blue" as const, time: "2 min ago", unread: true },
    { title: "Order #GN-1041 completed", body: "Tunde Bello order delivered successfully", tag: "ORDER", tagColor: "green" as const, time: "1 hr ago", unread: true },
    { title: "Low stock alert", body: "25kg cylinder running low — 8 units remaining", tag: "INVENTORY", tagColor: "orange" as const, time: "3 hrs ago", unread: false },
    { title: "Weekly report ready", body: "Your revenue summary for this week is available", tag: "SYSTEM", tagColor: "gray" as const, time: "Yesterday", unread: false },
    { title: "Out of stock", body: "50kg cylinder is now out of stock", tag: "INVENTORY", tagColor: "red" as const, time: "2 days ago", unread: false },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <TopBar title="Notifications" action={<span style={{ fontSize: 13, color: B.blue, fontWeight: 600, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>Mark all read</span>} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: n.unread ? `1.5px solid ${B.blueLight}` : `1px solid ${B.border}` }}>
            <div style={{ marginTop: 4, width: 8, height: 8, borderRadius: 4, background: n.unread ? B.blue : "transparent", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: B.text, fontFamily: "Inter,sans-serif", flex: 1, marginRight: 8 }}>{n.title}</span>
                <span style={{ fontSize: 11, color: B.textMuted, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif", margin: "0 0 8px", lineHeight: 1.5 }}>{n.body}</p>
              <Badge label={n.tag} color={n.tagColor} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ onNav, onSettings }: { onNav: (s: string) => void; onSettings: () => void }) {
  const details = [
    { label: "Business Name", value: "Adeyemi Gas Station" },
    { label: "Owner", value: "Seun Adeyemi" },
    { label: "Phone", value: "+234 812 345 6789" },
    { label: "Email", value: "seun@adeyemigas.com" },
    { label: "Address", value: "14 Abeokuta St, Ikeja" },
  ];
  const verification = [
    { label: "Business License", status: "Verified", ok: true },
    { label: "National ID", status: "Verified", ok: true },
    { label: "Account Status", status: "Active", ok: true },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 14px", background: "#fff", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: B.text, fontFamily: "Inter,sans-serif" }}>Profile</span>
        <button onClick={onSettings} style={{ width: 36, height: 36, borderRadius: 10, background: B.surface, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Settings size={18} color={B.textSecondary} />
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Avatar */}
        <div style={{ background: `linear-gradient(135deg, ${B.blue} 0%, #1976D2 100%)`, padding: "28px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ width: 88, height: 88, borderRadius: 24, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid rgba(255,255,255,0.4)" }}>
              <Building2 size={40} color="#fff" />
            </div>
            <button style={{ position: "absolute", bottom: -4, right: -4, width: 28, height: 28, borderRadius: 8, background: B.orange, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Edit2 size={12} color="#fff" />
            </button>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "Inter,sans-serif" }}>Adeyemi Gas Station</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "Inter,sans-serif", marginTop: 4 }}>Lagos, Nigeria</div>
          <div style={{ marginTop: 10 }}>
            <span style={{ background: B.greenLight, color: B.green, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
              <BadgeCheck size={13} /><span>VERIFIED VENDOR</span>
            </span>
          </div>
        </div>

        {/* Details */}
        <div style={{ margin: "12px 16px", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <SectionLabel label="Business Details" />
          {details.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: i < details.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{d.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: B.text, fontFamily: "Inter,sans-serif", textAlign: "right", maxWidth: "60%" }}>{d.value}</span>
            </div>
          ))}
        </div>

        {/* Verification */}
        <div style={{ margin: "0 16px 20px", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <SectionLabel label="Verification Status" />
          {verification.map((v, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: i < verification.length - 1 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize: 13, color: B.textSecondary, fontFamily: "Inter,sans-serif" }}>{v.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {v.ok && <Check size={14} color={B.green} strokeWidth={2.5} />}
                <span style={{ fontSize: 13, fontWeight: 700, color: B.green, fontFamily: "Inter,sans-serif" }}>{v.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavBar active="profile" onNav={onNav} />
    </div>
  );
}

function SettingsScreen({ onBack }: { onBack: () => void }) {
  const sections = [
    {
      label: "BUSINESS",
      items: [
        { icon: Clock, title: "Business Hours", sub: "Mon–Sat · 7:00 AM – 8:00 PM", color: B.blue, bg: B.blueLight },
        { icon: MapPin, title: "Delivery Zone", sub: "Set coverage radius", color: B.orange, bg: B.orangeLight },
      ],
    },
    {
      label: "PREFERENCES",
      items: [
        { icon: Bell, title: "Notifications", sub: "Order alerts, inventory reminders", color: B.blue, bg: B.blueLight },
        { icon: Shield, title: "Privacy", sub: "Manage data & visibility", color: B.green, bg: B.greenLight },
        { icon: BadgeCheck, title: "Security", sub: "Password, 2-Factor Auth", color: B.textSecondary, bg: "#F1F5F9" },
      ],
    },
    {
      label: "SUPPORT",
      items: [
        { icon: HelpCircle, title: "Help Center", sub: "FAQs & guides", color: B.orange, bg: B.orangeLight },
        { icon: Phone, title: "Contact Support", sub: "Chat or call us", color: B.blue, bg: B.blueLight },
        { icon: Info, title: "About GasNow", sub: "Version 1.0.0", color: B.textSecondary, bg: "#F1F5F9" },
      ],
    },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: B.surface }}>
      <StatusBar />
      <TopBar title="Settings" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {sections.map((sec, si) => (
          <div key={si}>
            <SectionLabel label={sec.label} />
            <div style={{ margin: "0 16px", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              {sec.items.map((item, i) => (
                <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "none", border: "none", borderBottom: i < sec.items.length - 1 ? `1px solid ${B.border}` : "none", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.icon size={18} color={item.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: B.text, fontFamily: "Inter,sans-serif" }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: B.textMuted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <ChevronRight size={16} color={B.textMuted} />
                </button>
              ))}
            </div>
          </div>
        ))}
        {/* Logout */}
        <div style={{ margin: "16px 16px 24px" }}>
          <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: B.redLight, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "#FFCDD2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={18} color={B.red} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: B.red, fontFamily: "Inter,sans-serif" }}>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen Selector (scrollable gallery) ─────────────────────────────────────

type Screen =
  | "splash" | "login" | "register" | "otp" | "verify-biz" | "pending"
  | "dashboard" | "orders" | "order-detail" | "inventory" | "revenue"
  | "notifications" | "profile" | "settings";

const ALL_SCREENS: { id: Screen; label: string }[] = [
  { id: "splash", label: "Splash" },
  { id: "login", label: "Login" },
  { id: "register", label: "Register" },
  { id: "otp", label: "OTP" },
  { id: "verify-biz", label: "Verify Biz" },
  { id: "pending", label: "Pending" },
  { id: "dashboard", label: "Dashboard" },
  { id: "orders", label: "Orders" },
  { id: "order-detail", label: "Order Detail" },
  { id: "inventory", label: "Inventory" },
  { id: "revenue", label: "Revenue" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [showPicker, setShowPicker] = useState(false);

  const nav = (s: Screen) => { setShowPicker(false); setScreen(s); };

  const renderScreen = () => {
    switch (screen) {
      case "splash":       return <SplashScreen onDone={() => nav("login")} />;
      case "login":        return <LoginScreen onLogin={() => nav("otp")} onRegister={() => nav("register")} />;
      case "register":     return <RegisterScreen onBack={() => nav("login")} onNext={() => nav("otp")} />;
      case "otp":          return <OTPScreen onBack={() => nav("login")} onVerify={() => nav("verify-biz")} />;
      case "verify-biz":   return <VerifyBusinessScreen onBack={() => nav("register")} onSubmit={() => nav("pending")} />;
      case "pending":      return <PendingScreen onContact={() => {}} />;
      case "dashboard":    return <DashboardScreen onNav={s => nav(s as Screen)} onNotif={() => nav("notifications")} onOrder={() => nav("order-detail")} />;
      case "orders":       return <OrdersScreen onNav={s => nav(s as Screen)} onOrder={() => nav("order-detail")} />;
      case "order-detail": return <OrderDetailScreen onBack={() => nav("orders")} onNav={s => nav(s as Screen)} />;
      case "inventory":    return <InventoryScreen onNav={s => nav(s as Screen)} />;
      case "revenue":      return <RevenueScreen onBack={() => nav("dashboard")} onNav={s => nav(s as Screen)} />;
      case "notifications":return <NotificationsScreen onBack={() => nav("dashboard")} />;
      case "profile":      return <ProfileScreen onNav={s => nav(s as Screen)} onSettings={() => nav("settings")} />;
      case "settings":     return <SettingsScreen onBack={() => nav("profile")} />;
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0D1117 0%, #1a2744 50%, #0D1117 100%)" }}>
      {/* Screen picker */}
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <button onClick={() => setShowPicker(!showPicker)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", backdropFilter: "blur(8px)" }}>
          <Menu size={15} />
          <span>{ALL_SCREENS.find(s => s.id === screen)?.label ?? screen}</span>
          <ChevronDown size={14} />
        </button>
        {showPicker && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 440, justifyContent: "center", padding: "10px 12px", background: "rgba(13,17,23,0.9)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
            {ALL_SCREENS.map(s => (
              <button key={s.id} onClick={() => nav(s.id)} style={{ padding: "6px 14px", borderRadius: 20, background: screen === s.id ? B.blue : "rgba(255,255,255,0.08)", border: screen === s.id ? "none" : "1px solid rgba(255,255,255,0.15)", color: screen === s.id ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone */}
      <PhoneShell>
        {renderScreen()}
      </PhoneShell>

      {/* Footer */}
      <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif", letterSpacing: 0.5 }}>
        GasNow Vendor Portal · High-Fidelity Design
      </div>
    </div>
  );
}
