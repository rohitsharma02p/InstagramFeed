require("dotenv").config();
const mongoose = require("mongoose");
const Comment = require("./comment.model");
const Post = require("./post.model");
const User = require("./user.model");
const Token = require("./tokens.model");

const connectDb = async () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true
    });
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
};

const models = { Comment, Post, User, Token };

module.exports = {
  connectDb,
  models
};
