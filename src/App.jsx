import React, { useState } from 'react'
import Header from './components/Header'
import AvailabilitySearch from './components/AvailabilitySearch'
import AvailabilityList from './components/AvailabilityList'
import BookingForm from './components/BookingForm'

function App() {
  const [results, setResults] = useState(null)
  const [selection, setSelection] = useState(null)
  const [confirmed, setConfirmed] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <Header />

      <div className="relative mx-auto max-w-3xl px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold">Take direct bookings</h1>
          <p className="text-blue-200/90">Search availability, confirm a booking, and receive an email instantly.</p>
        </div>

        <AvailabilitySearch onResults={setResults} />
        <AvailabilityList results={results} onBook={setSelection} />

        {selection && (
          <BookingForm selection={selection} onClose={() => setSelection(null)} onBooked={(data)=>{ setConfirmed(data); setSelection(null); }} />
        )}

        {confirmed && (
          <div className="mt-6 bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 rounded-xl p-4">
            <div className="font-medium">Booking confirmed!</div>
            <div className="text-sm">Confirmation code: {confirmed.confirmation_code}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
