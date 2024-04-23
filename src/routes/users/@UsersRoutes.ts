import { app } from "../../server";
import { CriaUsuario } from "./cria-usuario";

export const UsersRoutes = async () => {
  app.register(CriaUsuario)
};
