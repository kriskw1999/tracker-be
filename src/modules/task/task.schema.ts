import * as z from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const taskCore = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  recurrent: z.boolean({
    required_error: "Recurrent is required",
    invalid_type_error: "Recurrent must be a boolean",
  }),
  taskBoardId: z.number({
    required_error: "TaskBoardId is required",
  }),
  done: z.boolean(),
};

export const taskCoreResponse = {
  ...taskCore,
  id: z.number(),
};

const postTaskRequestSchema = z.object({
  ...taskCore,
});

const postTaskResponseSchema = z.object({
  ...taskCoreResponse,
});

const patchTaskRequestSchema = z.object({
  title: z.string().optional(),
  recurrent: z.boolean().optional(),
  done: z.boolean().optional(),
});

const patchTaskResponseSchema = z.object({
  ...taskCoreResponse,
});

export type PostTaskPayload = z.infer<typeof postTaskRequestSchema>;
export type PatchTaskPayload = z.infer<typeof patchTaskRequestSchema>;

export const { schemas: taskSchemas, $ref } = buildJsonSchemas(
  {
    postTaskRequestSchema,
    postTaskResponseSchema,
    patchTaskRequestSchema,
    patchTaskResponseSchema,
  },
  { $id: "task" }
);
