require("dotenv").config();
const { UserInputError } = require("apollo-server-express");
const moment = require("moment");
const { models } = require("../models/index");
const { tokenTypes } = require("../config/tokens");
const jwt = require("jsonwebtoken");

const generateToken = (
  userId,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await models.Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    process.env.JWT_REFRESH_EXPIRATION_DAYS,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await models.Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH
  });
  if (!refreshTokenDoc) {
    throw new UserInputError("User not found");
  }
  await refreshTokenDoc.deleteOne();
};

module.exports = {
  generateAuthTokens,
  logout
};
