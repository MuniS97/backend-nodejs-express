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

    app.use("/api/todo", todoRouter);

    app.get("/api/todo", todoRouter)

    app.get("/profile", (req, res) => {
        res.render("profile", {
            user: {
                name: "John Doe",
                age: 30,
            },
        });
    });

    app.get("/error", (req, res) => {
        throw new Error("This is a test error");
    })

    app.all("*", (req, res) => {
        res.status(404).json({
            message: "Route not found",
        });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.stack);
        res.status(500).json({
            message: "Internal server error",
        });
    });
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