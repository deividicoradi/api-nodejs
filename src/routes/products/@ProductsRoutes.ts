import { app } from "../../server";
import { CriaProduto } from "./cria-produto";

export const ProductsRoutes = async () => {
  app.register(CriaProduto)
};
