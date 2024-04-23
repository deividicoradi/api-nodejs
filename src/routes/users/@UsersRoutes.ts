import { app } from "../../server";
import { CriarUsuario } from "./criar-usuario";
import { DeletarUsuario } from "./deletar-usuario";
import { EditarUsuario } from "./editar-usuario";
import { ListarUsuarios } from "./listar-usuarios";

export const UsersRoutes = async () => {
  app.register(CriarUsuario);
  app.register(ListarUsuarios);
  app.register(EditarUsuario);
  app.register(DeletarUsuario);
};
