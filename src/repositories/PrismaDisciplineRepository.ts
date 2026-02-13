import { PrismaClient, DisciplineStatus } from "@prisma/client";
import { IDisciplineRepository } from "./IDisciplineRepository";

const prisma = new PrismaClient();

export class PrismaDisciplineRepository
  implements IDisciplineRepository
{
  async create(name: string, status: DisciplineStatus) {
    return prisma.discipline.create({
      data: { name, status },
    });
  }

  async findAll() {
    return prisma.discipline.findMany({
      include: { grades: true },
    });
  }

  async findById(id: string) {
    return prisma.discipline.findUnique({
      where: { id },
      include: { grades: true },
    });
  }

  async update(
    id: string,
    data: { name?: string; status?: DisciplineStatus }
  ) {
    return prisma.discipline.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await prisma.discipline.delete({
      where: { id },
    });
  }

  async addGrade(id: string, grade: number) {
    return prisma.grade.create({
      data: {
        value: grade,
        disciplineId: id,
      },
    });
  }
}
