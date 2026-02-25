"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const PrismaUserRepository_1 = require("../../infrastructure/database/PrismaUserRepository");
const user_service_1 = require("../../application/user/user.service");
const user_controller_1 = require("../controllers/user.controller");
async function userRoutes(app) {
    const userRepository = new PrismaUserRepository_1.PrismaUserRepository();
    const userService = new user_service_1.UserService(userRepository);
    const userController = new user_controller_1.UserController(userService);
    app.post("/", (request, reply) => userController.create(request, reply));
    app.get("/", (request, reply) => userController.get(request, reply));
    app.put("/", (request, reply) => userController.update(request, reply));
}
