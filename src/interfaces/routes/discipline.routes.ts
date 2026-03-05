import { FastifyInstance } from "fastify";
import { DisciplineService } from "../../application/discipline/discipline.service";
import { DisciplineController } from "../controllers/discipline.controller";
import { PrismaDisciplineRepository } from "../../infrastructure/database/PrismaDisciplineRepository";


export async function disciplineRoutes(app: FastifyInstance) {
  const repository = new PrismaDisciplineRepository();
  const service = new DisciplineService(repository);
  const controller = new DisciplineController(service);

  app.post("/disciplines", controller.create);
  app.get("/disciplines", controller.list);
  app.put("/disciplines/:id", controller.update);
  app.delete("/disciplines/:id", controller.delete);

  app.post("/disciplines/:id/grades", controller.addGrade);
  app.get("/disciplines/:id/average", controller.average);

  app.get("/dashboard", controller.dashboard);
}
