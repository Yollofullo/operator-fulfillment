'use client'
import { useState } from 'react'

export default function RoutePlanner() {
  const [stops, setStops] = useState(['Location A', 'Location B'])

  const optimizeRoute = () => {
    alert('Pretending to optimize route: ' + stops.join(' -> '))
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold text-lg mb-2">Route Planner</h2>
      <ul className="space-y-1 mb-3">
        {stops.map((stop, idx) => (
          <li key={idx} className="bg-gray-100 p-2 rounded">{stop}</li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={optimizeRoute}>Optimize Route</button>
    </div>
  )
}
