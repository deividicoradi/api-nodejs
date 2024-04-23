import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ListarProdutos = async (app: FastifyInstance) => {
  // Rota para listar todos os produtos
  app.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Consulta todos os produtos no banco de dados
      const produtos = await prisma.product.findMany();

      // Retorna a lista de produtos com o status 200 OK
      return reply.status(200).send(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return reply.status(500).send({ message: 'Erro ao listar produtos' });
    }
  });
};
