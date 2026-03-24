import { create } from 'zustand';
import { Order, OrderStatus } from '@/src/types';
import { orders as mockOrders } from '@/src/data/mockData';

interface OrderState {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDeliveryBoy: (orderId: string, deliveryBoyId: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: mockOrders,
  updateOrderStatus: (orderId, status) => set((s) => ({
    orders: s.orders.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
  })),
  assignDeliveryBoy: (orderId, deliveryBoyId) => set((s) => ({
    orders: s.orders.map((o) => (o.orderId === orderId ? { ...o, deliveryBoyId } : o)),
  })),
}));
