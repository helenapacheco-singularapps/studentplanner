import { Request, Response } from "express";
import { DisciplineService } from "../services/discipline.service";

export class DisciplineController {
  constructor(private service: DisciplineService) {}

  // CREATE
  create = (req: Request, res: Response) => {
    const { name, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({
        error: "nome da disciplina e status são obrigatórios",
      });
    }

    const discipline = this.service.create(name, status);
    return res.status(201).json(discipline);
  };

  // READ
  list = (_req: Request, res: Response) => {
    return res.json(this.service.list());
  };

  // UPDATE
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
      const updated = this.service.update(id, { name, status });
      return res.json(updated);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // DELETE
  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      this.service.delete(id);
      return res.status(204).send(); // sem corpo
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // ADICIONAR NOTA
addGrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grade } = req.body;

  if (typeof grade !== "number") {
    return res.status(400).json({ error: "nota deve ser número" });
  }

  if (grade < 0 || grade > 10) {
    return res.status(400).json({
      error: "nota deve estar entre 0 e 10",
    });
  }

  try {
    const result = await this.service.addGrade(id, grade);
    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};


  // MÉDIA
  average = (req: Request, res: Response) => {
    const { id } = req.params;
    const avg = this.service.average(id);

    return res.json({ average: avg });
  };
}
