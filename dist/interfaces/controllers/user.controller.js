"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(request, reply) {
        const user = await this.userService.create(request.body);
        return reply.status(201).send(user);
    }
    async get(request, reply) {
        const user = await this.userService.get();
        return reply.send(user);
    }
    async update(request, reply) {
        const user = await this.userService.update(request.body);
        return reply.send(user);
    }
}
exports.UserController = UserController;
