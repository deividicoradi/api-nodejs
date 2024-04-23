import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const EditarProduto = async (app: FastifyInstance) => {
  // Rota para editar um produto existente
  app.put('/products/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params; // Captura o ID do produto da URL
      const { name, description, price } = request.body as { name: string, description: string, price: number }; // Faz uma asserção de tipo para informar ao TypeScript sobre a estrutura dos dados no corpo da requisição

      // Verifica se o produto existe no banco de dados
      const produtoExistente = await prisma.product.findUnique({
        where: {
          id: parseInt(id) // Converte o ID para um número inteiro
        }
      });

      // Se o produto não existir, retorna um erro 404 Not Found
      if (!produtoExistente) {
        return reply.status(404).send({ message: 'Produto não encontrado' });
      }

      // Atualiza o produto com os novos dados
      const produtoAtualizado = await prisma.product.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name,
          description,
          price
        }
      });

      // Retorna o produto atualizado com o status 200 OK
      return reply.status(200).send(produtoAtualizado);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      return reply.status(500).send({ message: 'Erro ao editar produto' });
    }
  });
};
