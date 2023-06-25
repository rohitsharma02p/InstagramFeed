const { ForbiddenError } = require("apollo-server-express");
const isPostOwner = async (_, { id }, { models, user }) => {
  const post = await models.Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId.toString() !== user.id) {
    throw new ForbiddenError("User is not authorized to modify this post");
  }
};

module.exports = { isPostOwner };
