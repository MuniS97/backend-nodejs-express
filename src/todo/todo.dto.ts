import { z } from "zod";

export const createTodoDto = z.object({
    task: z.string().min(1, "Todo is required").max(255),
})