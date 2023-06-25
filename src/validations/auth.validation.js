const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  input: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password)
  }),
};

const login = {
  input: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login
};
