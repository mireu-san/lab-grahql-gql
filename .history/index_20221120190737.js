const { ApolloServer } = require("apollo-server");
const {} = require("./schema/type-defs");
const { resolvers } = require("./schema/type-defs");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
  console.log(`Your API is running AT: ${url} :)`);
});
