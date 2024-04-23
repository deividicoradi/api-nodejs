import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const CriaUsuario = async (app: FastifyInstance) => {
  app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send('Usuário criado com sucesso!')
  })
};
