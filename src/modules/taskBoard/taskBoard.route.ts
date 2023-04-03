import { FastifyInstance } from "fastify";
import {
  deleteTaskBoardHandler,
  getTaskBoardsHandler,
  patchTaskBoardHandler,
  postTaskBoardsHandler,
} from "./taskBoard.controller";
import { $ref } from "./taskBoard.schema";

async function taskBoardRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("postTaskBoardRequestSchema"),
        response: { 201: $ref("postTaskBoardResponseSchema") },
      },
    },
    postTaskBoardsHandler
  );

  server.get("/", getTaskBoardsHandler);

  server.patch(
    "/:id",
    {
      schema: {
        body: $ref("patchTaskBoardRequestSchema"),
        response: { 200: $ref("patchTaskBoardResponseSchema") },
      },
    },
    patchTaskBoardHandler
  );

  server.delete("/:id", deleteTaskBoardHandler);
}

export default taskBoardRoutes;
