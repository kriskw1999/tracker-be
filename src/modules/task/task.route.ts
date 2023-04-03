import { FastifyInstance } from "fastify";
import {
  deleteTaskHandler,
  getTasksHandler,
  patchTaskHandler,
  postTaskHandler,
} from "./task.controller";
import { $ref } from "./task.schema";

async function taskRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("postTaskRequestSchema"),
        response: { 201: $ref("postTaskResponseSchema") },
      },
    },
    postTaskHandler
  );

  server.get("/", getTasksHandler);

  server.delete("/:id", deleteTaskHandler);

  server.patch(
    "/:id",
    {
      schema: {
        body: $ref("patchTaskRequestSchema"),
        response: { 201: $ref("patchTaskResponseSchema") },
      },
    },
    patchTaskHandler
  );
}

export default taskRoutes;
