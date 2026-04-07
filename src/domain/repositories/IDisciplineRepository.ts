import { DisciplineStatus } from "@prisma/client";

export interface IDisciplineRepository {
  create(name: string, status: DisciplineStatus, semester: string): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
  addGrade(id: string, grade: number): Promise<any>;
}
