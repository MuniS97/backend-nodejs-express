"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const client_1 = require("@prisma/client");
const log_1 = require("../utils/log");
class TodoService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    // get many
    async getTodos() {
        return await this.prisma.todo.findMany();
    }
    // create
    async createTodo(task) {
        try {
            return await this.prisma.todo.create({ data: task });
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Failed to create todo");
        }
    }
    // update
    async updateTodo(id, task) {
        try {
            return await this.prisma.todo.update({
                where: { id },
                data: task
            });
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Todo not found or failed to update");
        }
    }
    // delete
    async deleteTodo(id) {
        try {
            return await this.prisma.todo.delete({ where: { id } });
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Todo not found or failed to delete");
        }
    }
}
exports.TodoService = TodoService;
