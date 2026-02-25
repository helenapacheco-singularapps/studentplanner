"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplineService = void 0;
class DisciplineService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(name, status) {
        //fala apenas com o repo
        return this.repository.create(name, status);
    }
    async list() {
        return this.repository.findAll();
    }
    async update(id, data) {
        await this.ensureDisciplineExists(id);
        return this.repository.update(id, data);
    }
    async delete(id) {
        await this.ensureDisciplineExists(id);
        await this.repository.delete(id);
    }
    async addGrade(id, grade) {
        await this.ensureDisciplineExists(id);
        if (typeof grade !== "number") {
            throw new Error("Nota deve ser um número");
        }
        if (grade < 0 || grade > 10) {
            throw new Error("Nota deve estar entre 0 e 10");
        }
        return this.repository.addGrade(id, grade);
    }
    async average(disciplineId) {
        const discipline = await this.repository.findById(disciplineId);
        if (!discipline) {
            throw new Error("Disciplina não encontrada");
        }
        const grades = discipline.grades ?? [];
        if (grades.length === 0)
            return 0;
        const sum = grades.reduce((acc, g) => acc + g.value, 0);
        return sum / grades.length;
    }
    async ensureDisciplineExists(id) {
        const discipline = await this.repository.findById(id);
        if (!discipline) {
            throw new Error("Disciplina não encontrada");
        }
    }
}
exports.DisciplineService = DisciplineService;
