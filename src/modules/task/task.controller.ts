import { FastifyReply, FastifyRequest } from "fastify";
import { PatchTaskPayload, PostTaskPayload } from "./task.schema";
import { deleteTask, findTasks, patchTask, postTask } from "./task.service";

export async function postTaskHandler(
  request: FastifyRequest<{
    Body: PostTaskPayload;
  }>,
  reply: FastifyReply
) {
  const task = await postTask(request.body);
  reply.status(201).send(task);
}

export async function getTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tasks = await findTasks();

  reply.status(200).send(tasks);
}

export async function deleteTaskHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await deleteTask(id);

  reply.status(200).send();
}

export async function patchTaskHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: PatchTaskPayload;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const payload = request.body;

  const task = await patchTask({ id, payload });

  reply.status(200).send(task);
}
