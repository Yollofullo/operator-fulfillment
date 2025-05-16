
'use client'

import { useEffect, useState } from 'react'
import { useSession } from '../../../hooks/useSession'
import { useCurrentOrder } from '../../../hooks/useCurrentOrder'
import { useVoiceCommands } from '../../../hooks/useVoiceCommands'

export default function Dashboard() {
  const { session } = useSession()
  const operatorId = session?.user?.id || ''
  const { orders, loading, updateStatus } = useCurrentOrder(operatorId)

  useVoiceCommands()

  if (loading) return <p>Loading orders...</p>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Operator Dashboard</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-md">
          <p>Client: {order.client_name}</p>
          <p>Status: {order.status}</p>
          <div className="space-x-2 mt-2">
            {['pending', 'in_transit', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(order.id, status)}
                className={`px-3 py-1 rounded ${
                  order.status === status ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
