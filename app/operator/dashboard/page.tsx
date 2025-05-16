'use client'

import { useEffect, useState } from 'react'
import { useCurrentOrder } from '@/hooks/useCurrentOrder'
import { supabase } from '@/lib/supabase'

export default function OperatorDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const { currentOrder, setCurrentOrder, clearCurrentOrder } = useCurrentOrder()

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true })
      if (data) setOrders(data)
    }

    fetchOrders()

    const channel = supabase
      .channel('orders-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders((prev) => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const startDelivery = (order: any) => {
    setCurrentOrder({
      orderId: order.id,
      address: order.address,
      clientName: order.client_name,
      items: order.items,
      status: 'in_progress',
      startedAt: new Date().toISOString()
    })
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Operator Dashboard</h1>

      {currentOrder ? (
        <div className="border p-4 rounded mb-6">
          <p><strong>Current Delivery:</strong> {currentOrder.address}</p>
          <p>Status: {currentOrder.status}</p>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No delivery in progress.</p>
      )}

      <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded">
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Client:</strong> {order.client_name}</p>
            <p><strong>Item:</strong> {order.items?.description}</p>
            <button
              onClick={() => startDelivery(order)}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
            >
              Start Delivery
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}