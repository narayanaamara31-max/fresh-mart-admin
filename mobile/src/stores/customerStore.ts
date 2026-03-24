import { create } from 'zustand';
import { Customer } from '@/src/types';
import { customers as mockCustomers } from '@/src/data/mockData';

interface CustomerState {
  customers: Customer[];
}

export const useCustomerStore = create<CustomerState>(() => ({
  customers: mockCustomers,
}));
