import { FastifyRequest } from "fastify";

export async function getUserId(request: FastifyRequest) {
  const tokenData = await request.jwtDecode<{ sub: string }>();
  const userId = tokenData?.sub;
  return userId;
}
