"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDisciplineRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaDisciplineRepository {
    async create(name, status) {
        return prisma.discipline.create({
            data: { name, status },
        });
    }
    async findAll() {
        return prisma.discipline.findMany({
            include: { grades: true },
        });
    }
    async findById(id) {
        return prisma.discipline.findUnique({
            where: { id },
            include: { grades: true },
        });
    }
    async update(id, data) {
        return prisma.discipline.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await prisma.discipline.delete({
            where: { id },
        });
    }
    async addGrade(id, grade) {
        return prisma.grade.create({
            data: {
                value: grade,
                disciplineId: id,
            },
        });
    }
}
exports.PrismaDisciplineRepository = PrismaDisciplineRepository;
