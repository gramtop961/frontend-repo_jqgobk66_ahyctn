import React, { useState } from 'react'

export default function BookingForm({ selection, onClose, onBooked }) {
  const backend = import.meta.env.VITE_BACKEND_URL
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [requests, setRequests] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!selection) return null

  const nights = Math.max(1, Math.ceil((new Date(selection.search.check_out) - new Date(selection.search.check_in)) / (1000*60*60*24)))
  const total = (selection.nightly_price || 0) * nights

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try{
      setLoading(true)
      const payload = {
        property_id: selection.search.property_id,
        room_type_id: selection.room_type_id,
        check_in: selection.search.check_in,
        check_out: selection.search.check_out,
        guests: selection.search.guests,
        guest: { first_name: firstName, last_name: lastName, email, phone },
        special_requests: requests
      }
      const res = await fetch(`${backend}/api/reservations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed to create reservation')
      onBooked(data)
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20">
      <div className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Guest details</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">Close</button>
        </div>
        <div className="text-blue-200 text-sm mb-4">{selection.name} • {selection.search.check_in} → {selection.search.check_out} • {nights} nights • Total ${total}</div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First name" className="px-3 py-2 rounded-md bg-slate-800 text-white border border-white/10"/>
            <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last name" className="px-3 py-2 rounded-md bg-slate-800 text-white border border-white/10"/>
          </div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-3 py-2 rounded-md bg-slate-800 text-white border border-white/10"/>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone (optional)" className="px-3 py-2 rounded-md bg-slate-800 text-white border border-white/10"/>
          <textarea value={requests} onChange={e=>setRequests(e.target.value)} placeholder="Special requests" className="px-3 py-2 rounded-md bg-slate-800 text-white border border-white/10"/>
          <button type="submit" disabled={loading} className="w-full px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50">{loading ? 'Confirming...' : 'Confirm booking'}</button>
          {error && <div className="text-red-300 text-sm">{error}</div>}
        </form>
      </div>
    </div>
  )
}
