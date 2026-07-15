import { useState, useEffect, useRef } from 'react'

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  blue: '#1565C0',
  blueDark: '#0D47A1',
  blueLight: '#E3F2FD',
  orange: '#FF8F00',
  orangeLight: '#FFF8E1',
  green: '#2E7D32',
  greenLight: '#E8F5E9',
  red: '#D32F2F',
  redLight: '#FFEBEE',
  text: '#111827',
  textSub: '#6B7280',
  textMuted: '#9CA3AF',
  surface: '#F5F7FA',
  surface2: '#EAECEF',
  border: '#E0E4EA',
  white: '#FFFFFF',
  bg: '#FFFFFF',
}

// ─── Utility components ──────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? '#FFFFFF' : C.text
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 0', height: 44 }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="3" width="3" height="9" rx="1" fill={c} opacity="0.4"/>
          <rect x="4.5" y="2" width="3" height="10" rx="1" fill={c} opacity="0.6"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill={c}/>
          <path d="M13.5 4.5A3.5 3.5 0 0 1 17 1" stroke={c} strokeWidth="1.2"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0.5" y="0.5" width="13" height="11" rx="2" stroke={c} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="9" height="8" rx="1" fill={c}/>
          <path d="M14.5 4v4a2 2 0 0 0 0-4Z" fill={c} opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

function BackButton({ onPress, light = false }: { onPress: () => void; light?: boolean }) {
  return (
    <button onClick={onPress} style={{ width: 36, height: 36, borderRadius: 18, background: light ? 'rgba(255,255,255,0.2)' : C.surface, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12.5 15L7.5 10l5-5" stroke={light ? C.white : C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function PrimaryButton({ label, onPress, disabled = false, fullWidth = true, small = false }: { label: string; onPress?: () => void; disabled?: boolean; fullWidth?: boolean; small?: boolean }) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: small ? '10px 20px' : '16px',
        background: disabled ? C.surface2 : `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`,
        color: disabled ? C.textMuted : C.white,
        border: 'none',
        borderRadius: 12,
        fontSize: small ? 14 : 16,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '-0.01em',
        transition: 'opacity 0.15s',
      }}
    >
      {label}
    </button>
  )
}

function SecondaryButton({ label, onPress, small = false }: { label: string; onPress?: () => void; small?: boolean }) {
  return (
    <button
      onClick={onPress}
      style={{
        width: '100%',
        padding: small ? '10px 20px' : '16px',
        background: C.white,
        color: C.blue,
        border: `1.5px solid ${C.blue}`,
        borderRadius: 12,
        fontSize: small ? 14 : 16,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '-0.01em',
      }}
    >
      {label}
    </button>
  )
}

function InputField({ label, placeholder, type = 'text', value, onChange, hint, rightEl }: { label: string; placeholder: string; type?: string; value?: string; onChange?: (v: string) => void; hint?: string; rightEl?: React.ReactNode }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, letterSpacing: '-0.01em' }}>{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: C.surface, border: `1.5px solid ${focused ? C.blue : C.border}`, borderRadius: 12, transition: 'border-color 0.2s' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: C.text, fontFamily: 'Inter, sans-serif' }}
        />
        {rightEl && <div style={{ paddingRight: 14 }}>{rightEl}</div>}
      </div>
      {hint && <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{hint}</p>}
    </div>
  )
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, padding: '3px 8px', borderRadius: 6, letterSpacing: '0.01em' }}>
      {label}
    </span>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1l1.24 2.52 2.77.4-2 1.95.47 2.76L6 7.27l-2.48 1.36.47-2.76-2-1.95 2.77-.4Z" fill={i <= Math.round(rating) ? C.orange : C.surface2}/>
        </svg>
      ))}
      <span style={{ fontSize: 12, fontWeight: 600, color: C.textSub, marginLeft: 2 }}>{rating}</span>
    </div>
  )
}

function QuantitySelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: C.surface, borderRadius: 10, overflow: 'hidden' }}>
      <button onClick={() => onChange(Math.max(0, value - 1))} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: value === 0 ? C.textMuted : C.text, fontWeight: 500 }}>−</button>
      <span style={{ width: 28, textAlign: 'center', fontSize: 15, fontWeight: 600, color: C.text }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: C.blue, fontWeight: 500 }}>+</button>
    </div>
  )
}

