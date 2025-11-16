import api from "./apiClient";

export const signup = (payload: { email: string; password: string; name?: string }) => api.post("/auth/signup", payload).then(r => r.data);
export const login = (payload: { email: string; password: string }) => api.post("/auth/login", payload).then(r => r.data);
export const forgot = (payload: { email: string }) => api.post("/auth/forgot", payload).then(r => r.data);
export const reset = (payload: { id: string; token: string; newPassword: string }) => api.post("/auth/reset", payload).then(r => r.data);
