const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    email: String
  }

  type Mutation {
    register( email: String! password: String!): User
    login(email: String! password: String!): AuthPayload
  }

  type AuthPayload {
    tokens: Tokens
    user: User
  }
  
  type Tokens {
    access: Token
    refresh: Token
  }
  
  type Token {
    token: String
    expires: String
  }
  
`;
