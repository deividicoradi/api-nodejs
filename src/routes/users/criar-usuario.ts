import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Para hash de senha
import jwt from 'jsonwebtoken'; // Para geração de tokens JWT

// Crie uma instância do Prisma Client
const prisma = new PrismaClient();

// Interface para representar os dados do corpo da requisição de criação de usuário
interface NovoUsuarioRequest {
  username: string;
  email: string;
  password: string;
}

// Endpoint para criar um novo usuário e gerar autenticação
export const CriarUsuario = async (app: FastifyInstance) => {
  app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const requestBody = request.body as NovoUsuarioRequest;

      const { username, email, password } = requestBody;

      // Verifique se o nome de usuário e o e-mail já existem no banco de dados
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email },
          ],
        },
      });

      if (existingUser) {
        return reply.status(400).send({ message: 'Nome de usuário ou e-mail já em uso' });
      }

      // Hash a senha fornecida
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crie um novo usuário no banco de dados usando o Prisma
      const novoUsuario = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Gere um token JWT
      const token = jwt.sign({ userId: novoUsuario.id }, 'secreto', { expiresIn: '1h' });

      // Retorne o token JWT para o cliente
      return reply.status(201).send({ token });
    } catch (error) {
      console.error('Erro ao criar usuário e gerar autenticação:', error);
      // Retorna um erro 500 Internal Server Error em caso de falha na criação do usuário
      return reply.status(500).send({ message: 'Erro ao criar usuário e gerar autenticação' });
    }
  });
};
