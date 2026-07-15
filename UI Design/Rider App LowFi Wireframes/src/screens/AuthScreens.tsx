import {
  PhoneFrame,
  StatusBar,
  TopBar,
  WireBox,
  WireAvatar,
  WireButton,
  WireInput,
} from "../components/WireKit"

// ── 1. Splash ──────────────────────────────────────────────────────────────────

export const SplashScreen = () => (
  <PhoneFrame label="Splash" tag="01">
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 gap-6">
      <WireBox w={120} h={120} label="Logo" style={{ borderRadius: 28 }} />
      <div className="text-center">
        <div className="text-[24px] font-bold text-[#111] tracking-tight">GasNow</div>
        <div className="text-[13px] text-[#888] mt-1">Rider App</div>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1.5 rounded-full bg-[#CCCCCC] ${i === 1 ? "w-6" : "w-1.5"}`} />
          ))}
        </div>
        <span className="text-[10px] font-mono text-[#BBBBBB] uppercase tracking-widest">Loading</span>
      </div>
    </div>
  </PhoneFrame>
)

// ── 2. Login ───────────────────────────────────────────────────────────────────

export const LoginScreen = () => (
  <PhoneFrame label="Login" tag="02">
    <StatusBar />
    <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
      <div className="pt-8 pb-6">
        <WireBox w={56} h={56} label="Logo" style={{ borderRadius: 14 }} />
        <div className="text-[22px] font-bold text-[#111] mt-4 leading-tight">Welcome back</div>
        <div className="text-[13px] text-[#888] mt-1">Sign in to your rider account</div>
      </div>

      <div className="flex flex-col gap-4">
        <WireInput label="Phone / Email" placeholder="Enter phone or email" />
        <WireInput label="Password" placeholder="Enter password" type="password" />
      </div>

      <div className="flex justify-end mt-2">
        <span className="text-[12px] text-[#555] underline">Forgot password?</span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <WireButton label="Sign In" />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E5E5E5]" />
          <span className="text-[11px] text-[#AAAAAA]">or</span>
          <div className="flex-1 h-px bg-[#E5E5E5]" />
        </div>
        <WireButton label="Continue with Google" variant="secondary" />
      </div>

      <div className="mt-auto pt-8 flex items-center justify-center gap-1.5">
        <span className="text-[12px] text-[#888]">New rider?</span>
        <span className="text-[12px] font-semibold text-[#333] underline">Create account</span>
      </div>
    </div>
  </PhoneFrame>
)

// ── 3. Register ────────────────────────────────────────────────────────────────

export const RegisterScreen = () => (
  <PhoneFrame label="Register" tag="03">
    <StatusBar />
    <TopBar title="Create Account" back />
    <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <WireInput label="First Name" placeholder="First name" />
          </div>
          <div className="flex-1">
            <WireInput label="Last Name" placeholder="Last name" />
          </div>
        </div>
        <WireInput label="Phone Number" placeholder="+234 800 000 0000" />
        <WireInput label="Email Address" placeholder="rider@email.com" />
        <WireInput label="Password" placeholder="Min 8 characters" type="password" />
        <WireInput label="Confirm Password" placeholder="Repeat password" type="password" />
      </div>

      <div className="mt-4 p-3 border border-[#E5E5E5] rounded-lg bg-[#F8F8F8]">
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 border border-[#BBBBBB] bg-white rounded mt-0.5 shrink-0" />
          <span className="text-[11px] text-[#666] leading-relaxed">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <WireButton label="Create Account" />
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[12px] text-[#888]">Already have an account?</span>
          <span className="text-[12px] font-semibold text-[#333] underline">Sign in</span>
        </div>
      </div>
    </div>
  </PhoneFrame>
)

// ── 4. OTP Verification ────────────────────────────────────────────────────────

export const OTPScreen = () => (
  <PhoneFrame label="OTP Verification" tag="04">
    <StatusBar />
    <TopBar title="Verify Phone" back />
    <div className="flex-1 flex flex-col px-6 py-8 gap-6">
      <div>
        <div className="text-[18px] font-bold text-[#111]">Enter verification code</div>
        <div className="text-[12px] text-[#888] mt-1.5 leading-relaxed">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-[#333]">+234 800 *** **01</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-14 flex items-center justify-center border rounded-xl text-[20px] font-bold text-[#111] ${i === 0 ? "border-[#333] bg-[#F8F8F8]" : "border-[#DDDDDD] bg-white"}`}
          >
            {i === 0 ? "5" : ""}
          </div>
        ))}
      </div>

      <div className="text-center">
        <span className="text-[12px] text-[#888]">Didn't receive code?</span>{" "}
        <span className="text-[12px] font-semibold text-[#333] underline">Resend in 00:45</span>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <WireButton label="Verify Code" />
        <WireButton label="Change Phone Number" variant="ghost" />
      </div>
    </div>
  </PhoneFrame>
)

