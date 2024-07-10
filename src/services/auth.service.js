const { User } = require('../models');
const ApiError = require('../utils/catchAPIError');
const { getUserByEmail } = require('./user.service');

const validateUserCredentials = async user => {
  const validUser = await getUserByEmail(user.email);
  if (validUser && (await validUser.isPasswordMatch(user.password))) {
    return validUser;
  }
  throw new ApiError(400, 'Wrong Credentials');
};
const validateAndGenerateRefreshToken = async user => {
  const validUser = await getUserByEmail(user.email);

  if (validUser && (await validUser.isPasswordMatch(user.password))) {
    return validUser;
  }
  throw new ApiError(400, 'Wrong Credentials');
};
const verifyUser = async (user_id, OTP) => {
  const user = await User.findOneAndUpdate(
    { _id: user_id, OTP },
    { $unset: { OTP: '' }, $set: { isEmailVerified: true } },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, 'User not found or OTP is incorrect');
  }
  return user;
};
module.exports = {
  validateUserCredentials,
  validateAndGenerateRefreshToken,
  verifyUser
};
