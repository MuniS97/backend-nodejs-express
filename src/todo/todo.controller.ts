import { Request, Response, Router } from "express";
import { TodoService } from "./todo.service";
import { createTodoDto } from "./todo.dto";

const router = Router();

const todoService = new TodoService();

router.post("/", async (req: Request, res: Response) => {
    const validation = createTodoDto.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }

    const todo = await todoService.createTodo(req.body);
    res.status(200).json(todo);
});

router.get("/", async (req: Request, res: Response) => {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
});

export const todoRouter = router;
