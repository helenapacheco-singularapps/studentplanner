import { Request, Response } from "express";
import { DisciplineService } from "../services/discipline.service";


export class DisciplineController {
  constructor(private service: DisciplineService) {}

  // CREATE
  create = async (req: Request, res: Response) => {
    try {
      const { name, status } = req.body;

      const discipline = await this.service.create(name, status);

      return res.status(201).json(discipline);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  // READ
  list = async (_req: Request, res: Response) => {
    const disciplines = await this.service.list();
    return res.json(disciplines);
  };

  // UPDATE
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      const updated = await this.service.update(id, { name, status });

      return res.json(updated);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // DELETE
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.service.delete(id);

      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // ADICIONAR NOTA
  addGrade = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { grade } = req.body;

      const result = await this.service.addGrade(id, grade);

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  // MÉDIA
  average = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const avg = await this.service.average(id);

      return res.json({ average: avg });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };
}
