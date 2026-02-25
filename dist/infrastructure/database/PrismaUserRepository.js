"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    async create(data) {
        return prisma.user.create({
            data,
        });
    }
    async findFirst() {
        return prisma.user.findFirst();
    }
    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
