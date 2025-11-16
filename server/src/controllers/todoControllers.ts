import { Request, Response } from "express";
import { TodoModel } from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todos = await TodoModel.find({ user: userId }).sort({ createdAt: -1 });
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = (req as any).userId;
  const todo = await TodoModel.create({ title, description, user: userId });
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = (req as any).userId;
  const todo = await TodoModel.findOneAndUpdate({ _id: id, user: userId }, req.body, { new: true });
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = (req as any).userId;
  const todo = await TodoModel.findOneAndDelete({ _id: id, user: userId });
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
