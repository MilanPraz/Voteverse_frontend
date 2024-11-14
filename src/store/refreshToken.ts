import { create } from "zustand";

interface TAuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthState = create<TAuthState>((set) => ({
  accessToken: null, //this is inital value
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ accessToken: null }),
}));
