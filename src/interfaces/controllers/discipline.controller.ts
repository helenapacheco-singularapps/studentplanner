import { FastifyRequest, FastifyReply } from "fastify";
import { DisciplineService } from "../../application/discipline/discipline.service";


export class DisciplineController {
  constructor(private service: DisciplineService) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const { name, status, semester } = request.body as any;

      const discipline = await this.service.create(name, status, semester);

      return reply.status(201).send(discipline);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  };

  list = async (_request: FastifyRequest, reply: FastifyReply) => {
    const disciplines = await this.service.list();
    return reply.send(disciplines);
  };

  update = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;
    const updated = await this.service.update(id, request.body as any);

    return reply.send(updated);
  } catch (err: any) {
    return reply.status(404).send({ error: err.message });
  }
};

  delete = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params as any;

      await this.service.delete(id);

      return reply.status(204).send();
    } catch (err: any) {
      return reply.status(404).send({ error: err.message });
    }
  };

  addGrade = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params as any;
      const { grade } = request.body as any;

      const result = await this.service.addGrade(id, grade);

      return reply.status(201).send(result);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  };

  average = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params as any;

      const avg = await this.service.average(id);

      return reply.send({ average: avg });
    } catch (err: any) {
      return reply.status(404).send({ error: err.message });
    }
  };
  
  //GET /dashboard chama o service e devolve os dados do dashboard na resposta
dashboard = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const dashboard = await this.service.dashboard();
    return reply.send(dashboard);
  } catch (err: any) {
    return reply.status(500).send({ error: err.message });
  }
};
}
