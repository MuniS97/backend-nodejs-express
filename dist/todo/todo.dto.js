"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoDto = exports.createTodoDto = void 0;
const zod_1 = require("zod");
exports.createTodoDto = zod_1.z.object({
    task: zod_1.z.string().min(1, "Todo is required").max(255),
});
exports.updateTodoDto = zod_1.z.object({
    task: zod_1.z.string().min(1, "Todo is required").max(255),
});
