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

// String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
