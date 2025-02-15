import { todo } from "node:test";
import { TodoService } from "./todo.service";

describe("TodoService", () => {
    const todoService = new TodoService();

    it("should create a todo", async () => {
        const todo = await todoService.createTodo({ task: "Test todo" });

        expect(todo).toHaveProperty("id");
        expect(todo.task).toEqual("Test todo");
    });
});