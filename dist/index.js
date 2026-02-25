"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const discipline_routes_1 = require("./interfaces/routes/discipline.routes");
const user_routes_1 = require("./interfaces/routes/user.routes");
const app = (0, fastify_1.default)({
    logger: true,
});
const port = 3000;
async function bootstrap() {
    try {
        await app.register(cors_1.default);
        app.get("/", async () => {
            return "Student Academic Planner rodando";
        });
        await app.register(discipline_routes_1.disciplineRoutes, {
            prefix: "/disciplines",
        });
        await app.register(user_routes_1.userRoutes, {
            prefix: "/user",
        });
        await app.listen({ port });
        console.log(`Servidor rodando em http://localhost:${port}`);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}
bootstrap();
