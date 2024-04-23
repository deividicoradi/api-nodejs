import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeletarProduto = async (app: FastifyInstance) => {
  // Rota para deletar um produto existente
  app.delete('/products/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params; // Captura o ID do produto da URL

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

      // Deleta o produto do banco de dados
      await prisma.product.delete({
        where: {
          id: parseInt(id)
        }
      });

      // Retorna uma mensagem indicando que o produto foi deletado com sucesso
      return reply.status(200).send({ message: `Produto com ID ${id} foi deletado com sucesso` });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return reply.status(500).send({ message: 'Erro ao deletar produto' });
    }
  });
};
