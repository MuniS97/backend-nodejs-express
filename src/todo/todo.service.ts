import { PrismaClient, Todo } from "@prisma/client";
import { ICreateTodo } from "./todo.type";
import { logger } from "../utils/log";

export class TodoService {
    private prisma = new PrismaClient();
    createTodo(task: ICreateTodo): Promise<Todo> {
        try {
            return this.prisma.todo.create({ data: task });
        } catch (error) {
            logger.error(error);
            throw new Error("Failed to create todo");
        }
    }
    getTodos(): Promise<Todo[]> {
        return this.prisma.todo.findMany();
    }
}