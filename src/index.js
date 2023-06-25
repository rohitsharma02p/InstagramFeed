require("dotenv").config();
const { ApolloServer,AuthenticationError } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");
const app = require("./app");
const schema = require("./schema");
const resolvers = require("./resolvers");
const { connectDb } = require("./models");
const {setContext} = require("./utils/setContext")

async function startServer() {
  const server = new ApolloServer({
    introspection: true,
    typeDefs: schema,
    resolvers,
    context: setContext,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  });

  await server.start();

  await server.applyMiddleware({ app, path: "/graphql" });

  connectDb().then(async () => {
    const port = process.env.PORT || 4000;
    app.listen({ port }, () => {
      console.log(
        `Server running at http://localhost:${port}${server.graphqlPath}`
      );
    });
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
