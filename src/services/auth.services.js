const { models } = require("../models/index");


const getUserByEmail = async (email) => {
  return models.User.findOne({ email });
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new UserInputError("Incorrect email or password");
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword
};
