import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const CriaProduto = async (app: FastifyInstance) => {
  app.get('/products', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send([{ id: 1, name: "Bola" }, { id: 2, name: "Boneco" }])
  })
};
