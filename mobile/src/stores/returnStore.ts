import { create } from 'zustand';
import { ReturnRequest, ReturnStatus } from '@/src/types';
import { returnRequests as mockReturns } from '@/src/data/mockData';

interface ReturnState {
  returns: ReturnRequest[];
  updateReturnStatus: (id: string, status: ReturnStatus) => void;
}

export const useReturnStore = create<ReturnState>((set) => ({
  returns: mockReturns,
  updateReturnStatus: (id, status) => set((s) => ({
    returns: s.returns.map((r) => (r.id === id ? { ...r, status } : r)),
  })),
}));
