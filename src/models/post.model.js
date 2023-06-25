const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  caption: String,
  imageUrl: String,
  likes: {
    type: Number,
    default: 0
  },
  author: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
