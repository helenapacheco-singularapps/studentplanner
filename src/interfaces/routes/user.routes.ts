import { FastifyInstance } from "fastify";
import { PrismaUserRepository } from "../../infrastructure/database/PrismaUserRepository";
import { UserService } from "../../application/user/user.service";
import { UserController } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  const userRepository = new PrismaUserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  app.post("/", (request, reply) =>
    userController.create(request, reply)
  );

  app.get("/", (request, reply) =>
    userController.get(request, reply)
  );

  app.put("/", (request, reply) =>
    userController.update(request, reply)
  );
}
