const { gql } = require("apollo-server-express");
const { applyMiddleware } = require("graphql-middleware");
const {
  generateResolversComposition
} = require("@graphql-tools/resolvers-composition");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const postSchema = require("./post");
const commentSchema = require("./comment");
const authSchema = require("./auth");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, postSchema, commentSchema, authSchema];
