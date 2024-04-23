import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para representar os dados do corpo da requisição
interface NovoUsuarioRequest {
  username: string;
  email: string;
  password: string;
}

export const CriarUsuario = async (app: FastifyInstance) => {
  app.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { username, email, password } = request.body as NovoUsuarioRequest; // Faz uma asserção de tipo para informar ao TypeScript sobre a estrutura dos dados no corpo da requisição

      // Cria um novo usuário no banco de dados usando o Prisma
      const novoUsuario = await prisma.user.create({
        data: {
          username,
          email,
          password
        }
      });

      // Retorna o usuário recém-criado com o status 201 Created
      return reply.status(201).send(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Retorna um erro 500 Internal Server Error em caso de falha na criação do usuário
      return reply.status(500).send({ message: 'Erro ao criar usuário' });
    }
  });
};
