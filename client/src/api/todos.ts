// src/api/todos.ts
import api from "./apiClient";
import type { Todo } from "../types";

export const fetchTodos = async (token?: string): Promise<Todo[]> => {
  const res = await api.get<Todo[]>("/todos", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const createTodo = async (token: string, payload: { title: string }): Promise<Todo> => {
  const res = await api.post<Todo>("/todos", payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const updateTodo = async (token: string, id: string, payload: Partial<Todo>): Promise<Todo> => {
  const res = await api.put<Todo>(`/todos/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const deleteTodo = async (token: string, id: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
