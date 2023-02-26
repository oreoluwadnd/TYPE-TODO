import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todoController";

const router: Router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;