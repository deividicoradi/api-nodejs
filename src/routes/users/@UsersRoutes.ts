import { FastifyInstance } from "fastify";
import { CriarUsuario } from "./criar-usuario";
import { DeletarUsuario } from "./deletar-usuario";
import { EditarUsuario } from "./editar-usuario";
import { ListarUsuarios } from "./listar-usuarios";
import { Login } from "./login-usuario";

export const UsersRoutes = async (app: FastifyInstance) => {
  app.register(CriarUsuario);
  app.register(ListarUsuarios);
  app.register(EditarUsuario);
  app.register(DeletarUsuario);
  app.register(Login);
};
