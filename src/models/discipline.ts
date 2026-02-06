export type DisciplineStatus =
  | "PLANEJADA"
  | "EM_ANDAMENTO"
  | "CONCLUIDA";

export interface Discipline {
  id: string;
  name: string;
  status: DisciplineStatus;
  grades: number[];
}
