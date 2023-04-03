import Fastify from "fastify";
import taskRoutes from "./modules/task/task.route";
import { taskSchemas } from "./modules/task/task.schema";
import taskBoardRoute from "./modules/taskBoard/taskBoard.route";
import { taskBoardSchemas } from "./modules/taskBoard/taskBoard.schema";
import cors from "@fastify/cors";

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
