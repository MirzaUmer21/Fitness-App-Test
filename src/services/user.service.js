const { User } = require('../models');
const ApiError = require('../utils/catchAPIError');
const { generateOTP } = require('../utils/commonFunctions');

const createUser = async (userBody, role) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(400, 'Email already taken');
  }
  const otp = generateOTP();
  return User.create({
    ...userBody,
    role: role,
    isEmailVerified: false,
    OTP: otp
  });
};
const getUserByEmail = async email => {
  return await User.findOne({ email });
};
const getUserByUserId = async user_id => {
  const user = await User.findOne({ _id: user_id });
  return user;
};
module.exports = { createUser, getUserByEmail, getUserByUserId };
