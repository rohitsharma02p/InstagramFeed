const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { models } = require("../models/index");

const jwtVerify = async (payload) => {
  try {
    const token = await jwt.verify(payload, process.env.JWT_SECRET);
    const user = await models.User.findById(token.sub);
    if (!user) {
      throw new UserInputError("No user found with these login credentials.");
    }
    return user;
  } catch (error) {
    throw new AuthenticationError("Your session has expired. Please sign in again.");
  }
};

async function isAuthenticated(_, __, context) {
  try {
    const req = context.req;
    let token = req.headers["authorization"];
    if (token && typeof token === "string") {
      const authenticationScheme = "Bearer ";
      if (token.startsWith(authenticationScheme)) {
        token = token.slice(authenticationScheme.length, token.length);
      }
      const user = await jwtVerify(token);
      context.user = user;
      return;
    }
    throw new AuthenticationError("You are not authenticated.");
  } catch (error) {
    throw new AuthenticationError("You are not authenticated.");
  }
}

module.exports = isAuthenticated;
