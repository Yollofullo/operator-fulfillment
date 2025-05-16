
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useCurrentOrder(operatorId: string) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!operatorId) return
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('operator_id', operatorId)
        .order('created_at', { ascending: true })
      if (error) console.error(error)
      else setOrders(data)
      setLoading(false)
    }

    fetchOrders()
  }, [operatorId])

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
    if (error) console.error(error)
    else setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }

  return { orders, loading, updateStatus }
}
