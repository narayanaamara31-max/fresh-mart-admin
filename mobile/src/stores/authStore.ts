import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  adminMobile: string;
  otpSent: boolean;
  login: (mobile: string) => void;
  logout: () => void;
  setOtpSent: (v: boolean) => void;
}

const ADMIN_MOBILE = '9999999999';

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // Initial state for simplicity
  adminMobile: ADMIN_MOBILE,
  otpSent: false,
  login: (mobile: string) => {
    set({ isLoggedIn: true });
  },
  logout: () => {
    set({ isLoggedIn: false, otpSent: false });
  },
  setOtpSent: (v) => set({ otpSent: v }),
}));
