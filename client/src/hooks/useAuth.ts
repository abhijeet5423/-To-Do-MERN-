// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { login as loginApi, signup as signupApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) => loginApi(payload),
    onSuccess: (data: any) => {
      setAuth(data.token, data.user);
      return data;   // ✔ allow navigation
    },
  });
};

export const useSignup = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (payload: { name?: string; email: string; password: string }) => signupApi(payload),
    onSuccess: (data: any) => {
      setAuth(data.token, data.user);
      return data;
    },
  });
};
