import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ListarUsuarios = async (app: FastifyInstance) => {
  app.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Obtém todos os usuários do banco de dados usando o Prisma
      const usuarios = await prisma.user.findMany();

      // Retorna a lista de usuários com o status 200 OK
      return reply.status(200).send(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      // Retorna um erro 500 Internal Server Error em caso de falha ao listar os usuários
      return reply.status(500).send({ message: 'Erro ao listar usuários' });
    }
  });
};
