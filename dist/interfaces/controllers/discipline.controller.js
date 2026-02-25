"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplineController = void 0;
class DisciplineController {
    constructor(service) {
        this.service = service;
        this.create = async (request, reply) => {
            try {
                const { name, status } = request.body;
                const discipline = await this.service.create(name, status);
                return reply.status(201).send(discipline);
            }
            catch (err) {
                return reply.status(400).send({ error: err.message });
            }
        };
        this.list = async (_request, reply) => {
            const disciplines = await this.service.list();
            return reply.send(disciplines);
        };
        this.update = async (request, reply) => {
            try {
                const { id } = request.params;
                const { name, status } = request.body;
                const updated = await this.service.update(id, { name, status });
                return reply.send(updated);
            }
            catch (err) {
                return reply.status(404).send({ error: err.message });
            }
        };
        this.delete = async (request, reply) => {
            try {
                const { id } = request.params;
                await this.service.delete(id);
                return reply.status(204).send();
            }
            catch (err) {
                return reply.status(404).send({ error: err.message });
            }
        };
        this.addGrade = async (request, reply) => {
            try {
                const { id } = request.params;
                const { grade } = request.body;
                const result = await this.service.addGrade(id, grade);
                return reply.status(201).send(result);
            }
            catch (err) {
                return reply.status(400).send({ error: err.message });
            }
        };
        this.average = async (request, reply) => {
            try {
                const { id } = request.params;
                const avg = await this.service.average(id);
                return reply.send({ average: avg });
            }
            catch (err) {
                return reply.status(404).send({ error: err.message });
            }
        };
    }
}
exports.DisciplineController = DisciplineController;
