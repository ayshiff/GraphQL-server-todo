import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./schemas/Task";

const SERVER_PORT: number = 3000;

// It will lauch the mongodb DB instance
import "./config";

/**
 * Here we instantiate the apollo server and express server as middleware
 */
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(
    `Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
  )
);

export default app;
