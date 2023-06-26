const { UserInputError } = require("apollo-server-express");
const authService = require("../services/auth.services");
const tokenService = require("../services/token.services");

module.exports = {
  Mutation: {
    register: async (_, args, { models }) => {
      const { email, password } = args;

      if (await models.User.isEmailTaken(email)) {
        throw new UserInputError("Email already taken");
      }

      return models.User.create({ email, password });
    },
    login: async (_, args, { models }) => {
      const { email, password } = args;
      const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
      );
      const tokens = await tokenService.generateAuthTokens(user);
      return { user, tokens };
    },
    logout: async (_, args, { models }) => {
      const { refreshToken } = args;
      if (!refreshToken) {
        throw new UserInputError("Refresh token is required.");
      }
      await tokenService.logout(refreshToken);
      return { success: true };
    }
  }
};
