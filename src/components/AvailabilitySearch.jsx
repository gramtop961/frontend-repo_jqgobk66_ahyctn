import React, { useState } from 'react'

export default function AvailabilitySearch({ onResults }) {
  const [propertyId, setPropertyId] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL

  async function handleSearch(e) {
    e.preventDefault()
    setError('')
    if (!propertyId || !checkIn || !checkOut) {
      setError('Please fill all fields')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${backend}/api/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: propertyId, check_in: checkIn, check_out: checkOut, guests: Number(guests) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to search availability')
      onResults({ search: { property_id: propertyId, check_in: checkIn, check_out: checkOut, guests }, items: data.items })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="bg-slate-800/60 border border-white/10 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
      <input value={propertyId} onChange={e=>setPropertyId(e.target.value)} placeholder="Property ID" className="px-3 py-2 rounded-md bg-slate-900/60 text-white border border-white/10" />
      <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="px-3 py-2 rounded-md bg-slate-900/60 text-white border border-white/10" />
      <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="px-3 py-2 rounded-md bg-slate-900/60 text-white border border-white/10" />
      <input type="number" min={1} value={guests} onChange={e=>setGuests(e.target.value)} className="px-3 py-2 rounded-md bg-slate-900/60 text-white border border-white/10" />
      <button type="submit" disabled={loading} className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50">{loading? 'Searching...' : 'Search'}</button>
      {error && <div className="sm:col-span-5 text-red-300 text-sm">{error}</div>}
    </form>
  )
}
