import Fastify from "fastify";
import taskRoutes from "./modules/task/task.route";
import { taskSchemas } from "./modules/task/task.schema";
import taskBoardRoute from "./modules/taskBoard/taskBoard.route";
import { taskBoardSchemas } from "./modules/taskBoard/taskBoard.schema";
import cors from "@fastify/cors";
import fastifyAuth0Verify from "fastify-auth0-verify";

export const server = Fastify();

/**
 * Used to check if the server is running
 */
server.get("/healthcheck", async function () {
  return { status: "OK" };
});

/**
 * Main function to start the server
 */
async function main() {
  [taskSchemas, taskBoardSchemas].flat().forEach((schema) => {
    server.addSchema(schema);
  });

  await server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  });

  /**
   * Handles auth0 verification
   */
  server.register(fastifyAuth0Verify, {
    domain: process.env.AUTH_DOMAIN!,
    secret: process.env.AUTH_SECRET!,
  });

  server.addHook("onRequest", async (request, reply) => {
    try {
      const token = await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  server.register(taskRoutes, { prefix: "/api/tasks" });
  server.register(taskBoardRoute, { prefix: "/api/taskboards" });

  try {
    await server.listen({ port: 8080, host: "0.0.0.0" });
  } catch (err) {
    process.exit(1);
  }
}

main();
