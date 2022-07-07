import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { execute, GraphQLSchema, subscribe } from "graphql";
import { createServer, Server } from "http";
import { Request, Response } from "express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { PubSub } from "graphql-subscriptions";

class GraphQLServer {
  // Properties
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = 3026;
  private schema!: GraphQLSchema;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error("Need add GraphQL Schema to work with GraphQL API");
    }
    this.schema = schema;
    this.init();
  }

  private init() {
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  private configExpress() {
    this.app = express();

    this.app.use(compression());

    this.httpServer = createServer(this.app);
  }

  private async configApolloServerExpress() {
    const pubsub = new PubSub();
    const apolloServer = new ApolloServer({
      schema: this.schema, // Add combination schema and resolvers to working done
      introspection: true, // To use to generate doc from schema
      context: async () => {
        return {
          pubsub,
        };
      },
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: this.app, cors: true });

    SubscriptionServer.create(
      {
        schema: this.schema,
        execute,
        subscribe,
        onConnect: () => ({ pubsub, user: "Anartz" }),
      },
      { server: this.httpServer, path: apolloServer.graphqlPath }
    );
  }

  private configRoutes() {
    this.app.get("/hello", (_: Request, res: Response) => {
      res.send("Bienvenid@s al primer proyecto");
    });

    this.app.get("/", (_: Request, res: Response) => {
      res.redirect("/graphql");
    });
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;
