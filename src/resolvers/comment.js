const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    addComment: async (_, { postId, text }, { models }) => {
      if (!postId || !text) {
        throw new UserInputError("postId and text are required.");
      }

      const comment = new models.Comment({ postId, text });
      return comment.save();
    }
  },
  Post: {
    comments: async (parent, _, { models }) => {
      const postId = parent.id;
      if (!postId) {
        throw new UserInputError("postId is required.");
      }
      const comments = await models.Comment.find({ postId });
      return comments;
    }
  }
};
