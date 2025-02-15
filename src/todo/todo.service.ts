import { PrismaClient, Todo } from "@prisma/client";
import { ICreateTodo } from "./todo.type";
import { logger } from "../utils/log";

export class TodoService {
    private prisma = new PrismaClient();
    // get many
    async getTodos(): Promise<Todo[]> {
        return await this.prisma.todo.findMany();
    }
    // create
    async createTodo(task: ICreateTodo): Promise<Todo> {
        try {
            return await this.prisma.todo.create({ data: task });
        } catch (error) {
            logger.error(error);
            throw new Error("Failed to create todo");
        }
    }
    // update
    async updateTodo(id: string, task: Partial<ICreateTodo>): Promise<Todo> {
        try {
            return await this.prisma.todo.update({
                where: { id },
                data: task
            });
        } catch (error) {
            logger.error(error);
            throw new Error("Todo not found or failed to update");
        }
    }
    // delete
    async deleteTodo(id: string): Promise<Todo> {
        try {
            return await this.prisma.todo.delete({ where: { id } })
        } catch (error) {
            logger.error(error);
            throw new Error("Todo not found or failed to delete");
        }
    }
}