import { Request, Response, Router } from "express";
import { TodoService } from "./todo.service";
import { createTodoDto, updateTodoDto } from "./todo.dto";

const router = Router();

const todoService = new TodoService();


router.get("/", async (req: Request, res: Response) => {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
});

router.post("/", async (req: Request, res: Response) => {
    const validation = createTodoDto.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }

    const todo = await todoService.createTodo(req.body);
    res.status(200).json(todo);
});

router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "ID parameter is required" });
    }

    const validation = updateTodoDto.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }

    try {
        const updatedTodo = await todoService.updateTodo(id, req.body);
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
});


router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "ID parameter is required" });
    }

    try {
        const deletedTodo = await todoService.deleteTodo(id);
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
});



export const todoRouter = router;