function BottomNav({ active, onNav }: { active: string; onNav: (s: string) => void }) {
  const items = [
    { id: 'home', label: 'Home', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.8" fill={active === 'home' ? 'currentColor' : 'none'} strokeLinejoin="round"/><path d="M8 20v-7h6v7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { id: 'orders', label: 'Orders', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" fill={active === 'orders' ? 'currentColor' : 'none'}/><path d="M7 8h8M7 12h8M7 16h4" stroke={active === 'orders' ? 'white' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id: 'alerts', label: 'Alerts', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3a6 6 0 0 1 6 6v3l1.5 2.5H3.5L5 12V9a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="1.8" fill={active === 'alerts' ? 'currentColor' : 'none'} strokeLinejoin="round"/><path d="M9 17a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { id: 'profile', label: 'Profile', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" fill={active === 'profile' ? 'currentColor' : 'none'}/><path d="M3.5 19c0-4 3.36-7 7.5-7s7.5 3 7.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ]
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${C.border}`, background: C.white, paddingBottom: 8 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 6px', border: 'none', background: 'transparent', cursor: 'pointer', color: active === item.id ? C.blue : C.textMuted, gap: 3 }}>
          {item.icon}
          <span style={{ fontSize: 11, fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
          {active === item.id && <div style={{ width: 4, height: 4, borderRadius: 2, background: C.blue, marginTop: 1 }}/>}
        </button>
      ))}
    </div>
  )
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(160deg, ${C.blue} 0%, ${C.blueDark} 100%)`, gap: 0 }}>
      {/* Flame icon */}
      <div style={{ width: 88, height: 88, borderRadius: 28, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.25)' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 6c0 0-4 6-4 12 0 2.5 1 4.5 2.5 6C20 22 18 19 18 15c0 0-6 7-6 14a12 12 0 0 0 24 0c0-8-8-18-12-23Z" fill="#FF8F00"/>
          <path d="M24 28c0 0-2 3-2 5.5a4 4 0 0 0 8 0C30 31 26 25 24 28Z" fill="white" opacity="0.9"/>
        </svg>
      </div>
      <h1 style={{ fontSize: 34, fontWeight: 800, color: C.white, letterSpacing: '-0.03em', margin: 0 }}>GasNow</h1>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>LPG Delivered to Your Door</p>

      <div style={{ position: 'absolute', bottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: C.white, animation: 'spin 0.9s linear infinite' }}/>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Loading</span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

function OnboardingScreen({ onCreateAccount, onLogin }: { onCreateAccount: () => void; onLogin: () => void }) {
  const [slide, setSlide] = useState(0)
  const slides = [
    { title: 'Order Gas in Minutes', sub: 'Browse certified LPG vendors near you and get cylinders delivered fast.', emoji: '🔥' },
    { title: 'Track Every Delivery', sub: 'Watch your rider in real-time. Know exactly when your gas arrives.', emoji: '📍' },
    { title: 'Safe & Certified', sub: 'All vendors are verified. Pay securely with Mobile Money or cash.', emoji: '🛡️' },
  ]
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % 3), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      {/* Illustration area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0', background: `linear-gradient(180deg, ${C.blueLight} 0%, ${C.white} 100%)`, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: 140, background: 'rgba(21,101,192,0.07)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}/>
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100, background: 'rgba(21,101,192,0.05)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}/>

        <div style={{ fontSize: 90, lineHeight: 1, marginBottom: 24, transition: 'all 0.4s', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.1))' }}>
          {slides[slide].emoji}
        </div>

        <div style={{ textAlign: 'center', padding: '0 32px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.2 }}>
            {slides[slide].title}
          </h2>
          <p style={{ fontSize: 15, color: C.textSub, lineHeight: 1.6, margin: 0 }}>
            {slides[slide].sub}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 20 }}>
        {[0,1,2].map(i => (
          <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 6, height: 6, borderRadius: 3, background: i === slide ? C.blue : C.surface2, transition: 'all 0.3s', cursor: 'pointer' }}/>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 24px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton label="Create Account" onPress={onCreateAccount} />
        <SecondaryButton label="Log In" onPress={onLogin} />
        <p style={{ textAlign: 'center', fontSize: 11.5, color: C.textMuted, margin: 0 }}>
          By continuing you agree to our{' '}
          <span style={{ color: C.blue, fontWeight: 500 }}>Terms</span> &{' '}
          <span style={{ color: C.blue, fontWeight: 500 }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}

function CreateAccountScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [showPass, setShowPass] = useState(false)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white, overflowY: 'auto' }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 8px', gap: 12 }}>
        <BackButton onPress={onBack} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Create Account</h1>
      </div>

      <div style={{ flex: 1, padding: '8px 24px 24px', overflowY: 'auto' }}>
        <p style={{ fontSize: 14, color: C.textSub, marginBottom: 24 }}>Join GasNow and get gas delivered in minutes.</p>

        <InputField label="Full Name" placeholder="e.g. Amara Osei" value={name} onChange={setName} />

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>Phone Number</label>
          <div style={{ display: 'flex', border: `1.5px solid ${C.border}`, borderRadius: 12, background: C.surface, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 12px', borderRight: `1.5px solid ${C.border}`, background: C.surface2 }}>
              <span style={{ fontSize: 18 }}>🇬🇭</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>+233</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke={C.textSub} strokeWidth="1.5"/></svg>
            </div>
            <input placeholder="024 000 0000" style={{ flex: 1, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: C.text, fontFamily: 'Inter, sans-serif' }} value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <InputField label="Password" placeholder="Min. 8 characters" type={showPass ? 'text' : 'password'} value={pass} onChange={setPass} hint="Use letters, numbers & symbols"
          rightEl={<button onClick={() => setShowPass(!showPass)} style={{ fontSize: 12, color: C.blue, fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' }}>{showPass ? 'Hide' : 'Show'}</button>}
        />
        <InputField label="Confirm Password" placeholder="Repeat password" type="password" value={confirm} onChange={setConfirm} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
          <div onClick={() => setAgree(!agree)} style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${agree ? C.blue : C.border}`, background: agree ? C.blue : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            {agree && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
          </div>
          <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.5 }}>
            I agree to GasNow's <span style={{ color: C.blue, fontWeight: 500 }}>Terms of Service</span> and <span style={{ color: C.blue, fontWeight: 500 }}>Privacy Policy</span>
          </p>
        </div>

        <PrimaryButton label="Create Account" onPress={onSuccess} disabled={!agree || !name || !phone || !pass} />
        <p style={{ textAlign: 'center', fontSize: 13, color: C.textSub, marginTop: 16 }}>
          Already have an account? <span onClick={onBack} style={{ color: C.blue, fontWeight: 600, cursor: 'pointer' }}>Log In</span>
        </p>
      </div>
    </div>
  )
}

function LoginScreen({ onBack, onSuccess, onCreateAccount }: { onBack: () => void; onSuccess: () => void; onCreateAccount: () => void }) {
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 8px', gap: 12 }}>
        <BackButton onPress={onBack} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Log In</h1>
      </div>

      <div style={{ flex: 1, padding: '8px 24px 24px' }}>
        <p style={{ fontSize: 14, color: C.textSub, marginBottom: 28 }}>Welcome back! Enter your credentials to continue.</p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>Phone Number</label>
          <div style={{ display: 'flex', border: `1.5px solid ${C.border}`, borderRadius: 12, background: C.surface, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '14px 12px', borderRight: `1.5px solid ${C.border}`, background: C.surface2 }}>
              <span style={{ fontSize: 18 }}>🇬🇭</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>+233</span>
            </div>
            <input placeholder="Enter phone number" style={{ flex: 1, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: C.text, fontFamily: 'Inter, sans-serif' }} value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Password</label>
            <span style={{ fontSize: 13, color: C.blue, fontWeight: 500, cursor: 'pointer' }}>Forgot password?</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12 }}>
            <input type={showPass ? 'text' : 'password'} placeholder="••••••••" style={{ flex: 1, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: C.text, fontFamily: 'Inter, sans-serif' }} value={pass} onChange={e => setPass(e.target.value)} />
            <button onClick={() => setShowPass(!showPass)} style={{ paddingRight: 14, fontSize: 12, color: C.blue, fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' }}>{showPass ? 'Hide' : 'Show'}</button>
          </div>
        </div>

        <div style={{ marginTop: 24, marginBottom: 20 }}>
          <PrimaryButton label="Log In" onPress={onSuccess} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: C.border }}/>
          <span style={{ fontSize: 12, color: C.textMuted, whiteSpace: 'nowrap' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: C.border }}/>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {[{ icon: 'G', label: 'Google', color: '#EA4335' }, { icon: '🍎', label: 'Apple', color: C.text }].map(p => (
            <button key={p.label} style={{ flex: 1, padding: '12px', border: `1.5px solid ${C.border}`, borderRadius: 12, background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: p.color, fontFamily: 'Georgia, serif' }}>{p.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.text, fontFamily: 'Inter, sans-serif' }}>{p.label}</span>
            </button>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: C.textSub }}>
          New to GasNow? <span onClick={onCreateAccount} style={{ color: C.blue, fontWeight: 600, cursor: 'pointer' }}>Create Account</span>
        </p>
      </div>
    </div>
  )
}

function VerifyPhoneScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(45)
  const ref0 = useRef<HTMLInputElement>(null)
  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)
  const ref4 = useRef<HTMLInputElement>(null)
  const ref5 = useRef<HTMLInputElement>(null)
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5]

  useEffect(() => {
    const t = setInterval(() => setTimer(v => Math.max(0, v - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const handleOtp = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return
    const next = [...otp]
    next[i] = v
    setOtp(next)
    if (v && i < 5) refs[i + 1].current?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      refs[i - 1].current?.focus()
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 8px', gap: 12 }}>
        <BackButton onPress={onBack} />
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Verify Phone</h1>
      </div>

      <div style={{ flex: 1, padding: '24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* SMS Icon */}
        <div style={{ width: 88, height: 88, borderRadius: 28, background: C.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="4" y="8" width="36" height="28" rx="6" fill={C.blue} opacity="0.15"/>
            <rect x="4" y="8" width="36" height="28" rx="6" stroke={C.blue} strokeWidth="2"/>
            <path d="M14 18h16M14 24h10" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: '-0.02em', margin: '0 0 8px', textAlign: 'center' }}>Check your messages</h2>
        <p style={{ fontSize: 14, color: C.textSub, textAlign: 'center', lineHeight: 1.6, margin: '0 0 8px' }}>We sent a 6-digit code to</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>+233 024 ••• 0000</span>
          <span style={{ fontSize: 13, color: C.blue, fontWeight: 500, cursor: 'pointer' }}>Change</span>
        </div>

        {/* OTP inputs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {otp.map((v, i) => (
            <input
              key={i}
              ref={refs[i]}
              value={v}
              onChange={e => handleOtp(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              maxLength={1}
              style={{
                width: 46, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 700, color: C.text,
                border: `2px solid ${v ? C.blue : C.border}`, borderRadius: 12,
                background: v ? C.blueLight : C.surface, outline: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            />
          ))}
        </div>

        <div style={{ marginBottom: 36 }}>
          {timer > 0
            ? <p style={{ fontSize: 13, color: C.textSub, textAlign: 'center' }}>Resend code in <span style={{ fontWeight: 600, color: C.text }}>00:{String(timer).padStart(2, '0')}</span></p>
            : <p style={{ fontSize: 13, textAlign: 'center' }}>Didn't receive a code? <span style={{ color: C.blue, fontWeight: 600, cursor: 'pointer' }} onClick={() => setTimer(45)}>Resend OTP</span></p>
          }
        </div>

        <div style={{ width: '100%' }}>
          <PrimaryButton label="Verify & Continue" onPress={onSuccess} disabled={otp.some(v => !v)} />
        </div>
      </div>
    </div>
  )
}

// ─── Home Dashboard ───────────────────────────────────────────────────────────
const vendors = [
  { id: 1, name: 'Accra Gas Company', rating: 4.8, dist: '1.2 km', eta: '20–30 min', price: 85, status: 'Open', color: '#FF6B35' },
  { id: 2, name: 'SwiftFuel Ltd', rating: 4.5, dist: '2.0 km', eta: '30–45 min', price: 78, status: 'Open', color: '#1565C0' },
  { id: 3, name: 'QuickGas Hub', rating: 4.2, dist: '3.4 km', eta: '45–60 min', price: 72, status: 'Closed', color: '#7B3F00' },
  { id: 4, name: 'City Gas Depot', rating: 4.6, dist: '4.1 km', eta: '40–55 min', price: 80, status: 'Open', color: '#2E7D32' },
]

function VendorAvatar({ name, color, size = 48 }: { name: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.35, background: color + '20', border: `2px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 28 28" fill="none">
        <path d="M14 4c0 0-3 4-3 8 0 2 1 3.5 2 4.5C11 15 9.5 13 9.5 10c0 0-4.5 5-4.5 10a9 9 0 0 0 18 0c0-6-6-13-9-16Z" fill={color}/>
        <circle cx="14" cy="21" r="2.5" fill="white" opacity="0.8"/>
      </svg>
    </div>
  )
}

function HomeScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white, overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg, ${C.blue} 0%, ${C.blueDark} 100%)`, padding: '0 0 20px' }}>
        <StatusBar light />
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 2px' }}>Good morning 👋</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: 0, letterSpacing: '-0.02em' }}>Amara Osei</h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 0 1 5 5v2.5l1.5 2H3.5L5 9.5V7a5 5 0 0 1 5-5Z" stroke="white" strokeWidth="1.6"/><path d="M8.5 16a1.5 1.5 0 0 0 3 0" stroke="white" strokeWidth="1.6"/></svg>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
              <div style={{ fontSize: 18, lineHeight: 1 }}>👤</div>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div onClick={() => {}} style={{ margin: '16px 20px 0', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="7" r="3" stroke="white" strokeWidth="1.5"/><path d="M8 2a5 5 0 0 1 5 5c0 3-5 7-5 7S3 10 3 7a5 5 0 0 1 5-5Z" stroke="white" strokeWidth="1.5"/></svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: '0 0 1px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Delivering to</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.white, margin: 0 }}>14 Osu Badu Street, Accra</p>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Change ›</span>
        </div>
      </div>

      <div style={{ flex: 1, background: C.surface, padding: '16px 0 16px' }}>
        {/* Search */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10 }}>
          <div onClick={() => onNavigate('vendors')} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke={C.textMuted} strokeWidth="1.6"/><path d="M12 12l3.5 3.5" stroke={C.textMuted} strokeWidth="1.6" strokeLinecap="round"/></svg>
            <span style={{ fontSize: 14, color: C.textMuted }}>Search vendors, cylinder sizes...</span>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: C.white, border: `1.5px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M5 9h8M8 14h2" stroke={C.text} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Promo Banner */}
        <div style={{ margin: '0 20px 20px', background: `linear-gradient(135deg, ${C.orange} 0%, #FF6B00 100%)`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 16px rgba(255,143,0,0.3)' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.1)' }}/>
          <div style={{ position: 'absolute', right: 30, bottom: -30, width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.08)' }}/>
          <div style={{ zIndex: 1 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', margin: '0 0 4px', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>🎉 New User Offer</p>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: '0 0 4px', letterSpacing: '-0.02em' }}>GHC 20 OFF</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>Your first order · Code: FIRST20</p>
          </div>
          <div style={{ zIndex: 1, fontSize: 52 }}>🔥</div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'Order', emoji: '🛒', screen: 'vendors', color: C.blue },
              { label: 'Schedule', emoji: '📅', screen: 'home', color: '#7B3F00' },
              { label: 'Track', emoji: '📍', screen: 'track', color: C.green },
              { label: 'Support', emoji: '💬', screen: 'home', color: '#6A1B9A' },
            ].map(a => (
              <div key={a.label} onClick={() => onNavigate(a.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: a.color + '15', border: `1.5px solid ${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {a.emoji}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: C.textSub, textAlign: 'center' }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Vendors */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 12px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.01em' }}>Nearby Vendors</h3>
            <span onClick={() => onNavigate('vendors')} style={{ fontSize: 13, color: C.blue, fontWeight: 600, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '0 20px', overflowX: 'auto', paddingBottom: 4 }}>
            {vendors.filter(v => v.status === 'Open').map(v => (
              <div key={v.id} onClick={() => onNavigate('vendor-detail')} style={{ minWidth: 160, background: C.white, borderRadius: 16, padding: '14px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: `1px solid ${C.border}` }}>
                <VendorAvatar name={v.name} color={v.color} size={44} />
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '10px 0 4px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{v.name}</p>
                <StarRating rating={v.rating} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: C.textMuted }}>📍 {v.dist}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>· {v.eta}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.blue, margin: '6px 0 0' }}>from GHC {v.price}<span style={{ fontSize: 10, fontWeight: 400, color: C.textMuted }}>/12kg</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.01em' }}>Recent Orders</h3>
            <span onClick={() => onNavigate('orders')} style={{ fontSize: 13, color: C.blue, fontWeight: 600, cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            {[{ id: '#GN-1042', vendor: 'Accra Gas Co.', detail: '12 kg × 1', time: 'Today, 10:30 AM', status: 'Delivered', color: C.green }].map(o => (
              <div key={o.id} onClick={() => onNavigate('orders')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🪣</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{o.id}</span>
                    <Badge label={o.status} color={C.green} bg={C.greenLight} />
                  </div>
                  <p style={{ fontSize: 12, color: C.textSub, margin: '3px 0 0' }}>{o.vendor} · {o.detail}</p>
                  <p style={{ fontSize: 11, color: C.textMuted, margin: '2px 0 0' }}>{o.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNav={onNavigate} />
    </div>
  )
}

// ─── Vendor List ──────────────────────────────────────────────────────────────
function VendorListScreen({ onBack, onVendor }: { onBack: () => void; onVendor: () => void }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('All')
  const sorts = ['All', 'Nearest', 'Fastest', 'Cheapest', 'Top Rated']

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BackButton onPress={onBack} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Gas Vendors</h1>
        </div>
        <button style={{ fontSize: 13, fontWeight: 600, color: C.blue, background: C.blueLight, border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>Map</button>
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '10px 14px' }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="7.5" cy="7.5" r="5" stroke={C.textMuted} strokeWidth="1.5"/><path d="M11 11l3 3" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search vendors..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: C.text, fontFamily: 'Inter, sans-serif' }} />
        </div>
        <button style={{ width: 44, height: 44, background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="6" cy="7" r="2.5" stroke={C.text} strokeWidth="1.4"/><circle cx="11" cy="10" r="2.5" stroke={C.text} strokeWidth="1.4"/><path d="M2 7h2M8.5 7H15M2 10h7M13.5 10H15" stroke={C.text} strokeWidth="1.4" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Sort tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 12px', overflowX: 'auto' }}>
        {sorts.map(s => (
          <button key={s} onClick={() => setSort(s)} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: sort === s ? C.blue : C.surface, color: sort === s ? C.white : C.textSub, fontSize: 13, fontWeight: sort === s ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>{s}</button>
        ))}
      </div>

      <p style={{ fontSize: 12, color: C.textMuted, padding: '0 20px 8px', margin: 0 }}>12 vendors near Osu, Accra</p>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {vendors.map(v => (
          <div key={v.id} onClick={() => onVendor()} style={{ display: 'flex', gap: 12, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '14px', marginBottom: 10, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <VendorAvatar name={v.name} color={v.color} size={60} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.01em' }}>{v.name}</h3>
                <Badge label={v.status} color={v.status === 'Open' ? C.green : C.red} bg={v.status === 'Open' ? C.greenLight : C.redLight} />
              </div>
              <StarRating rating={v.rating} />
              <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
                <span style={{ fontSize: 12, color: C.textSub, background: C.surface, padding: '3px 8px', borderRadius: 6 }}>📍 {v.dist}</span>
                <span style={{ fontSize: 12, color: C.textSub, background: C.surface, padding: '3px 8px', borderRadius: 6 }}>⏱ {v.eta}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.blue, margin: '0 0 1px', textAlign: 'right' }}>GHC {v.price}</p>
                <p style={{ fontSize: 10, color: C.textMuted, margin: 0, textAlign: 'right' }}>/12kg</p>
              </div>
              <button onClick={e => { e.stopPropagation(); onVendor() }} style={{ background: C.blue, color: C.white, border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Order</button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${C.blue}`, borderTopColor: 'transparent', margin: '0 auto 8px', animation: 'spin 0.8s linear infinite' }}/>
          <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>Loading more...</p>
        </div>
      </div>
    </div>
  )
}

// ─── Vendor Detail ────────────────────────────────────────────────────────────
function VendorDetailScreen({ onBack, onOrder }: { onBack: () => void; onOrder: () => void }) {
  const [qty6, setQty6] = useState(0)
  const [qty12, setQty12] = useState(1)
  const [qty14, setQty14] = useState(0)
  const [saved, setSaved] = useState(false)

  const subtotal = qty6 * 45 + qty12 * 85 + qty14 * 100
  const hasItems = subtotal > 0

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white, overflowY: 'auto' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 220, background: `linear-gradient(160deg, #1565C020 0%, #FF8F0015 100%)`, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🔥</div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)' }}/>
        <div style={{ position: 'absolute', top: 48, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <BackButton onPress={onBack} light />
          <button onClick={() => setSaved(!saved)} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 17s-7-5-7-10a5 5 0 0 1 7-4.6A5 5 0 0 1 17 7c0 5-7 10-7 10Z" fill={saved ? '#EF5350' : 'transparent'} stroke="white" strokeWidth="1.8"/></svg>
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Accra Gas Company</h2>
            <Badge label="Open Now" color={C.white} bg={C.green} />
          </div>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>🏭</div>
        </div>
      </div>

      {/* Info strip */}
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <StarRating rating={4.8} />
        <span style={{ fontSize: 12, color: C.textMuted }}>·</span>
        <span style={{ fontSize: 12, color: C.textSub }}>📍 1.2 km away</span>
        <span style={{ fontSize: 12, color: C.textMuted }}>·</span>
        <span style={{ fontSize: 12, color: C.textSub }}>⏱ 20–30 min</span>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${C.border}` }}>
        {[{ label: 'Call', emoji: '📞' }, { label: 'Chat', emoji: '💬' }, { label: 'Share', emoji: '🔗' }].map((a, i) => (
          <button key={a.label} style={{ flex: 1, padding: '12px 0', border: 'none', borderRight: i < 2 ? `1px solid ${C.border}` : 'none', background: C.white, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 20 }}>{a.emoji}</span>
            <span style={{ fontSize: 12, color: C.textSub, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{a.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 20px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 14px', letterSpacing: '-0.01em' }}>Available Cylinders</h3>

        {[
          { size: '6 kg Cylinder', price: 45, qty: qty6, setQty: setQty6 },
          { size: '12 kg Cylinder', price: 85, qty: qty12, setQty: setQty12 },
          { size: '14.5 kg Cylinder', price: 100, qty: qty14, setQty: setQty14 },
        ].map(item => (
          <div key={item.size} style={{ display: 'flex', alignItems: 'center', gap: 12, background: item.qty > 0 ? C.blueLight : C.white, border: `1.5px solid ${item.qty > 0 ? C.blue : C.border}`, borderRadius: 14, padding: '14px', marginBottom: 10, transition: 'all 0.2s' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🪣</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{item.size}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.blue, margin: '0 0 4px' }}>GHC {item.price}</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <Badge label="In stock" color={C.green} bg={C.greenLight} />
                <Badge label="Exchange available" color={C.textSub} bg={C.surface2} />
              </div>
            </div>
            <QuantitySelector value={item.qty} onChange={item.setQty} />
          </div>
        ))}

        {hasItems && (
          <div style={{ background: C.surface, borderRadius: 14, padding: '14px', marginTop: 16, marginBottom: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 10px' }}>Price Summary</h4>
            {qty6 > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 13, color: C.textSub }}>6 kg × {qty6}</span><span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>GHC {qty6 * 45}</span></div>}
            {qty12 > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 13, color: C.textSub }}>12 kg × {qty12}</span><span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>GHC {qty12 * 85}</span></div>}
            {qty14 > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 13, color: C.textSub }}>14.5 kg × {qty14}</span><span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>GHC {qty14 * 100}</span></div>}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Subtotal</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.blue }}>GHC {subtotal}</span>
            </div>
          </div>
        )}
      </div>

      {hasItems && (
        <div style={{ padding: '0 20px 24px' }}>
          <PrimaryButton label={`Proceed to Checkout — GHC ${subtotal + 10}`} onPress={onOrder} />
        </div>
      )}
    </div>
  )
}

// ─── Checkout ─────────────────────────────────────────────────────────────────
function CheckoutScreen({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  const [payment, setPayment] = useState<'momo' | 'cash'>('momo')
  const [promo, setPromo] = useState('')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      <div style={{ background: C.white }}>
        <StatusBar />
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 16px', gap: 12 }}>
          <BackButton onPress={onBack} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Checkout</h1>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Delivery Address */}
        <div style={{ background: C.white, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>Delivery Address</h3>
            <span style={{ fontSize: 13, color: C.blue, fontWeight: 500, cursor: 'pointer' }}>Change</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>Home</p>
              <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.4 }}>14 Osu Badu Street, Osu, Greater Accra</p>
            </div>
          </div>
          <button style={{ width: '100%', marginTop: 12, padding: '10px', border: `1.5px dashed ${C.border}`, borderRadius: 10, background: 'transparent', color: C.blue, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            + Add delivery instructions
          </button>
        </div>

        {/* Payment */}
        <div style={{ background: C.white, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>Payment Method</h3>
            <span style={{ fontSize: 13, color: C.blue, fontWeight: 500, cursor: 'pointer' }}>Add new</span>
          </div>
          {[
            { id: 'momo', label: 'Mobile Money', sub: 'MTN MoMo •••• 4521', emoji: '📱', color: '#FFCD00' },
            { id: 'cash', label: 'Cash on Delivery', sub: 'Pay when rider arrives', emoji: '💵', color: C.green },
          ].map(p => (
            <div key={p.id} onClick={() => setPayment(p.id as 'momo' | 'cash')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', border: `2px solid ${payment === p.id ? C.blue : C.border}`, borderRadius: 12, marginBottom: 8, cursor: 'pointer', background: payment === p.id ? C.blueLight : C.white, transition: 'all 0.2s' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: p.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: '0 0 1px' }}>{p.label}</p>
                <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>{p.sub}</p>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${payment === p.id ? C.blue : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {payment === p.id && <div style={{ width: 10, height: 10, borderRadius: 5, background: C.blue }}/>}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: C.white, borderRadius: 16, padding: '16px', marginBottom: 12, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>Order Summary</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 12, borderBottom: `1px solid ${C.border}`, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🪣</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>12 kg LPG Cylinder</p>
              <p style={{ fontSize: 12, color: C.textSub, margin: '2px 0 0' }}>Accra Gas Company · Qty: 1</p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>GHC 85</p>
          </div>
          {[{ label: 'Subtotal', val: 'GHC 85' }, { label: 'Delivery fee', val: 'GHC 10' }, { label: 'Service fee', val: 'GHC 2' }, { label: 'Discount', val: '−GHC 0', color: C.green }].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.textSub }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: r.color || C.text }}>{r.val}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.blue }}>GHC 97</span>
          </div>
        </div>

        {/* Promo code */}
        <div style={{ background: C.white, borderRadius: 16, padding: '12px 16px', marginBottom: 20, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>🏷️</span>
          <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Enter promo / referral code" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: C.text, fontFamily: 'Inter, sans-serif' }} />
          {promo && <button style={{ fontSize: 13, fontWeight: 600, color: C.blue, border: 'none', background: 'transparent', cursor: 'pointer' }}>Apply</button>}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 20px 24px', background: C.white, borderTop: `1px solid ${C.border}` }}>
        <PrimaryButton label="Confirm Order — GHC 97" onPress={onConfirm} />
        <p style={{ textAlign: 'center', fontSize: 12, color: C.textMuted, marginTop: 8 }}>⏱ Estimated delivery: 20–30 mins</p>
      </div>
    </div>
  )
}

// ─── Order Confirmation ───────────────────────────────────────────────────────
function OrderConfirmationScreen({ onTrack, onHome }: { onTrack: () => void; onHome: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, background: C.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: `0 0 0 16px ${C.green}10` }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="24" fill={C.green} opacity="0.15"/>
            <path d="M15 26l8 8 14-14" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', margin: '0 0 8px' }}>Order Confirmed!</h2>
        <p style={{ fontSize: 15, color: C.textSub, margin: '0 0 6px', lineHeight: 1.5 }}>Your gas is on its way</p>
        <Badge label="#GN-1042" color={C.blue} bg={C.blueLight} />

        <div style={{ background: C.surface, borderRadius: 16, padding: '16px 24px', marginTop: 28, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          {[{ label: 'ETA', val: '~25 min', emoji: '⏱' }, { label: 'Amount', val: 'GHC 97', emoji: '💰' }, { label: 'Payment', val: 'MoMo', emoji: '📱' }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.emoji}</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{s.val}</p>
              <p style={{ fontSize: 11, color: C.textMuted, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
          <PrimaryButton label="Track My Order" onPress={onTrack} />
          <SecondaryButton label="Back to Home" onPress={onHome} />
        </div>
      </div>
    </div>
  )
}

// ─── Track Order ──────────────────────────────────────────────────────────────
function TrackOrderScreen({ onBack }: { onBack: () => void }) {
  const steps = [
    { label: 'Order Placed', time: '10:32 AM', done: true },
    { label: 'Vendor Confirmed', time: '10:34 AM', done: true },
    { label: 'Rider Assigned', time: '10:38 AM', done: true },
    { label: 'En Route to You', time: '10:40 AM', done: true, active: true },
    { label: 'Delivered', time: '—', done: false },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BackButton onPress={onBack} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Track Order</h1>
        </div>
        <button style={{ fontSize: 13, fontWeight: 600, color: C.blue, background: C.blueLight, border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>Help</button>
      </div>

      {/* Map */}
      <div style={{ height: 220, background: 'linear-gradient(135deg, #E8F0FE 0%, #E3F2FD 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* Grid */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.3 }} width="100%" height="100%">
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 40} y1="0" x2={i * 40} y2="220" stroke={C.blue} strokeWidth="0.5"/>
              <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke={C.blue} strokeWidth="0.5"/>
            </g>
          ))}
        </svg>
        {/* Roads */}
        <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
          <path d="M0 110 Q100 90 200 110 T400 110" stroke="white" strokeWidth="8" fill="none" opacity="0.7"/>
          <path d="M160 0 Q180 60 160 110 T180 220" stroke="white" strokeWidth="6" fill="none" opacity="0.7"/>
        </svg>
        {/* Rider pin */}
        <div style={{ position: 'absolute', top: '45%', left: '40%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 22, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(21,101,192,0.5)', border: '3px solid white', fontSize: 22 }}>🏍️</div>
          <div style={{ width: 16, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `12px solid ${C.blue}`, margin: '-1px auto 0' }}/>
        </div>
        {/* Dest pin */}
        <div style={{ position: 'absolute', top: '25%', right: '25%' }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(46,125,50,0.4)', border: '2px solid white', fontSize: 16 }}>🏠</div>
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: C.white, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap', backdropFilter: 'blur(4px)' }}>LIVE MAP</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Rider card */}
        <div style={{ margin: 16, background: C.white, borderRadius: 16, padding: '14px', border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>👨‍✈️</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>Delivery Rider</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.09 2.21 2.44.35-1.76 1.72.42 2.43L6 6.6 3.81 7.71l.42-2.43L2.47 3.56l2.44-.35Z" fill={C.orange}/></svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>4.9</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Badge label="Motorbike" color={C.textSub} bg={C.surface2} />
                <Badge label="GR-4521-22" color={C.blue} bg={C.blueLight} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 40, height: 40, borderRadius: 20, background: C.greenLight, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📞</button>
              <button style={{ width: 40, height: 40, borderRadius: 20, background: C.blueLight, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💬</button>
            </div>
          </div>
        </div>

        {/* ETA */}
        <div style={{ margin: '0 16px 16px', background: C.surface, borderRadius: 16, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, color: C.textMuted, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated Arrival</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>10:58 AM · ~12 min</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: C.textMuted, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Order</p>
            <Badge label="#GN-1042" color={C.blue} bg={C.blueLight} />
          </div>
        </div>

        {/* Timeline */}
        <div style={{ margin: '0 16px 24px', background: C.white, borderRadius: 16, padding: '16px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 16px' }}>Delivery Status</h3>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < steps.length - 1 ? 0 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: s.done ? (s.active ? C.blue : C.green) : C.surface2, border: `2px solid ${s.done ? (s.active ? C.blue : C.green) : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.done && !s.active && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  {s.active && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'white' }}/>}
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, height: 28, background: s.done ? C.green : C.border, borderRadius: 1, margin: '2px 0' }}/>}
              </div>
              <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 0 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < steps.length - 1 ? 16 : 0 }}>
                  <span style={{ fontSize: 13, fontWeight: s.active ? 700 : 500, color: s.done ? C.text : C.textMuted }}>{s.label}</span>
                  <span style={{ fontSize: 12, color: s.done ? C.textSub : C.textMuted }}>{s.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── My Orders ────────────────────────────────────────────────────────────────
const orders = [
  { id: '#GN-1038', vendor: 'SwiftFuel Ltd', date: 'Yesterday, 3:15 PM', items: '6 kg × 2', price: 'GHC 100', status: 'Delivered' },
  { id: '#GN-1031', vendor: 'QuickGas Hub', date: '12 Jul 2026', items: '14.5 kg × 1', price: 'GHC 112', status: 'Cancelled' },
  { id: '#GN-1020', vendor: 'Accra Gas Co.', date: '9 Jul 2026', items: '12 kg × 1', price: 'GHC 97', status: 'Delivered' },
]

function OrdersScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [tab, setTab] = useState<'All' | 'Delivered' | 'Cancelled' | 'Ongoing'>('All')
  const tabs = ['All', 'Delivered', 'Cancelled', 'Ongoing'] as const

  const filtered = tab === 'All' ? orders : orders.filter(o => o.status === tab)

  const statusColor = (s: string) => s === 'Delivered' ? { color: C.green, bg: C.greenLight } : s === 'Cancelled' ? { color: C.red, bg: C.redLight } : { color: C.orange, bg: C.orangeLight }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.white }}>
      <StatusBar />
      <div style={{ padding: '12px 20px 0' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: '0 0 12px', letterSpacing: '-0.02em' }}>My Orders</h1>
        <div style={{ display: 'flex', gap: 0, borderBottom: `1.5px solid ${C.border}` }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'transparent', fontSize: 13, fontWeight: tab === t ? 700 : 400, color: tab === t ? C.blue : C.textMuted, cursor: 'pointer', borderBottom: tab === t ? `2.5px solid ${C.blue}` : '2.5px solid transparent', marginBottom: -1.5, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
        {filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📭</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>No {tab.toLowerCase()} orders</h3>
            <p style={{ fontSize: 14, color: C.textSub, margin: 0 }}>Place your first order to get gas delivered to your door.</p>
          </div>
        ) : (
          filtered.map(o => {
            const sc = statusColor(o.status)
            return (
              <div key={o.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '14px', marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🪣</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{o.id}</span>
                      <Badge label={o.status} color={sc.color} bg={sc.bg} />
                    </div>
                    <p style={{ fontSize: 12, color: C.textSub, margin: '3px 0 0' }}>{o.vendor}</p>
                    <p style={{ fontSize: 11, color: C.textMuted, margin: '2px 0 0' }}>{o.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 12, color: C.textSub }}>{o.items} · </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{o.price}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <SecondaryButton label="Details" onPress={() => {}} small />
                    {o.status === 'Delivered' && <PrimaryButton label="Reorder" onPress={() => {}} small fullWidth={false} />}
                  </div>
                </div>
              </div>
            )
          })
        )}

        {filtered.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📭</div>
            <p style={{ fontSize: 13, color: C.textMuted, textAlign: 'center', margin: 0 }}>No more orders<br/><span style={{ fontSize: 12 }}>Place your first order to get gas delivered to your door.</span></p>
          </div>
        )}
      </div>

      <BottomNav active="orders" onNav={onNavigate} />
    </div>
  )
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function ProfileScreen({ onNavigate, onSettings }: { onNavigate: (s: string) => void; onSettings: () => void }) {
  const sections = [
    { title: 'ACCOUNT', items: [
      { label: 'Personal Information', emoji: '👤', right: null },
      { label: 'Saved Addresses', emoji: '📍', right: '2 saved' },
      { label: 'Payment Methods', emoji: '💳', right: 'MTN MoMo' },
    ]},
    { title: 'ACTIVITY', items: [
      { label: 'Order History', emoji: '📋', right: null },
      { label: 'My Reviews', emoji: '⭐', right: null },
      { label: 'Referrals & Rewards', emoji: '🎁', right: null },
    ]},
    { title: 'PREFERENCES', items: [
      { label: 'Settings', emoji: '⚙️', right: null, action: onSettings },
      { label: 'Notifications', emoji: '🔔', right: null },
      { label: 'Help & Support', emoji: '❓', right: null },
    ]},
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      <div style={{ background: `linear-gradient(160deg, ${C.blue} 0%, ${C.blueDark} 100%)`, padding: '0 0 32px' }}>
        <StatusBar light />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 20px' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: 0, letterSpacing: '-0.02em' }}>My Profile</h1>
          <button onClick={onSettings} style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.15)', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer' }}>Edit</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38 }}>👤</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, background: C.orange, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✏️</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Amara Osei</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>+233 024 000 0000</p>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <Badge label="✓ Verified" color={C.white} bg="rgba(255,255,255,0.2)" />
            <Badge label="12 Orders" color={C.white} bg="rgba(255,255,255,0.2)" />
            <Badge label="Member since 2024" color={C.white} bg="rgba(255,255,255,0.2)" />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.08em', margin: '0 0 8px' }}>{sec.title}</p>
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              {sec.items.map((item, i) => (
                <div key={item.label} onClick={item.action || (() => {})} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < sec.items.length - 1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.emoji}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.text }}>{item.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.right && <span style={{ fontSize: 12, color: C.textMuted }}>{item.right}</span>}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button style={{ width: '100%', padding: '14px', background: C.redLight, border: `1px solid ${C.red}20`, borderRadius: 16, color: C.red, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span>🚪</span> Log Out
        </button>
      </div>

      <BottomNav active="profile" onNav={onNavigate} />
    </div>
  )
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, background: on ? C.blue : C.surface2, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: 10, background: C.white, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }}/>
    </div>
  )
}

