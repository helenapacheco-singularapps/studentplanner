import { Router } from "express";
import { DisciplineService } from "../services/discipline.service";
import { DisciplineController } from "../controllers/discipline.controller";

const router = Router();

const service = new DisciplineService();
const controller = new DisciplineController(service);

// CRUD
router.post("/", controller.create);
router.get("/", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

// extras
router.post("/:id/grades", controller.addGrade);
router.get("/:id/average", controller.average);

export default router;
