import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoControllers";

const router = Router();
router.use(auth);
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
