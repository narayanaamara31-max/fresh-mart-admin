import { create } from 'zustand';
import { DeliveryBoy } from '@/src/types';
import { deliveryBoys as mockDeliveryBoys } from '@/src/data/mockData';

interface DeliveryState {
  deliveryBoys: DeliveryBoy[];
  addDeliveryBoy: (d: DeliveryBoy) => void;
  toggleActive: (id: string) => void;
  updateDeliveryBoy: (id: string, data: Partial<DeliveryBoy>) => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryBoys: mockDeliveryBoys,
  addDeliveryBoy: (d) => set((s) => ({ deliveryBoys: [...s.deliveryBoys, d] })),
  toggleActive: (id) => set((s) => ({
    deliveryBoys: s.deliveryBoys.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d)),
  })),
  updateDeliveryBoy: (id, data) => set((s) => ({
    deliveryBoys: s.deliveryBoys.map((d) => (d.id === id ? { ...d, ...data } : d)),
  })),
}));
