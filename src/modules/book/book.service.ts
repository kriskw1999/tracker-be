import {PostBookPayload} from "./book.schema";
import prisma from "../../utils/prisma";

export function postBook(input: PostBookPayload) {
  const { title } = input;

  return prisma.taskBoard.create({
    data: {
      title,
    },
    include: {
      tasks: true,
    },
  });
}

export async function findBook() {
  return prisma.taskBoard.findMany({
    include: {
      tasks: true,
    },
  });
}

export async function patchBook(input: { id: string; title: string }) {
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

export async function deleteBook(id: string) {
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
