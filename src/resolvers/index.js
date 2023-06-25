const postResolvers = require('./post');
const commentResolvers = require('./comment');
const authResolvers = require('./auth');

module.exports = [
  postResolvers,
  commentResolvers,
  authResolvers
];
