import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Para hash de senha
import jwt from 'jsonwebtoken'; // Para geração de tokens JWT

// Crie uma instância do Prisma Client
const prisma = new PrismaClient();

// Interface para representar os dados do corpo da requisição de login
interface LoginRequest {
  username: string;
  password: string;
}

// Endpoint para login e gerar autenticação
export const Login = async (app: FastifyInstance) => {
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const requestBody = request.body as LoginRequest;

      const { username, password } = requestBody;

      // Consulte o usuário no banco de dados pelo nome de usuário
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      // Verifique se o usuário existe e se a senha está correta
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return reply.status(401).send({ message: 'Credenciais inválidas' });
      }

      // Gere um token JWT
      const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

      // Retorne o token JWT para o cliente
      return reply.status(200).send({ token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return reply.status(500).send({ message: 'Erro ao fazer login' });
    }
  });
};
