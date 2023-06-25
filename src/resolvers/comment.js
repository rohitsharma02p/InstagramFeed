const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    addComment: (_, { postId, text }, { models }) => {
      const comment = new models.Comment({ postId, text });
      return comment.save();
    },
  },
  Post: {
    comments: async (parent, _, { models }) => {
      const postId = parent.id;
      const comments = await models.Comment.find({ postId });
      return comments;
    },
  },
};