// ── 5. Identity Verification ───────────────────────────────────────────────────

export const IdentityScreen = () => (
  <PhoneFrame label="Identity Verification" tag="05">
    <StatusBar />
    <TopBar title="Verify Identity" back />
    <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto gap-5">
      <div>
        <div className="text-[14px] text-[#555] leading-relaxed">
          Please upload your documents to complete registration and start receiving delivery jobs.
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {["ID", "Selfie", "Vehicle"].map((step, i) => (
          <div key={step} className="flex-1">
            <div className={`h-1 rounded-full ${i === 0 ? "bg-[#333]" : "bg-[#E5E5E5]"}`} />
            <div className={`text-[9px] font-mono mt-1 uppercase tracking-widest ${i === 0 ? "text-[#333]" : "text-[#AAAAAA]"}`}>
              {step}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[13px] font-semibold text-[#111]">Government-Issued ID</div>

      <div className="flex flex-col gap-3">
        {["Front of ID", "Back of ID"].map((side) => (
          <div
            key={side}
            className="border-2 border-dashed border-[#CCCCCC] rounded-xl p-6 flex flex-col items-center gap-2 bg-[#FAFAFA]"
          >
            <WireBox w={48} h={48} label="Img" style={{ borderRadius: 10 }} />
            <div className="text-[12px] font-medium text-[#333]">{side}</div>
            <div className="text-[10px] text-[#999]">Tap to upload</div>
          </div>
        ))}
      </div>

      <WireInput label="ID Number" placeholder="Enter ID number" />

      <div className="mt-auto">
        <WireButton label="Continue" />
      </div>
    </div>
  </PhoneFrame>
)

// ── 6. Pending Approval ────────────────────────────────────────────────────────

export const PendingApprovalScreen = () => (
  <PhoneFrame label="Pending Approval" tag="06">
    <StatusBar />
    <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6 bg-white">
      <div className="relative">
        <WireAvatar size={88} label="Avatar" />
        <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 border-white bg-[#DDDDDD] flex items-center justify-center">
          <span className="text-[12px] font-bold text-[#888]">?</span>
        </div>
      </div>

      <div className="text-center gap-2 flex flex-col">
        <div className="text-[18px] font-bold text-[#111]">Under Review</div>
        <div className="text-[12px] text-[#888] leading-relaxed">
          Your application is being reviewed. We'll notify you once approved — usually within 24 hours.
        </div>
      </div>

      {/* Status steps */}
      <div className="w-full border border-[#E5E5E5] rounded-xl overflow-hidden">
        {[
          { step: "Account Created", done: true },
          { step: "Documents Submitted", done: true },
          { step: "Under Review", done: false, active: true },
          { step: "Approved", done: false },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0] last:border-0"
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${item.done ? "bg-[#333] border-[#333]" : item.active ? "border-[#333] bg-white" : "border-[#DDDDDD] bg-white"}`}
            >
              {item.done && <span className="text-[9px] text-white">✓</span>}
              {item.active && <div className="w-2 h-2 rounded-full bg-[#333]" />}
            </div>
            <span
              className={`text-[12px] ${item.done || item.active ? "font-medium text-[#222]" : "text-[#AAAAAA]"}`}
            >
              {item.step}
            </span>
          </div>
        ))}
      </div>

      <WireButton label="Contact Support" variant="secondary" />
    </div>
  </PhoneFrame>
)
