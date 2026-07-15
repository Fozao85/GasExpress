import { useState } from 'react'
import type { NavFn } from '../types'
import { ArrowLeftIcon, UploadIcon } from '../components/Icons'
import { StatusBar, HomeIndicator } from './LoginScreen'

const steps = ['ID', 'SELFIE', 'VEHICLE']

function UploadBox({ label }: { label: string }) {
  return (
    <div className="border-2 border-dashed border-[#CBD5E1] rounded-[16px] bg-[#F8FAFC] flex flex-col items-center justify-center gap-2 py-8 hover:border-[#1565C0] hover:bg-[#E3F2FD]/30 transition cursor-pointer active:bg-[#E3F2FD]/50">
      <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#1565C0]">
        <UploadIcon size={22} />
      </div>
      <p className="font-semibold text-sm text-[#0F172A]">{label}</p>
      <p className="text-xs text-[#94A3B8]">Tap to upload</p>
    </div>
  )
}

export function IdentityVerificationScreen({ nav }: { nav: NavFn }) {
  const [step, setStep] = useState(0)

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#F1F5F9]">
        <button
          onClick={() => nav('otp')}
          className="w-9 h-9 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569]"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <h1 className="text-lg font-bold text-[#0F172A]">Verify Identity</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-5 pb-4">
        {/* Description */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-5">
          Please upload your documents to complete registration and start receiving delivery jobs.
        </p>

        {/* Step tabs */}
        <div className="flex gap-1 mb-6">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className="flex-1 relative"
            >
              <div
                className={`h-1 rounded-full mb-2 transition ${
                  i <= step ? 'bg-[#1565C0]' : 'bg-[#E2E8F0]'
                }`}
              />
              <span
                className={`text-[10px] font-bold tracking-widest ${
                  i === step ? 'text-[#1565C0]' : 'text-[#94A3B8]'
                }`}
              >
                {s}
              </span>
            </button>
          ))}
        </div>

        {/* ID Tab */}
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Government-Issued ID</h3>
            <UploadBox label="Front of ID" />
            <UploadBox label="Back of ID" />

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wide">
                ID Number
              </label>
              <input
                type="text"
                placeholder="Enter ID number"
                className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC]"
              />
            </div>
          </div>
        )}

        {/* Selfie Tab */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Take a Selfie</h3>
            <p className="text-sm text-[#64748B]">Make sure your face is clearly visible and well-lit.</p>
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-[16px] bg-[#F8FAFC] flex flex-col items-center justify-center gap-2 py-16 cursor-pointer">
              <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#1565C0]">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <p className="font-semibold text-sm text-[#0F172A]">Take Selfie</p>
              <p className="text-xs text-[#94A3B8]">Tap to open camera</p>
            </div>
          </div>
        )}

        {/* Vehicle Tab */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Vehicle Details</h3>
            {[
              { label: 'Vehicle Type', placeholder: 'e.g. Motorcycle' },
              { label: 'Plate Number', placeholder: 'e.g. LAG 324 TR' },
              { label: 'Vehicle Model', placeholder: 'e.g. Honda CG125' },
              { label: 'Vehicle Year', placeholder: 'e.g. 2019' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wide">
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3.5 border border-[#E2E8F0] rounded-[12px] text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 bg-[#F8FAFC]"
                />
              </div>
            ))}
            <UploadBox label="Vehicle Photo" />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-4">
        <button
          onClick={() => step < 2 ? setStep(step + 1) : nav('pending')}
          className="w-full bg-[#1565C0] text-white py-4 rounded-[12px] font-bold text-base shadow-[0_4px_14px_rgba(21,101,192,0.35)]"
        >
          {step < 2 ? 'Continue' : 'Submit Documents'}
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}
