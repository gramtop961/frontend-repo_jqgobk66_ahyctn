import React from 'react'

export default function AvailabilityList({ results, onBook }) {
  if (!results || !results.items?.length) return null
  const { search } = results
  return (
    <div className="mt-4 space-y-3">
      {results.items.map(item => (
        <div key={item.room_type_id} className="bg-slate-800/60 border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-white font-medium">{item.name}</div>
            <div className="text-blue-200/80 text-sm">Sleeps {item.max_guests} • ${item.nightly_price}/night</div>
          </div>
          <button onClick={() => onBook({ ...item, search })} className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500">Book</button>
        </div>
      ))}
    </div>
  )
}
