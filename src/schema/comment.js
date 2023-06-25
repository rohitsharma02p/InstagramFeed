const { gql } = require("apollo-server-express");

module.exports = gql`
  type Mutation {
    addComment(postId: ID!, text: String): Comment
  }

  type Comment {
    id: ID!
    postId: ID!
    text: String
  }
`;


