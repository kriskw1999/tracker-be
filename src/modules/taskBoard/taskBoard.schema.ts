import * as z from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { taskCore } from "../task/task.schema";

const takBoardCore = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
};

const responseTaskBoardCore = {
  id: z.number(),
  ...takBoardCore,
  tasks: z.array(z.object(taskCore)),
};

const postTaskBoardRequestSchema = z.object({
  ...takBoardCore,
});

const postTaskBoardResponseSchema = z.object({
  ...responseTaskBoardCore,
});

const patchTaskBoardRequestSchema = z.object({
  ...takBoardCore,
});

const patchTaskBoardResponseSchema = z.object({
  ...responseTaskBoardCore,
});

export type PostTaskBoardPayload = z.infer<typeof postTaskBoardRequestSchema>;
export type PatchTaskBoardPayload = z.infer<typeof patchTaskBoardRequestSchema>;

export const { schemas: taskBoardSchemas, $ref } = buildJsonSchemas(
  {
    postTaskBoardRequestSchema,
    postTaskBoardResponseSchema,
    patchTaskBoardRequestSchema,
    patchTaskBoardResponseSchema,
  },
  { $id: "taskBoard" }
);
