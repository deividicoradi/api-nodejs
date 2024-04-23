import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeletarUsuario = async (app: FastifyInstance) => {
  app.delete('/users/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params; // Captura o ID do usuário da URL

      // Verifica se o usuário existe no banco de dados
      const usuarioExistente = await prisma.user.findUnique({
        where: {
          id: parseInt(id) // Converte o ID para um número inteiro
        }
      });

      // Se o usuário não existir, retorna um erro 404 Not Found
      if (!usuarioExistente) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }

      // Deleta o usuário do banco de dados
      await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      });

      // Retorna uma mensagem de confirmação com o status 200 OK
      return reply.status(200).send({ message: `Usuário ID ${id} deletado com sucesso` });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      // Retorna um erro 500 Internal Server Error em caso de falha ao deletar o usuário
      return reply.status(500).send({ message: 'Erro ao deletar usuário' });
    }
  });
};
