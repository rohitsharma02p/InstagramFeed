const ApiError = require("../utils/apiError");
const authService = require("../services/auth.services");
const tokenService = require("../services/token.services");

module.exports = {
  Mutation: {
    register: async (_, args, { models }) => {
      const { email, password } = args;

      if (await models.User.isEmailTaken(email)) {
        throw new ApiError(400, "Email already taken");
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
    }
  }
};
