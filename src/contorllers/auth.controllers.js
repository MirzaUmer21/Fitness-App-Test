const {
  createAdmin,
  updateAdminByUserId
} = require('../services/admin.service');
const {
  validateUserCredentials,
  verifyUser
} = require('../services/auth.service');
const {
  createCustomer,
  getCustomerByUserId,
  updateCustomerByUserId
} = require('../services/customer.service');
const {
  generateAuthTokens,
  deleteTokenByUser,
  generateRefreshAccessToken
} = require('../services/token.service');
const { createUser, getUserByUserId } = require('../services/user.service');
const ApiError = require('../utils/catchAPIError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body, 'customer');
  const { name, email, password, ...customerData } = req.body;
  const customer = await createCustomer({
    ...customerData,
    ...{ user_id: user._id }
  });
  const tokens = await generateAuthTokens(user._id);
  return res.Response({ user, tokens });
});
const register_admin = catchAsync(async (req, res) => {
  const user = await createUser(req.body, 'admin');
  const { name, email, password, ...customerData } = req.body;
  const customer = await createAdmin({
    ...customerData,
    ...{ user_id: user._id }
  });
  const tokens = await generateAuthTokens(user._id);
  return res.Response({ user, tokens });
});
const login = catchAsync(async (req, res) => {
  const user = await validateUserCredentials(req.body);
  const tokens = await generateAuthTokens(user._id);
  return res.Response({ user, tokens });
});
const logout = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const result = await deleteTokenByUser(user_id);
  if (result) {
    return res.Response(null, 'Logged Out Successfully', 200);
  }
});
const get_profile = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const user = await getUserByUserId(user_id);
  if (!user) {
    throw new ApiError(400, 'No User Found');
  }
  const customer = await getCustomerByUserId(user_id);
  if (!customer) {
    throw new ApiError(400, 'No Record Found');
  }
  return res.Response(customer);
});
const update_profile = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const user = await getUserByUserId(user_id);
  if (!user) {
    throw new ApiError(400, 'No User Found');
  }
  const customer = await updateCustomerByUserId(user_id, req.body);
  if (!customer) {
    throw new ApiError(400, 'No Record Found');
  }
  return res.Response(customer, 'Customer Updated');
});
const update_admin_profile = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const user = await getUserByUserId(user_id);
  if (!user) {
    throw new ApiError(400, 'No User Found');
  }
  const admin = await updateAdminByUserId(user_id, req.body);
  if (!admin) {
    throw new ApiError(400, 'No Record Found');
  }
  return res.Response(admin, 'Admin Updated');
});
const refresh_user_token = catchAsync(async (req, res) => {
  const { user_id, refresh_token } = req.body;
  const result = await generateRefreshAccessToken(refresh_token, user_id);
  const user = await getUserByUserId(user_id);
  const newTokens = await generateAuthTokens(user._id);
  if (result) {
    return res.Response({ newTokens });
  }
});
const verify_user = catchAsync(async (req, res) => {
  const user_id = req.params.id;
  const { otp } = req.body;
  if (!user_id) {
    throw new ApiError(400, 'Invalid User');
  }
  const result = await verifyUser(user_id, otp);

  if (result) {
    return res.Response(null, 'Success');
  }
  throw new ApiError(400, 'Invalid OTP');
});
module.exports = {
  register,
  login,
  logout,
  refresh_user_token,
  get_profile,
  verify_user,
  register_admin,
  update_profile,
  update_admin_profile
};
