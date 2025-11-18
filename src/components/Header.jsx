import React from 'react'

export default function Header() {
  return (
    <header className="relative z-10 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-white font-semibold tracking-tight">Booking Engine</span>
        </div>
        <div className="text-blue-300 text-sm">Manage rooms • Take direct bookings • Receive email alerts</div>
      </div>
    </header>
  )
}
