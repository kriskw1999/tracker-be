import * as z from "zod";
import {buildJsonSchemas} from "fastify-zod";

const bookCore = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
};

const responseBookCore = {
  id: z.number(),
  ...bookCore,
};

const postBookRequestSchema = z.object({
  ...bookCore,
});

const postBookResponseSchema = z.object({
  ...responseBookCore,
});

const patchBookRequestSchema = z.object({
  ...bookCore,
});

const patchBookResponseSchema = z.object({
  ...responseBookCore,
});

export type PostBookPayload = z.infer<typeof postBookRequestSchema>;
export type PatchBookPayload = z.infer<typeof patchBookRequestSchema>;

export const { schemas: bookSchemas, $ref } = buildJsonSchemas(
  {
    postBookRequestSchema,
    postBookResponseSchema,
    patchBookRequestSchema,
    patchBookResponseSchema,
  },
  { $id: "book" }
);
