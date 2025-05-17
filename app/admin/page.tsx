'use client'
import OrderCreator from '../../components/OrderCreator'
import OrderList from '../../components/OrderList'

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <OrderCreator />
      <OrderList />
    </div>
  )
}
