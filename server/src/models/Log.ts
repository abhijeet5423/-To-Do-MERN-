import { Schema, model, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack?: string;
  route?: string;
  method?: string;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>({
  message: String,
  stack: String,
  route: String,
  method: String
}, { timestamps: true });

export const LogModel = model<ILog>("Log", LogSchema);
