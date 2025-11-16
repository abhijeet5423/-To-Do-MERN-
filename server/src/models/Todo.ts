import { Schema, model, Types } from "mongoose";

export interface ITodo {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel = model<ITodo>("Todo", todoSchema);
