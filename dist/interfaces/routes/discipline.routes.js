"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplineRoutes = disciplineRoutes;
const discipline_service_1 = require("../../application/discipline/discipline.service");
const discipline_controller_1 = require("../controllers/discipline.controller");
const PrismaDisciplineRepository_1 = require("../../infrastructure/database/PrismaDisciplineRepository");
async function disciplineRoutes(app) {
    const repository = new PrismaDisciplineRepository_1.PrismaDisciplineRepository();
    const service = new discipline_service_1.DisciplineService(repository);
    const controller = new discipline_controller_1.DisciplineController(service);
    app.post("/", controller.create);
    app.get("/", controller.list);
    app.put("/:id", controller.update);
    app.delete("/:id", controller.delete);
    app.post("/:id/grades", controller.addGrade);
    app.get("/:id/average", controller.average);
}
