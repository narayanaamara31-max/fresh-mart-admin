import { create } from 'zustand';
import { Product } from '@/types';
import { products as mockProducts } from '@/data/mockData';

interface ProductState {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: mockProducts,
  addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
  updateProduct: (id, data) => set((s) => ({
    products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
  })),
  deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
  toggleAvailability: (id) => set((s) => ({
    products: s.products.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)),
  })),
}));
