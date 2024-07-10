const { Customer } = require('../models');

const createCustomer = async userBody => {
  return await Customer.create(userBody);
};
const getCustomerByUserId = async user_id => {
  const user = await Customer.findOne({ user_id: user_id });
  return user;
};
const updateCustomerByUserId = async (user_id, data) => {
  const user = await Customer.findOneAndUpdate(
    { user_id: user_id },
    { $set: data },
    { new: true, runValidators: true }
  );
  return user;
};
module.exports = {
  createCustomer,
  getCustomerByUserId,
  updateCustomerByUserId
};
