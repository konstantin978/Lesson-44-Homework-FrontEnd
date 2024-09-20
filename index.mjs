import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { resolvers, schema } from './schema.mjs';
import { ruruHTML } from "ruru/server";
import cors from 'cors';

const app = express();

app.use(cors());

app.use("/graphql", createHandler({
  schema: schema,
  rootValue: resolvers,
}));

app.get("/", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  return res.end(
    ruruHTML({
      endpoint: "/graphql",
    }),
  );
});


app.listen(4005, () => {
  console.log("Server started on http://localhost:4005");
});
