import { DisciplineService } from "./discipline.service";
import { DisciplineStatus } from "@prisma/client";

describe("DisciplineService - create", () => {
  it("deve chamar o repository e retornar a disciplina criada", async () => {
   
    const mockRepository = {
      create: jest.fn().mockResolvedValue({
        id: "1",
        name: "POO",
        status: DisciplineStatus.PLANEJADA,
      }),
    };

    const service = new DisciplineService(mockRepository as any);

    const result = await service.create(
      "POO",

      DisciplineStatus.PLANEJADA
    );

 
    expect(mockRepository.create).toHaveBeenCalledWith(
      "POO",
      DisciplineStatus.PLANEJADA
    );

    expect(result).toEqual({
      id: "1",
      name: "POO",
      status: DisciplineStatus.PLANEJADA,
    });
  });
});

describe("regra de negócio addGrade", () => {
  let mockRepository: any;
  let service: DisciplineService;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn().mockResolvedValue({
        id: "1",
        grades: [],
      }),
      addGrade: jest.fn(),
    };

    service = new DisciplineService(mockRepository);
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

  const service = new DisciplineService(mockRepository as any);

  await expect(service.average("1"))
    .rejects
    .toThrow("Disciplina não encontrada");
});