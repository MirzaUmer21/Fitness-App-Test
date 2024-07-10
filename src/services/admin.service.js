const { Admin } = require('../models');

const createAdmin = async body => {
  return await Admin.create(body);
};
const updateAdminByUserId = async (user_id, data) => {
  const user = await Admin.findOneAndUpdate(
    { user_id: user_id },
    { $set: data },
    { new: true, runValidators: true }
  );
  return user;
};

module.exports = { createAdmin, updateAdminByUserId };
