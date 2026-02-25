"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discipline_service_1 = require("./discipline.service");
const client_1 = require("@prisma/client");
describe("DisciplineService - create", () => {
    it("deve chamar o repository e retornar a disciplina criada", async () => {
        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                name: "POO",
                status: client_1.DisciplineStatus.PLANEJADA,
            }),
        };
        const service = new discipline_service_1.DisciplineService(mockRepository);
        const result = await service.create("POO", client_1.DisciplineStatus.PLANEJADA);
        expect(mockRepository.create).toHaveBeenCalledWith("POO", client_1.DisciplineStatus.PLANEJADA);
        expect(result).toEqual({
            id: "1",
            name: "POO",
            status: client_1.DisciplineStatus.PLANEJADA,
        });
    });
});
describe("regra de negócio addGrade", () => {
    let mockRepository;
    let service;
    beforeEach(() => {
        mockRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                grades: [],
            }),
            addGrade: jest.fn(),
        };
        service = new discipline_service_1.DisciplineService(mockRepository);
    });
    it("indica erro se nota for menor que 0", async () => {
        await expect(service.addGrade("1", -1))
            .rejects
            .toThrow("Nota deve estar entre 0 e 10");
    });
});
it("deve lançar erro se disciplina não existir", async () => {
    const mockRepository = {
        findById: jest.fn().mockResolvedValue(null),
    };
    const service = new discipline_service_1.DisciplineService(mockRepository);
    await expect(service.average("1"))
        .rejects
        .toThrow("Disciplina não encontrada");
});
