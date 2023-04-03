import prisma from "../../utils/prisma";
import { PatchTaskPayload, PostTaskPayload } from "./task.schema";

export async function postTask(input: PostTaskPayload) {
  const { title, recurrent, taskBoardId, done } = input;

  return prisma.task.create({
    data: {
      title,
      recurrent,
      taskBoardId,
      done,
    },
  });
}

export async function findTasks() {
  return prisma.task.findMany();
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });
}

export async function patchTask(input: {
  id: string;
  payload: PatchTaskPayload;
}) {
  const { id, payload } = input;

  return prisma.task.update({
    where: {
      id: Number(id),
    },
    data: payload,
  });
}
