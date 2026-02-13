import { DisciplineStatus } from "@prisma/client";
import { IDisciplineRepository } from "../repositories/IDisciplineRepository";


export class DisciplineService {

  constructor(private repository: IDisciplineRepository) {}

  async create(name: string, status: DisciplineStatus) {
    //fala apenas com o repo
    return this.repository.create(name, status);
  }

  async list() {
    return this.repository.findAll();
  }

  async update(
    id: string,
    data: { name?: string; status?: DisciplineStatus }
  ) {
    await this.ensureDisciplineExists(id);
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.ensureDisciplineExists(id);
    await this.repository.delete(id);
  }


  async addGrade(id: string, grade: number) {
    await this.ensureDisciplineExists(id);

    if (typeof grade !== "number") {
      throw new Error("Nota deve ser um número");
    }


    if (grade < 0 || grade > 10) {
      throw new Error("Nota deve estar entre 0 e 10");
    }

    return this.repository.addGrade(id, grade);
  }

  async average(disciplineId: string): Promise<number> {
    const discipline = await this.repository.findById(disciplineId);

    if (!discipline) {
      throw new Error("Disciplina não encontrada");
    }

    const grades = discipline.grades ?? [];

    if (grades.length === 0) return 0;

    const sum = grades.reduce((acc: number, g: any) => acc + g.value, 0);
    return sum / grades.length;
  }

  private async ensureDisciplineExists(id: string) {
    const discipline = await this.repository.findById(id);

    if (!discipline) {
      throw new Error("Disciplina não encontrada");
    }
  }
}
