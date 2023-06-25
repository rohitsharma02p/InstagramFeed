const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    posts(limit: Int, offset: Int): [Post]
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(caption: String, imageUrl: String, author: String): Post
    updatePost(id: ID!, caption: String): Post
    deletePost(id: ID!): Boolean
    likePost(id: ID!): Boolean
    unlikePost(id: ID!): Boolean
  }

  type Post {
    id: ID!
    caption: String
    imageUrl: String
    author: String
    likes: Int
    comments: [Comment]
  }
`;
