import { FastifyReply, FastifyRequest } from "fastify";
import {
  PatchTaskBoardPayload,
  PostTaskBoardPayload,
} from "./taskBoard.schema";
import {
  deleteTaskBoard,
  findTaskBoards,
  patchTaskBoard,
  postTaskBoard,
} from "./taskBoard.service";

export async function postTaskBoardsHandler(
  request: FastifyRequest<{
    Body: PostTaskBoardPayload;
  }>,
  reply: FastifyReply
) {
  const { title } = request.body;

  const taskBoard = await postTaskBoard({ title });

  console.log(taskBoard);

  reply.status(201).send(taskBoard);
}

export async function getTaskBoardsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskBoards = await findTaskBoards();

  reply.status(200).send(taskBoards);
}

export async function patchTaskBoardHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: PatchTaskBoardPayload;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const { title } = request.body;

  const taskBoard = await patchTaskBoard({ id, title });

  reply.status(200).send(taskBoard);
}

export async function deleteTaskBoardHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await deleteTaskBoard(id);

  reply.status(200).send();
}
