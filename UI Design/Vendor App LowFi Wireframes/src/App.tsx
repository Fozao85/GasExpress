import React from 'react'

// ─── Wireframe Design Tokens ──────────────────────────────────────────────────
const W = {
  bg: '#F2F2F2',
  surface: '#FFFFFF',
  border: '#D0D0D0',
  placeholder: '#E2E2E2',
  placeholderDark: '#BEBEBE',
  textPrimary: '#1A1A1A',
  textSecondary: '#5C5C5C',
  textMuted: '#9B9B9B',
  accent: '#2C2C2C',
  divider: '#EBEBEB',
  chipBg: '#DCDCDC',
}

const FRAME_W = 390
const FRAME_H = 844

// ─── Primitive Components ─────────────────────────────────────────────────────

function Screen({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, flexShrink: 0 }}>
      <div
        style={{
          width: FRAME_W,
          height: FRAME_H,
          backgroundColor: W.bg,
          border: `2px solid ${W.textPrimary}`,
          borderRadius: 44,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: W.textMuted,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div
      style={{
        height: 44,
        backgroundColor: W.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color: W.textPrimary, fontFamily: 'system-ui' }}>
        9:41
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {[5, 8, 11, 14].map((h, i) => (
            <div
              key={i}
              style={{ width: 3, height: h, backgroundColor: W.textPrimary, borderRadius: 1 }}
            />
          ))}
        </div>
        <div
          style={{
            width: 15,
            height: 11,
            border: `2px solid ${W.textPrimary}`,
            borderRadius: 2,
            borderBottom: 'none',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 9,
              height: 4,
              border: `2px solid ${W.textPrimary}`,
              borderTop: 'none',
              borderRadius: '0 0 3px 3px',
            }}
          />
        </div>
        <div
          style={{
            width: 26,
            height: 13,
            border: `1.5px solid ${W.textPrimary}`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            padding: '0 2px',
            position: 'relative',
          }}
        >
          <div style={{ width: 16, height: 8, backgroundColor: W.textPrimary, borderRadius: 1 }} />
          <div
            style={{
              width: 3,
              height: 6,
              backgroundColor: W.textPrimary,
              position: 'absolute',
              right: -4,
              borderRadius: '0 2px 2px 0',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function Header({
  title,
  showBack = false,
  rightLabel,
}: {
  title: string
  showBack?: boolean
  rightLabel?: string
}) {
  return (
    <div
      style={{
        height: 56,
        backgroundColor: W.surface,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 10,
        borderBottom: `1px solid ${W.divider}`,
        flexShrink: 0,
      }}
    >
      {showBack && (
        <div
          style={{
            width: 32,
            height: 32,
            border: `1px solid ${W.border}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderLeft: `2px solid ${W.textPrimary}`,
              borderBottom: `2px solid ${W.textPrimary}`,
              transform: 'rotate(45deg) translateY(-1px)',
            }}
          />
        </div>
      )}
      <span
        style={{
          flex: 1,
          fontSize: 17,
          fontWeight: 700,
          color: W.textPrimary,
          fontFamily: 'system-ui',
        }}
      >
        {title}
      </span>
      {rightLabel && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: W.textSecondary,
            fontFamily: 'system-ui',
          }}
        >
          {rightLabel}
        </span>
      )}
    </div>
  )
}

function InputField({
  label,
  placeholder,
  optional,
}: {
  label: string
  placeholder?: string
  optional?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: W.textPrimary,
            fontFamily: 'system-ui',
          }}
        >
          {label}
        </span>
        {optional && (
          <span style={{ fontSize: 11, color: W.textMuted, fontFamily: 'system-ui' }}>
            (Optional)
          </span>
        )}
      </div>
      <div
        style={{
          height: 48,
          backgroundColor: W.surface,
          border: `1.5px solid ${W.border}`,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
        }}
      >
        <span style={{ fontSize: 14, color: W.textMuted, fontFamily: 'system-ui' }}>
          {placeholder || label}
        </span>
      </div>
    </div>
  )
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <div
      style={{
        height: 52,
        backgroundColor: W.accent,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', fontFamily: 'system-ui' }}>
        {label}
      </span>
    </div>
  )
}

function SecondaryButton({ label }: { label: string }) {
  return (
    <div
      style={{
        height: 52,
        backgroundColor: 'transparent',
        border: `2px solid ${W.accent}`,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <span
        style={{ fontSize: 16, fontWeight: 700, color: W.accent, fontFamily: 'system-ui' }}
      >
        {label}
      </span>
    </div>
  )
}

function PlaceholderBox({
  label,
  width,
  height,
  style,
}: {
  label: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: width ?? '100%',
        height: height ?? 120,
        backgroundColor: W.placeholder,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1.5px dashed ${W.placeholderDark}`,
        gap: 5,
        ...style,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          border: `2px solid ${W.placeholderDark}`,
          borderRadius: 4,
        }}
      />
      <span
        style={{
          fontSize: 9,
          color: W.textMuted,
          fontWeight: 700,
          fontFamily: 'system-ui',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Card({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        backgroundColor: W.surface,
        borderRadius: 12,
        border: `1px solid ${W.divider}`,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: W.divider, margin: '2px 0' }} />
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '9px 0',
      }}
    >
      <span style={{ fontSize: 13, color: W.textSecondary, fontFamily: 'system-ui' }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: bold ? 700 : 500,
          color: W.textPrimary,
          fontFamily: 'system-ui',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <div
      style={{
        backgroundColor: W.chipBg,
        borderRadius: 100,
        padding: '3px 9px',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: W.textSecondary,
          fontFamily: 'system-ui',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ padding: '12px 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: W.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
          fontFamily: 'system-ui',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: W.divider }} />
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: W.surface,
        borderRadius: 12,
        border: `1px solid ${W.divider}`,
        padding: '12px 12px 10px',
      }}
    >
      <div style={{ fontSize: 11, color: W.textMuted, fontFamily: 'system-ui', marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{ fontSize: 20, fontWeight: 800, color: W.textPrimary, fontFamily: 'system-ui' }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, color: W.textMuted, fontFamily: 'system-ui', marginTop: 3 }}>
          {sub}
        </div>
      )}
    </div>
  )
}

function BottomNav({ active }: { active: 'dashboard' | 'orders' | 'inventory' | 'profile' }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'profile', label: 'Profile' },
  ] as const
  return (
    <div
      style={{
        height: 80,
        backgroundColor: W.surface,
        borderTop: `1px solid ${W.divider}`,
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 12,
        flexShrink: 0,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            paddingTop: 8,
          }}
        >
          <PlaceholderBox
            label="Icon"
            width={24}
            height={24}
            style={{
              borderRadius: 6,
              border: `1.5px solid ${item.id === active ? W.textPrimary : W.placeholderDark}`,
              backgroundColor: item.id === active ? W.placeholderDark : W.placeholder,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: item.id === active ? 700 : 400,
              color: item.id === active ? W.textPrimary : W.textMuted,
              fontFamily: 'system-ui',
            }}
          >
            {item.label}
          </span>
          {item.id === active && (
            <div
              style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: W.textPrimary }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function ScrollArea({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
      {children}
    </div>
  )
}

function UploadBox({ label }: { label: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: W.textPrimary,
          fontFamily: 'system-ui',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          height: 96,
          backgroundColor: W.placeholder,
          borderRadius: 12,
          border: `2px dashed ${W.placeholderDark}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: `2px dashed ${W.placeholderDark}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 18, color: W.placeholderDark, lineHeight: 1 }}>+</span>
        </div>
        <span style={{ fontSize: 12, color: W.textMuted, fontFamily: 'system-ui' }}>
          Tap to upload · JPG or PDF
        </span>
      </div>
    </div>
  )
}

function SettingsRow({ label, sub }: { label: string; sub?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '13px 16px',
        borderBottom: `1px solid ${W.divider}`,
        gap: 12,
        backgroundColor: W.surface,
      }}
    >
      <PlaceholderBox
        label="Icon"
        width={34}
        height={34}
        style={{ borderRadius: 9, flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: W.textPrimary,
            fontFamily: 'system-ui',
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{ fontSize: 12, color: W.textMuted, fontFamily: 'system-ui', marginTop: 1 }}
          >
            {sub}
          </div>
        )}
      </div>
      <div
        style={{
          width: 7,
          height: 7,
          borderRight: `2px solid ${W.placeholderDark}`,
          borderTop: `2px solid ${W.placeholderDark}`,
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  )
}

// ─── Screen Implementations ───────────────────────────────────────────────────

function SplashScreen() {
  return (
    <Screen label="01 · Splash Screen">
      <div
        style={{
          flex: 1,
          backgroundColor: W.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <PlaceholderBox
          label="Logo"
          width={112}
          height={112}
          style={{ borderRadius: 28, border: `2px dashed ${W.placeholderDark}` }}
        />
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: W.textPrimary,
              fontFamily: 'system-ui',
              letterSpacing: '-0.03em',
            }}
          >
            GasNow
          </div>
          <div
            style={{
              fontSize: 14,
              color: W.textSecondary,
              fontFamily: 'system-ui',
              marginTop: 4,
              letterSpacing: '0.03em',
            }}
          >
            Vendor Portal
          </div>
        </div>
        {/* Loading indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: W.placeholder,
              borderRadius: 100,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '100%',
                backgroundColor: W.accent,
                borderRadius: 100,
              }}
            />
          </div>
          <span style={{ fontSize: 11, color: W.textMuted, fontFamily: 'system-ui' }}>
            Loading...
          </span>
        </div>
      </div>
    </Screen>
  )
}

function LoginScreen() {
  return (
    <Screen label="02 · Login">
      <StatusBar />
      <ScrollArea>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ margin: '16px 0 32px' }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: W.textPrimary,
                fontFamily: 'system-ui',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome back
            </div>
            <div
              style={{
                fontSize: 14,
                color: W.textSecondary,
                fontFamily: 'system-ui',
                marginTop: 6,
              }}
            >
              Sign in to your vendor account
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 12 }}>
            <InputField label="Phone Number" placeholder="+234 800 000 0000" />
            <InputField label="Password" placeholder="Enter your password" />
          </div>
          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <span
              style={{
                fontSize: 13,
                color: W.textSecondary,
                fontFamily: 'system-ui',
                textDecoration: 'underline',
              }}
            >
              Forgot password?
            </span>
          </div>
          <PrimaryButton label="Login" />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <span style={{ fontSize: 14, color: W.textSecondary, fontFamily: 'system-ui' }}>
              Don't have an account?{' '}
            </span>
            <span
              style={{
                fontSize: 14,
                color: W.textPrimary,
                fontWeight: 700,
                fontFamily: 'system-ui',
                textDecoration: 'underline',
              }}
            >
              Register
            </span>
          </div>
        </div>
      </ScrollArea>
    </Screen>
  )
}

function RegisterScreen() {
  return (
    <Screen label="03 · Register Business">
      <StatusBar />
      <Header title="Register Business" showBack />
      <ScrollArea>
        <div style={{ padding: '16px 24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p
            style={{
              fontSize: 13,
              color: W.textSecondary,
              fontFamily: 'system-ui',
              margin: '0 0 6px',
              lineHeight: 1.5,
            }}
          >
            Create a vendor account to start selling on GasNow.
          </p>
          <InputField label="Business Name" placeholder="e.g. Adeyemi Gas Station" />
          <InputField label="Owner Name" placeholder="Full legal name" />
          <InputField label="Phone Number" placeholder="+234 800 000 0000" />
          <InputField label="Email Address" placeholder="vendor@business.com" optional />
          <InputField label="Password" placeholder="Min. 8 characters" />
          <div style={{ marginTop: 8 }}>
            <PrimaryButton label="Create Account" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 14, color: W.textSecondary, fontFamily: 'system-ui' }}>
              Already registered?{' '}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: W.textPrimary,
                fontFamily: 'system-ui',
                textDecoration: 'underline',
              }}
            >
              Login
            </span>
          </div>
        </div>
      </ScrollArea>
    </Screen>
  )
}

function OTPScreen() {
  return (
    <Screen label="04 · OTP Verification">
      <StatusBar />
      <Header title="Verify Phone" showBack />
      <ScrollArea>
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <div style={{ marginBottom: 32, marginTop: 16, textAlign: 'center' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: W.textPrimary,
                fontFamily: 'system-ui',
              }}
            >
              Enter OTP Code
            </div>
            <div
              style={{
                fontSize: 14,
                color: W.textSecondary,
                fontFamily: 'system-ui',
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              A 6-digit code was sent to
              <br />
              <strong>+234 800 000 0000</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  width: 48,
                  height: 58,
                  backgroundColor: i === 1 ? W.surface : W.placeholder,
                  border: `2px solid ${i === 1 ? W.textPrimary : W.border}`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i === 1 && (
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: W.textPrimary,
                      fontFamily: 'system-ui',
                    }}
                  >
                    •
                  </span>
                )}
              </div>
            ))}
          </div>
          <div style={{ width: '100%', marginBottom: 20 }}>
            <PrimaryButton label="Verify OTP" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 14, color: W.textSecondary, fontFamily: 'system-ui' }}>
              Didn't receive it?{' '}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: W.textPrimary,
                fontFamily: 'system-ui',
                textDecoration: 'underline',
              }}
            >
              Resend OTP
            </span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ fontSize: 12, color: W.textMuted, fontFamily: 'system-ui' }}>
              Resend available in 00:43
            </span>
          </div>
        </div>
      </ScrollArea>
    </Screen>
  )
}

function BusinessVerificationScreen() {
  return (
    <Screen label="05 · Business Verification">
      <StatusBar />
      <Header title="Verify Business" showBack />
      <ScrollArea>
        <div style={{ padding: '16px 24px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p
            style={{
              fontSize: 13,
              color: W.textSecondary,
              fontFamily: 'system-ui',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Upload documents to verify your business. Review takes 24–48 hours.
          </p>
          <UploadBox label="Business License / CAC Certificate" />
          <UploadBox label="National ID / International Passport" />
          <InputField label="Business Address" placeholder="Street, City, State" />
          <div style={{ marginTop: 6 }}>
            <PrimaryButton label="Submit for Verification" />
          </div>
          <p
            style={{
              fontSize: 11,
              color: W.textMuted,
              fontFamily: 'system-ui',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </ScrollArea>
    </Screen>
  )
}

function PendingApprovalScreen() {
  return (
    <Screen label="06 · Pending Approval">
      <StatusBar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: 24,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            backgroundColor: W.placeholder,
            border: `2px dashed ${W.placeholderDark}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: W.textMuted,
              fontFamily: 'system-ui',
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 1.4,
              fontWeight: 700,
            }}
          >
            Status
            <br />
            Icon
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Badge label="Under Review" />
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: W.textPrimary,
              fontFamily: 'system-ui',
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            Verification Pending
          </div>
          <div
            style={{
              fontSize: 14,
              color: W.textSecondary,
              fontFamily: 'system-ui',
              lineHeight: 1.6,
            }}
          >
            Your documents are being reviewed. We'll notify you when complete (24–48 hrs).
          </div>
        </div>

        <Card style={{ width: '100%' }}>
          <Row label="Status" value="Under Review" />
          <Divider />
          <Row label="Submitted" value="12 Jul 2026" />
          <Divider />
          <Row label="Expected by" value="14 Jul 2026" />
        </Card>

        <div style={{ width: '100%' }}>
          <PrimaryButton label="Contact Support" />
        </div>
      </div>
    </Screen>
  )
}

function DashboardScreen() {
  return (
    <Screen label="07 · Vendor Dashboard">
      <StatusBar />
      <div
        style={{
          backgroundColor: W.surface,
          padding: '10px 16px 12px',
          borderBottom: `1px solid ${W.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: W.textMuted, fontFamily: 'system-ui' }}>
            Good morning,
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: W.textPrimary,
              fontFamily: 'system-ui',
            }}
          >
            Adeyemi Gas Station
          </div>
        </div>
        <PlaceholderBox
          label="Avatar"
          width={40}
          height={40}
          style={{ borderRadius: '50%', flexShrink: 0 }}
        />
      </div>
      <ScrollArea>
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column' }}>
          <SectionLabel label="Today's Summary" />
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <StatCard label="Total Orders" value="24" sub="↑ 3 from yesterday" />
            <StatCard label="Pending" value="6" sub="Awaiting action" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard label="Completed" value="18" sub="Today" />
            <StatCard label="Revenue" value="₦42,500" sub="Today" />
          </div>

          <SectionLabel label="Quick Actions" />
          <div style={{ display: 'flex', gap: 8 }}>
            {['New Order', 'Inventory', 'Revenue', 'Support'].map((action) => (
              <div
                key={action}
                style={{
                  flex: 1,
                  backgroundColor: W.surface,
                  border: `1px solid ${W.divider}`,
                  borderRadius: 12,
                  padding: '12px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <PlaceholderBox label="Icon" width={32} height={32} style={{ borderRadius: 8 }} />
                <span
                  style={{
                    fontSize: 9,
                    color: W.textSecondary,
                    fontFamily: 'system-ui',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  {action}
                </span>
              </div>
            ))}
          </div>

          <SectionLabel label="Recent Orders" />
          {[
            { id: '#GN-1042', name: 'Chioma Obi', item: '12.5kg × 2', status: 'Pending' },
            { id: '#GN-1041', name: 'Tunde Bello', item: '25kg × 1', status: 'In Transit' },
            { id: '#GN-1040', name: 'Emeka Eze', item: '6kg × 4', status: 'Completed' },
          ].map((order) => (
            <Card key={order.id} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: W.textPrimary,
                    fontFamily: 'system-ui',
                  }}
                >
                  {order.id}
                </span>
                <Badge label={order.status} />
              </div>
              <Row label={order.name} value={order.item} />
            </Card>
          ))}
        </div>
      </ScrollArea>
      <BottomNav active="dashboard" />
    </Screen>
  )
}

function IncomingOrdersScreen() {
  const orders = [
    {
      id: '#GN-1043',
      name: 'Funke Adewale',
      type: '12.5kg Cylinder',
      qty: 3,
      amount: '₦12,750',
      time: '2 min ago',
    },
    {
      id: '#GN-1044',
      name: 'Emeka Eze',
      type: '6kg Cylinder',
      qty: 1,
      amount: '₦3,200',
      time: '5 min ago',
    },
    {
      id: '#GN-1045',
      name: 'Ngozi Okonkwo',
      type: '25kg Cylinder',
      qty: 2,
      amount: '₦34,000',
      time: '11 min ago',
    },
  ]
  return (
    <Screen label="08 · Incoming Orders">
      <StatusBar />
      <Header title="Incoming Orders" rightLabel="3 New" />
      <ScrollArea>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map((order) => (
            <Card key={order.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: W.textPrimary,
                      fontFamily: 'system-ui',
                    }}
                  >
                    {order.id}
                  </span>
                  <div
                    style={{
                      fontSize: 11,
                      color: W.textMuted,
                      fontFamily: 'system-ui',
                      marginTop: 2,
                    }}
                  >
                    {order.time}
                  </div>
                </div>
                <Badge label="New" />
              </div>
              <Row label="Customer" value={order.name} />
              <Divider />
              <Row label="Cylinder" value={order.type} />
              <Divider />
              <Row label="Quantity" value={`${order.qty} unit${order.qty > 1 ? 's' : ''}`} />
              <Divider />
              <Row label="Total" value={order.amount} bold />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <SecondaryButton label="Reject" />
                <PrimaryButton label="Accept" />
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <BottomNav active="orders" />
    </Screen>
  )
}

function OrderDetailsScreen() {
  return (
    <Screen label="09 · Order Details">
      <StatusBar />
      <Header title="Order #GN-1043" showBack />
      <ScrollArea>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: W.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'system-ui',
                marginBottom: 10,
              }}
            >
              Customer Info
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <PlaceholderBox
                label="Avatar"
                width={48}
                height={48}
                style={{ borderRadius: '50%', flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: W.textPrimary,
                    fontFamily: 'system-ui',
                  }}
                >
                  Funke Adewale
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: W.textSecondary,
                    fontFamily: 'system-ui',
                    marginTop: 2,
                  }}
                >
                  +234 812 345 6789
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: W.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'system-ui',
                marginBottom: 8,
              }}
            >
              Delivery Address
            </div>
            <div
              style={{
                fontSize: 14,
                color: W.textPrimary,
                fontFamily: 'system-ui',
                lineHeight: 1.5,
              }}
            >
              14 Abeokuta Street, Ikeja, Lagos State
            </div>
            <PlaceholderBox label="Map Preview" height={72} style={{ marginTop: 10 }} />
          </Card>

          <Card>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: W.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'system-ui',
                marginBottom: 4,
              }}
            >
              Items Ordered
            </div>
            <Row label="12.5kg LPG Cylinder" value="₦4,250 × 3" />
            <Divider />
            <Row label="Delivery Fee" value="₦500" />
            <Divider />
            <Row label="Total" value="₦13,250" bold />
          </Card>

          <Card>
            <Row label="Payment Method" value="Cash on Delivery" />
            <Divider />
            <Row label="Order Status" value="Pending" />
          </Card>
        </div>
      </ScrollArea>
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: W.surface,
          borderTop: `1px solid ${W.divider}`,
          display: 'flex',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <SecondaryButton label="Reject" />
        <PrimaryButton label="Accept Order" />
      </div>
    </Screen>
  )
}

function InventoryScreen() {
  const items = [
    { name: '6kg Cylinder', stock: 45, price: '₦3,200', status: 'In Stock' },
    { name: '12.5kg Cylinder', stock: 22, price: '₦4,250', status: 'In Stock' },
    { name: '25kg Cylinder', stock: 8, price: '₦17,000', status: 'Low Stock' },
    { name: '50kg Cylinder', stock: 0, price: '₦34,500', status: 'Out of Stock' },
  ]
  return (
    <Screen label="10 · Inventory">
      <StatusBar />
      <Header title="Inventory" rightLabel="+ Add Item" />
      <ScrollArea>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <Card key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <PlaceholderBox
                label="Image"
                width={60}
                height={60}
                style={{ borderRadius: 10, flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: W.textPrimary,
                    fontFamily: 'system-ui',
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: W.textSecondary,
                    fontFamily: 'system-ui',
                    marginTop: 2,
                  }}
                >
                  {item.price} / unit
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 5,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: W.textMuted,
                      fontFamily: 'system-ui',
                    }}
                  >
                    Stock: {item.stock}
                  </span>
                  <Badge label={item.status} />
                </div>
              </div>
              <div
                style={{
                  width: 34,
                  height: 34,
                  border: `1px solid ${W.border}`,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: W.textSecondary,
                    fontFamily: 'system-ui',
                    fontWeight: 600,
                  }}
                >
                  Edit
                </span>
              </div>
            </Card>
          ))}
          {/* Empty state (shown contextually) */}
          <div
            style={{
              textAlign: 'center',
              padding: '12px 0',
              color: W.textMuted,
              fontSize: 12,
              fontFamily: 'system-ui',
            }}
          >
            Tap "+ Add Item" to add new inventory
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="inventory" />
    </Screen>
  )
}

function RevenueScreen() {
  return (
    <Screen label="11 · Revenue">
      <StatusBar />
      <Header title="Revenue" />
      <ScrollArea>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Period tabs */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              backgroundColor: W.placeholder,
              borderRadius: 12,
              padding: 4,
            }}
          >
            {['Daily', 'Weekly', 'Monthly'].map((tab, i) => (
              <div
                key={tab}
                style={{
                  flex: 1,
                  height: 36,
                  backgroundColor: i === 0 ? W.surface : 'transparent',
                  borderRadius: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: i === 0 ? `1px solid ${W.border}` : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: i === 0 ? 700 : 400,
                    color: i === 0 ? W.textPrimary : W.textMuted,
                    fontFamily: 'system-ui',
                  }}
                >
                  {tab}
                </span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <Card>
            <div
              style={{
                fontSize: 12,
                color: W.textSecondary,
                fontFamily: 'system-ui',
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Daily Revenue — July 2026
            </div>
            <PlaceholderBox label="Bar Chart" height={130} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: 6,
              }}
            >
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <span
                  key={d}
                  style={{ fontSize: 9, color: W.textMuted, fontFamily: 'system-ui' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </Card>

          {/* Summary stats */}
          <div style={{ display: 'flex', gap: 10 }}>
            <StatCard label="Today" value="₦42,500" />
            <StatCard label="This Week" value="₦218,000" />
          </div>
          <StatCard label="This Month" value="₦1,046,500" sub="July 2026" />

          <SectionLabel label="Recent Transactions" />
          {[
            { id: '#GN-1042', name: 'Chioma Obi', amount: '₦12,750', date: 'Today · 10:30 AM' },
            {
              id: '#GN-1041',
              name: 'Tunde Bello',
              amount: '₦17,000',
              date: 'Today · 09:15 AM',
            },
            {
              id: '#GN-1040',
              name: 'Emeka Eze',
              amount: '₦3,200',
              date: 'Yesterday · 4:00 PM',
            },
          ].map((tx) => (
            <Card key={tx.id} style={{ padding: '12px 14px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: W.textPrimary,
                      fontFamily: 'system-ui',
                    }}
                  >
                    {tx.name}
                  </div>
                  <div
                    style={{ fontSize: 11, color: W.textMuted, fontFamily: 'system-ui', marginTop: 2 }}
                  >
                    {tx.id} · {tx.date}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: W.textPrimary,
                    fontFamily: 'system-ui',
                  }}
                >
                  {tx.amount}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <BottomNav active="dashboard" />
    </Screen>
  )
}

function NotificationsScreen() {
  const notes = [
    {
      type: 'Order',
      title: 'New order received',
      body: 'Funke Adewale placed an order for 3 × 12.5kg cylinders',
      time: '2 min ago',
      unread: true,
    },
    {
      type: 'Order',
      title: 'Order #GN-1041 completed',
      body: 'Tunde Bello order delivered successfully',
      time: '1 hr ago',
      unread: true,
    },
    {
      type: 'Inventory',
      title: 'Low stock alert',
      body: '25kg cylinder running low — 8 units remaining',
      time: '3 hrs ago',
      unread: false,
    },
    {
      type: 'System',
      title: 'Weekly report ready',
      body: 'Your revenue summary for this week is available',
      time: 'Yesterday',
      unread: false,
    },
    {
      type: 'Inventory',
      title: 'Out of stock',
      body: '50kg cylinder is now out of stock',
      time: '2 days ago',
      unread: false,
    },
  ]
  return (
    <Screen label="12 · Notifications">
      <StatusBar />
      <Header title="Notifications" rightLabel="Mark all read" />
      <ScrollArea>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notes.map((n, i) => (
            <div
              key={i}
              style={{
                backgroundColor: n.unread ? '#F8F8F8' : W.surface,
                borderBottom: `1px solid ${W.divider}`,
                padding: '14px 16px',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: n.unread ? W.textPrimary : 'transparent',
                  marginTop: 5,
                  flexShrink: 0,
                  border: n.unread ? 'none' : `1px solid ${W.border}`,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: W.textPrimary,
                      fontFamily: 'system-ui',
                    }}
                  >
                    {n.title}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: W.textMuted,
                      fontFamily: 'system-ui',
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {n.time}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: W.textSecondary,
                    fontFamily: 'system-ui',
                    lineHeight: 1.4,
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  {n.body}
                </span>
                <Badge label={n.type} />
              </div>
            </div>
          ))}
          {/* Empty state (shown when list is empty) */}
          <div
            style={{
              padding: '48px 16px',
              textAlign: 'center',
              display: 'none',
            }}
          >
            <PlaceholderBox
              label="Empty Icon"
              width={64}
              height={64}
              style={{ margin: '0 auto 12px', borderRadius: '50%' }}
            />
            <div
              style={{ fontSize: 15, color: W.textSecondary, fontFamily: 'system-ui' }}
            >
              No notifications yet
            </div>
          </div>
        </div>
      </ScrollArea>
    </Screen>
  )
}

function ProfileScreen() {
  return (
    <Screen label="13 · Profile">
      <StatusBar />
      <Header title="Profile" />
      <ScrollArea>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              backgroundColor: W.surface,
              padding: '24px 24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              borderBottom: `1px solid ${W.divider}`,
            }}
          >
            <PlaceholderBox
              label="Business Logo"
              width={80}
              height={80}
              style={{ borderRadius: 20 }}
            />
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: W.textPrimary,
                  fontFamily: 'system-ui',
                }}
              >
                Adeyemi Gas Station
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: W.textSecondary,
                  fontFamily: 'system-ui',
                  marginTop: 3,
                }}
              >
                Lagos, Nigeria
              </div>
            </div>
            <Badge label="Verified Vendor" />
          </div>

          <div style={{ padding: '0 16px' }}>
            <SectionLabel label="Business Details" />
          </div>
          <Card style={{ margin: '0 16px', marginBottom: 4 }}>
            <Row label="Business Name" value="Adeyemi Gas Station" />
            <Divider />
            <Row label="Owner" value="Seun Adeyemi" />
            <Divider />
            <Row label="Phone" value="+234 812 345 6789" />
            <Divider />
            <Row label="Email" value="seun@adeyemigas.com" />
            <Divider />
            <Row label="Address" value="14 Abeokuta St, Ikeja" />
          </Card>

          <div style={{ padding: '0 16px' }}>
            <SectionLabel label="Verification Status" />
          </div>
          <Card style={{ margin: '0 16px', marginBottom: 4 }}>
            <Row label="Business License" value="✓ Verified" />
            <Divider />
            <Row label="National ID" value="✓ Verified" />
            <Divider />
            <Row label="Account Status" value="Active" />
          </Card>

          <div style={{ padding: '12px 16px 16px' }}>
            <SecondaryButton label="Edit Profile" />
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="profile" />
    </Screen>
  )
}

