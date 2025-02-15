"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todo_service_1 = require("./todo.service");
const todo_dto_1 = require("./todo.dto");
const router = (0, express_1.Router)();
const todoService = new todo_service_1.TodoService();
router.get("/", async (req, res) => {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
});
router.post("/", async (req, res) => {
    const validation = todo_dto_1.createTodoDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }
    const todo = await todoService.createTodo(req.body);
    res.status(200).json(todo);
});
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "ID parameter is required" });
    }
    const validation = todo_dto_1.updateTodoDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }
    try {
        const updatedTodo = await todoService.updateTodo(id, req.body);
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "ID parameter is required" });
    }
    try {
        const deletedTodo = await todoService.deleteTodo(id);
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
});
exports.todoRouter = router;
