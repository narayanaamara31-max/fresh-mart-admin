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
  isLoggedIn: localStorage.getItem('freshmart_admin_session') === 'true',
  adminMobile: ADMIN_MOBILE,
  otpSent: false,
  login: () => {
    localStorage.setItem('freshmart_admin_session', 'true');
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('freshmart_admin_session');
    set({ isLoggedIn: false, otpSent: false });
  },
  setOtpSent: (v) => set({ otpSent: v }),
}));
