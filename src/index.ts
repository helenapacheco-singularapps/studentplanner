import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { disciplineRoutes } from "./interfaces/routes/discipline.routes";
import { userRoutes } from "./interfaces/routes/user.routes";

const app = Fastify({
  logger: true,
});

const port = 3000;

async function bootstrap() {
  try {
    await app.register(cors);

    app.get("/", async () => {
      return "Student Academic Planner rodando";
    });

  
    await app.register(disciplineRoutes, {
      prefix: "/disciplines",
    });

    await app.register(userRoutes, {
      prefix: "/user",
    });

    await app.listen({ port });

    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

bootstrap();
