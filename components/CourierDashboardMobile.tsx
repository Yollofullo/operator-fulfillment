'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function CourierDashboardMobile() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'active')
        .single()
      setOrder(data)
    }

    fetchOrder()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Online: 00:23</div>
        <button className="bg-red-500 px-4 py-2 rounded">Go Offline</button>
      </div>

      {order ? (
        <div className="bg-gray-800 p-4 rounded shadow space-y-2">
          <div className="text-lg font-bold">Active Order</div>
          <div>ETA: {order.eta || '12:45 PM'}</div>
          <div>Destination: {order.destination}</div>
        </div>
      ) : (
        <div className="text-gray-400">No active order</div>
      )}

      <div className="bg-gray-900 h-64 rounded" id="map">
        Map Loading...
      </div>

      <div className="bg-gray-800 p-4 rounded shadow space-y-2">
        <div className="text-lg font-bold">Upcoming Orders</div>
        <ul className="space-y-1">
          <li className="border-b border-gray-700 pb-1">11:30 AM - Client X</li>
          <li className="border-b border-gray-700 pb-1">12:00 PM - Client Y</li>
        </ul>
      </div>
    </div>
  )
}
