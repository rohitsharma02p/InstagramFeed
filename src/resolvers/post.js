const { combineResolvers } = require("graphql-resolvers");
const { UserInputError } = require("apollo-server-express");
const { ObjectId } = require("mongoose").Types;

const isAuthenticated = require("../middlewares/authenticate");
const { isPostOwner } = require("../services/user.services");

module.exports = {
  Query: {
    posts: combineResolvers(
      isAuthenticated,
      async (_, { limit, offset }, { models }) => {
        const posts = await models.Post.find()
          .sort({ _id: -1 })
          .skip(offset || 0)
          .limit(limit || 10);
        return posts;
      }
    ),
    post: combineResolvers(isAuthenticated, async (_, { id }, { models }) => {
      if (!ObjectId.isValid(id)) {
        throw new UserInputError("Invalid post ID.");
      }

      const post = await models.Post.findById(id);

      if (!post) {
        throw new UserInputError("Post not found.");
      }

      return post;
    })
  },
  Mutation: {
    createPost: combineResolvers(
      isAuthenticated,
      (_, { caption, imageUrl, author }, { models, user }) => {
        if (!caption) {
          throw new UserInputError("Caption is required.");
        }
        if (!imageUrl) {
          throw new UserInputError("Image URL is required.");
        }
        if (!author) {
          throw new UserInputError("Author is required.");
        }

        const post = new models.Post({
          caption,
          imageUrl,
          author,
          authorId: user.id
        });
        return post.save();
      }
    ),
    updatePost: combineResolvers(
      isAuthenticated,
      isPostOwner,
      async (_, { id, caption }, { models }) => {
        if (!caption) {
          throw new UserInputError("Caption is required.");
        }

        const updatedPost = await models.Post.findByIdAndUpdate(
          id,
          { caption },
          { new: true }
        );

        if (!updatedPost) {
          throw new UserInputError("Post not found.");
        }

        return updatedPost;
      }
    ),
    deletePost: combineResolvers(
      isAuthenticated,
      isPostOwner,
      (_, { id }, { models }) => {
        const deletedPost = models.Post.findByIdAndDelete(id);
        if (!deletedPost) {
          throw new UserInputError("Post not found.");
        }
        return true;
      }
    ),
    addComment: combineResolvers(
      isAuthenticated,
      async (_, { postId, text }, { models }) => {
        if (!postId) {
          throw new UserInputError("Post ID is required.");
        }
        if (!text) {
          throw new UserInputError("Text is required.");
        }

        const comment = new models.Comment({ postId, text });
        return comment.save();
      }
    ),
    likePost: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models }) => {
        if (!ObjectId.isValid(id)) {
          throw new UserInputError("Invalid post ID.");
        }

        const post = await models.Post.findById(id);
        if (!post) {
          throw new UserInputError("Post not found.");
        }

        post.likes = (post.likes ?? 0) + 1;
        await post.save();
        return true;
      }
    ),
    unlikePost: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models }) => {
        if (!ObjectId.isValid(id)) {
          throw new UserInputError("Invalid post ID.");
        }

        const post = await models.Post.findById(id);
        if (!post) {
          throw new UserInputError("Post not found.");
        }

        if (post.likes > 0) {
          post.likes -= 1;
          await post.save();
          return true;
        }
        return false;
      }
    )
  }
};