function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [notifs, setNotifs] = useState(true)
  const [dark, setDark] = useState(false)
  const [twofa, setTwofa] = useState(false)
  const [bio, setBio] = useState(true)
  const [analytics, setAnalytics] = useState(true)

  const sections = [
    { title: 'GENERAL', items: [
      { label: 'Language', emoji: '🌐', right: 'English (EN)', toggle: null },
      { label: 'Push Notifications', emoji: '📲', right: null, toggle: { val: notifs, set: setNotifs } },
      { label: 'Dark Mode', emoji: '🌙', right: null, toggle: { val: dark, set: setDark } },
    ]},
    { title: 'SECURITY', items: [
      { label: 'Change Password', emoji: '🔒', right: null, toggle: null, action: true },
      { label: 'Two-Factor Auth', emoji: '🔑', right: null, toggle: { val: twofa, set: setTwofa } },
      { label: 'Biometric Login', emoji: '👆', right: null, toggle: { val: bio, set: setBio } },
    ]},
    { title: 'PRIVACY', items: [
      { label: 'Location Access', emoji: '📍', right: 'While using', toggle: null },
      { label: 'Analytics & Data', emoji: '📊', right: null, toggle: { val: analytics, set: setAnalytics } },
    ]},
    { title: 'HELP & SUPPORT', items: [
      { label: 'Help Center', emoji: '❓', right: null, toggle: null, action: true },
      { label: 'Contact Support', emoji: '💬', right: null, toggle: null, action: true },
      { label: 'Rate GasNow', emoji: '⭐', right: null, toggle: null, action: true },
    ]},
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.surface }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <StatusBar />
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px 16px', gap: 12 }}>
          <BackButton onPress={onBack} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em' }}>Settings</h1>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 24px' }}>
        {sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '0.08em', margin: '0 0 8px' }}>{sec.title}</p>
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
              {sec.items.map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < sec.items.length - 1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.emoji}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.text }}>{item.label}</span>
                  {item.toggle ? (
                    <Toggle on={item.toggle.val} onToggle={() => item.toggle!.set(!item.toggle!.val)} />
                  ) : item.right ? (
                    <span style={{ fontSize: 12, color: C.textMuted }}>{item.right}</span>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────
type Screen = 'splash' | 'onboarding' | 'create-account' | 'login' | 'verify' | 'home' | 'vendors' | 'vendor-detail' | 'checkout' | 'confirmation' | 'track' | 'orders' | 'profile' | 'settings'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const go = (s: string) => setScreen(s as Screen)

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen onDone={() => go('onboarding')} />
      case 'onboarding': return <OnboardingScreen onCreateAccount={() => go('create-account')} onLogin={() => go('login')} />
      case 'create-account': return <CreateAccountScreen onBack={() => go('onboarding')} onSuccess={() => go('verify')} />
      case 'login': return <LoginScreen onBack={() => go('onboarding')} onSuccess={() => go('verify')} onCreateAccount={() => go('create-account')} />
      case 'verify': return <VerifyPhoneScreen onBack={() => go('login')} onSuccess={() => go('home')} />
      case 'home': return <HomeScreen onNavigate={go} />
      case 'vendors': return <VendorListScreen onBack={() => go('home')} onVendor={() => go('vendor-detail')} />
      case 'vendor-detail': return <VendorDetailScreen onBack={() => go('vendors')} onOrder={() => go('checkout')} />
      case 'checkout': return <CheckoutScreen onBack={() => go('vendor-detail')} onConfirm={() => go('confirmation')} />
      case 'confirmation': return <OrderConfirmationScreen onTrack={() => go('track')} onHome={() => go('home')} />
      case 'track': return <TrackOrderScreen onBack={() => go('home')} />
      case 'orders': return <OrdersScreen onNavigate={go} />
      case 'profile': return <ProfileScreen onNavigate={go} onSettings={() => go('settings')} />
      case 'settings': return <SettingsScreen onBack={() => go('profile')} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0D1117 0%, #1a1f2e 100%)', padding: '20px 0', fontFamily: 'Inter, sans-serif' }}>
      {/* Phone frame */}
      <div style={{ width: 390, height: 844, background: C.white, borderRadius: 48, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 12px #1C2333, 0 0 0 14px #2A3347', flexShrink: 0 }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, background: '#1C2333', borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zIndex: 20 }}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderScreen()}
        </div>
      </div>

      {/* Screen navigator (dev tool) */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(28,35,51,0.95)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '10px 16px', display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 640, border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['splash','onboarding','create-account','login','verify','home','vendors','vendor-detail','checkout','confirmation','track','orders','profile','settings'] as Screen[]).map(s => (
          <button key={s} onClick={() => go(s)} style={{ padding: '5px 10px', borderRadius: 8, border: 'none', background: screen === s ? C.blue : 'rgba(255,255,255,0.08)', color: screen === s ? C.white : 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: screen === s ? 600 : 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
