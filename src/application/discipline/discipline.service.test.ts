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