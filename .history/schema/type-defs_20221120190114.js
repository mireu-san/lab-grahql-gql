const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  type Query {
    users: [User]!
  }
`;

// https://graphql.org/learn/schema/#:%7E:text=means%20that%20the%20field%20is,those%20with%20an%20exclamation%20mark
// String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
