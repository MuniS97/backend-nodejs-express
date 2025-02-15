"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_service_1 = require("./todo.service");
describe("TodoService", () => {
    const todoService = new todo_service_1.TodoService();
    it("should create a todo", async () => {
        const todo = await todoService.createTodo({ task: "Test todo" });
        expect(todo).toHaveProperty("id");
        expect(todo.task).toEqual("Test todo");
    });
});
