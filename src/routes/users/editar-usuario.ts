import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para representar os dados do corpo da requisição
interface EditarUsuarioRequest {
  username?: string;
  email?: string;
  password?: string;
}

export const EditarUsuario = async (app: FastifyInstance) => {
  app.put('/users/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params; // Captura o ID do usuário da URL
      const { username, email, password } = request.body as EditarUsuarioRequest; // Faz uma asserção de tipo para informar ao TypeScript sobre a estrutura dos dados no corpo da requisição

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

      // Atualiza o usuário com os novos dados
      const usuarioAtualizado = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          username,
          email,
          password
        }
      });

      // Retorna o usuário atualizado com o status 200 OK
      return reply.status(200).send(usuarioAtualizado);
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      // Retorna um erro 500 Internal Server Error em caso de falha ao editar o usuário
      return reply.status(500).send({ message: 'Erro ao editar usuário' });
    }
  });
};
