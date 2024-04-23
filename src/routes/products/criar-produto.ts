import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CriarProduto = async (app: FastifyInstance) => {
  // Rota para criar um novo produto
  app.post('/products', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Faz uma asserção de tipo para informar ao TypeScript o tipo dos dados contidos em request.body
      const { name, description, price } = request.body as { name: string, description: string, price: number };

      // Agora TypeScript sabe que description é uma string
      // Restante do código continua igual
      const novoProduto = await prisma.product.create({
        data: {
          name,
          description,
          price
        }
      });
      return reply.status(201).send(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return reply.status(500).send({ message: 'Erro ao criar produto' });
    }
  });
};
