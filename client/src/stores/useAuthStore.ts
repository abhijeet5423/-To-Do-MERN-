// src/stores/useAuthStore.ts
import { create } from "zustand";

type User = { id: string; email: string; name?: string } | null;

interface AuthState {
  token: string | null;
  user: User;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token: string, user: User) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));
