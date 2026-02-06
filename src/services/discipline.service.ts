import "dotenv/config";
import { PrismaClient, DisciplineStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class DisciplineService {
  
   // CREATE disciplina

  async create(name: string, status: DisciplineStatus) {
    return prisma.discipline.create({
      data: { name, status },
    });
  }

  //READ disciplina
  
  async list() {
    return prisma.discipline.findMany({
      include: { grades: true },
    });
  }

  // UPDATE disciplina
   
  async update(
    id: string,
    data: { name?: string; status?: DisciplineStatus }
  ) {
    await this.ensureDisciplineExists(id);

    return prisma.discipline.update({
      where: { id },
      data,
    });
  }

  //DELETE disciplina
  
  async delete(id: string): Promise<void> {
    await this.ensureDisciplineExists(id);

    await prisma.discipline.delete({
      where: { id },
    });
  }

  //ADICIONAR nota
   
  async addGrade(disciplineId: string, value: number) {
    await this.ensureDisciplineExists(disciplineId);

    return prisma.grade.create({
      data: {
        value,
        disciplineId,
      },
    });
  }

  //AVERAGE: recebe id e faz média

  async average(disciplineId: string): Promise<number> {
    const grades = await prisma.grade.findMany({
      where: { disciplineId },
      select: { value: true },
    });

    if (grades.length === 0) return 0;

    const sum = grades.reduce((acc, g) => acc + g.value, 0);
    return sum / grades.length;
  }

  //MÉTODO AUXILIAR p evitar operações em disciplinas q não exitem
  // buscando pelo ID
  
  private async ensureDisciplineExists(id: string) {
    const discipline = await prisma.discipline.findUnique({
      where: { id },
    });

    if (!discipline) {
      throw new Error("Disciplina não encontrada");
    }
  }
}