function SettingsScreen() {
  const groups = [
    {
      label: 'Business',
      items: [
        { label: 'Business Hours', sub: 'Mon–Sat · 7:00 AM – 8:00 PM' },
        { label: 'Delivery Zone', sub: 'Set coverage radius' },
      ],
    },
    {
      label: 'Preferences',
      items: [
        { label: 'Notifications', sub: 'Order alerts, inventory reminders' },
        { label: 'Privacy', sub: 'Manage data & visibility' },
        { label: 'Security', sub: 'Password, 2-Factor Auth' },
      ],
    },
    {
      label: 'Support',
      items: [
        { label: 'Help Center', sub: 'FAQs & guides' },
        { label: 'Contact Support', sub: 'Chat or call us' },
        { label: 'About GasNow', sub: 'Version 1.0.0' },
      ],
    },
  ]
  return (
    <Screen label="14 · Settings">
      <StatusBar />
      <Header title="Settings" />
      <ScrollArea>
        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
          {groups.map((group) => (
            <div key={group.label}>
              <div style={{ padding: '12px 16px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: W.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    fontFamily: 'system-ui',
                  }}
                >
                  {group.label}
                </span>
                <div style={{ flex: 1, height: 1, backgroundColor: W.divider }} />
              </div>
              {group.items.map((item) => (
                <SettingsRow key={item.label} label={item.label} sub={item.sub} />
              ))}
            </div>
          ))}

          <div style={{ margin: '20px 16px 0' }}>
            <div
              style={{
                height: 52,
                backgroundColor: W.placeholder,
                borderRadius: 12,
                border: `1.5px solid ${W.placeholderDark}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: W.textSecondary,
                  fontFamily: 'system-ui',
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="profile" />
    </Screen>
  )
}

// ─── Canvas Layout ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      style={{
        backgroundColor: '#E8E8E8',
        minHeight: '100vh',
        padding: '48px 48px 64px',
        overflowX: 'auto',
      }}
    >
      {/* Canvas header */}
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#ADADAD',
            fontFamily: 'system-ui',
            marginBottom: 8,
          }}
        >
          Vendor Wireframes · GasNow
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#1A1A1A',
            fontFamily: 'system-ui',
            letterSpacing: '-0.03em',
          }}
        >
          GasNow Vendor App
        </div>
        <div
          style={{
            fontSize: 14,
            color: '#8A8A8A',
            fontFamily: 'system-ui',
            marginTop: 4,
          }}
        >
          14 Screens · 390 × 844 · Mobile-First · Low-Fidelity Grayscale
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 20,
            padding: '14px 18px',
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            border: '1px solid #DCDCDC',
            width: 'fit-content',
          }}
        >
          {[
            { el: <div style={{ width: 28, height: 16, backgroundColor: '#E2E2E2', borderRadius: 4, border: '1.5px dashed #BEBEBE' }} />, label: 'Placeholder' },
            { el: <div style={{ width: 28, height: 16, backgroundColor: '#2C2C2C', borderRadius: 4 }} />, label: 'Primary Action' },
            { el: <div style={{ width: 28, height: 16, border: '2px solid #2C2C2C', borderRadius: 4 }} />, label: 'Secondary Action' },
            { el: <div style={{ width: 28, height: 16, backgroundColor: '#FFFFFF', borderRadius: 4, border: '1px solid #EBEBEB' }} />, label: 'Card' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.el}
              <span style={{ fontSize: 11, color: '#5C5C5C', fontFamily: 'system-ui' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Screens row */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <SplashScreen />
        <LoginScreen />
        <RegisterScreen />
        <OTPScreen />
        <BusinessVerificationScreen />
        <PendingApprovalScreen />
        <DashboardScreen />
        <IncomingOrdersScreen />
        <OrderDetailsScreen />
        <InventoryScreen />
        <RevenueScreen />
        <NotificationsScreen />
        <ProfileScreen />
        <SettingsScreen />
      </div>
    </div>
  )
}
