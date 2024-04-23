import { app } from "../../server";
import { CriarProduto } from "./criar-produto";
import { EditarProduto } from "./editar-produto";
import { ListarProdutos } from "./listar-produtos";
import { DeletarProduto } from "./deletar-produto";

export const ProductsRoutes = async () => {
  app.register(CriarProduto)
  app.register(EditarProduto)
  app.register(ListarProdutos)
  app.register(DeletarProduto)
};
