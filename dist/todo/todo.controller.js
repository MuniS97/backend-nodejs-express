"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
const todo_service_1 = require("./todo.service");
const todo_dto_1 = require("./todo.dto");
const router = (0, express_1.Router)();
const todoService = new todo_service_1.TodoService();
router.post("/", async (req, res) => {
    const validation = todo_dto_1.createTodoDto.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ message: validation.error.errors });
    }
    const todo = await todoService.createTodo(req.body);
    res.status(200).json(todo);
});
router.get("/", async (req, res) => {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
});
exports.todoRouter = router;
