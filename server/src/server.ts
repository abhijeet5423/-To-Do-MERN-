import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import todosRoutes from "./routes/todos";
import { errorLogger } from "./middlewares/errorLogger";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB(process.env.MONGO_URI as string);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

// middlewares
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
