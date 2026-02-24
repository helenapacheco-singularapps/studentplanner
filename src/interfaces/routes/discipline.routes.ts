import { FastifyInstance } from "fastify";
import { DisciplineService } from "../services/discipline.service";
import { DisciplineController } from "../interfaces/controllers/discipline.controller";
import { PrismaDisciplineRepository } from "../domain/repositories/PrismaDisciplineRepository";

export async function disciplineRoutes(app: FastifyInstance) {
  const repository = new PrismaDisciplineRepository();
  const service = new DisciplineService(repository);
  const controller = new DisciplineController(service);

  app.post("/", controller.create);
  app.get("/", controller.list);
  app.put("/:id", controller.update);
  app.delete("/:id", controller.delete);
  app.post("/:id/grades", controller.addGrade);
  app.get("/:id/average", controller.average);
}
