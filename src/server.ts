import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { todoRouter } from "./todo/todo.controller";
import { PrismaClient } from "@prisma/client";
import { logger } from "./utils/log";
import helmet from "helmet";
import compression from "compression"

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

async function main() {
    app.use(helmet());
    app.use(compression())
    app.use(express.json());

    // todo router
    app.use("/api/todo", todoRouter);

    // Для шаблонизации
    app.get("/profile", (req, res) => {
        res.render("profile", {
            user: {
                name: "John Doe",
                age: 30,
            },
        });
    });

    // Обработка несуществующих маршрутов
    app.all("*", (req, res) => {
        res.status(404).json({
            message: "Route not found",
        });
    });

    // Обработка ошибок
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.stack);
        res.status(500).json({
            message: "Internal server error",
        });
    });

    // Запуск сервера
    const PORT = process.env.PORT || 4200;
    app.listen(PORT, () => {
        logger.info(`Server listening on port ${PORT}`);
    });
}
main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        logger.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })