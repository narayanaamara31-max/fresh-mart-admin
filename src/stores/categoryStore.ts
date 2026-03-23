import { create } from 'zustand';
import { Category } from '@/types';
import { categories as mockCategories } from '@/data/mockData';

interface CategoryState {
  categories: Category[];
  addCategory: (c: Category) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: mockCategories,
  addCategory: (c) => set((s) => ({ categories: [...s.categories, c] })),
  updateCategory: (id, data) => set((s) => ({
    categories: s.categories.map((c) => (c.id === id ? { ...c, ...data } : c)),
  })),
  deleteCategory: (id) => set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),
}));
