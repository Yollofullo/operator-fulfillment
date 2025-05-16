import { create } from 'zustand'

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

interface CurrentOrder {
  orderId: string
  address: string
  clientName: string
  items: any
  status: OrderStatus
  startedAt?: string
}

interface State {
  currentOrder: CurrentOrder | null
  setCurrentOrder: (order: CurrentOrder) => void
  clearCurrentOrder: () => void
}

export const useCurrentOrder = create<State>((set) => ({
  currentOrder: null,
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null }),
}))