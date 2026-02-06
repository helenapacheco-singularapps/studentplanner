export const DISCIPLINE_STATUS = [
  "PLANEJADA",
  "EM_ANDAMENTO",
  "CONCLUIDA",
] as const;

export type DisciplineStatus = typeof DISCIPLINE_STATUS[number];
