// src/types/index.ts
export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};
