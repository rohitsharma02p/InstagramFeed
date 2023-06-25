const authenticate = require("../middlewares/authenticate.js");

const { models } = require("../models/index.js");

/**
 * Context function from Apollo Server
 */
const setContext = async ({ req }) => {
  if (req) {
    const context = {
      models: {
        ...models
      },
      req
    };

    return context;
  }
};

module.exports = {
  setContext
};
