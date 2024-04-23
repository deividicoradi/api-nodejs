import { FastifyInstance } from "fastify";
import { ProductsRoutes } from "./products/@ProductsRoutes";
import { UsersRoutes } from "./users/@UsersRoutes";

export const routes = async (app: FastifyInstance) => {
  // Registra as rotas de produtos e usuários
  app.register(ProductsRoutes);
  app.register(UsersRoutes);
};
