"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const client_1 = require("@prisma/client");
const log_1 = require("../utils/log");
class TodoService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createTodo(task) {
        try {
            return this.prisma.todo.create({ data: task });
        }
        catch (error) {
            log_1.logger.error(error);
            throw new Error("Failed to create todo");
        }
    }
    getTodos() {
        return this.prisma.todo.findMany();
    }
}
exports.TodoService = TodoService;
