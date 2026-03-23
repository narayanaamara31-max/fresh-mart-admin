import { create } from 'zustand';
import { Customer } from '@/types';
import { customers as mockCustomers } from '@/data/mockData';

interface CustomerState {
  customers: Customer[];
}

export const useCustomerStore = create<CustomerState>(() => ({
  customers: mockCustomers,
}));
