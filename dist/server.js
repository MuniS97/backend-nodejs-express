"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const todo_controller_1 = require("./todo/todo.controller");
const client_1 = require("@prisma/client");
const log_1 = require("./utils/log");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.set("views", path_1.default.join(__dirname, "/src/views"));
app.set("view engine", "ejs");
async function main() {
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use("/api/todo", todo_controller_1.todoRouter);
    app.get("/api/todo", todo_controller_1.todoRouter);
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
    });
    app.all("*", (req, res) => {
        res.status(404).json({
            message: "Route not found",
        });
    });
    app.use((err, req, res, next) => {
        log_1.logger.error(err.stack);
        res.status(500).json({
            message: "Internal server error",
        });
    });
    const PORT = process.env.PORT || 4200;
    app.listen(PORT, () => {
        log_1.logger.info(`Server listening on port ${PORT}`);
    });
}
main()
    .then(async () => {
    await prisma.$connect();
})
    .catch(async (e) => {
    log_1.logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
