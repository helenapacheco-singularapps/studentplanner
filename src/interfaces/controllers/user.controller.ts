import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../../application/user/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.create(request.body as any);
    return reply.status(201).send(user);
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.get();
    return reply.send(user);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.update(request.body as any);
    return reply.send(user);
  }
}
