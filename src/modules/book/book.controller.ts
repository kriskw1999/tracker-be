import {FastifyReply, FastifyRequest} from "fastify";
import {PatchBookPayload, PostBookPayload,} from "./book.schema";
import {deleteBook, findBook, patchBook, postBook,} from "./book.service";

export async function postBookHandler(
  request: FastifyRequest<{
    Body: PostBookPayload;
  }>,
  reply: FastifyReply
) {
  const { title } = request.body;


  const taskBoard = await postBook({ title });

  reply.status(201).send(taskBoard);
}

export async function getBookHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const taskBoards = await findBook();

  reply.status(200).send(taskBoards);
}

export async function patchBookHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: PatchBookPayload;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const { title } = request.body;

  const taskBoard = await patchBook({ id, title });

  reply.status(200).send(taskBoard);
}

export async function deleteBookHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await deleteBook(id);

  reply.status(200).send();
}
