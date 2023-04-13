import { PostTaskBoardPayload } from "./taskBoard.schema";
import prisma from "../../utils/prisma";

export function postTaskBoard(input: PostTaskBoardPayload & { owner: string }) {
  const { title, owner } = input;

  return prisma.taskBoard.create({
    data: {
      title,
      owner,
    },
    include: {
      tasks: true,
    },
  });
}

export async function findTaskBoards({ owner }: { owner: string }) {
  return prisma.taskBoard.findMany({
    include: {
      tasks: true,
    },
    where: {
      owner,
    },
  });
}

export async function patchTaskBoard(input: { id: string; title: string }) {
  const { id, title } = input;

  return prisma.taskBoard.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
    },
    include: {
      tasks: true,
    },
  });
}

export async function deleteTaskBoard(id: string) {
  // delete first all the tasks
  await prisma.task.deleteMany({
    where: {
      taskBoardId: Number(id),
    },
  });

  // then delete the task board
  await prisma.taskBoard.delete({
    where: {
      id: Number(id),
    },
  });
}

export async function getTaskBoard(id: string) {
  return prisma.taskBoard.findUnique({
    where: {
      id: Number(id),
    },
  });
}
