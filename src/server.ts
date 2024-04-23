import fastify from "fastify";
import { routes } from "./routes/routes";
import cors from "@fastify/cors";

export const app = fastify()
app.register(routes)
app.register(cors, {})

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
  }

  console.log('Server rodando na porta 3000!');
});
