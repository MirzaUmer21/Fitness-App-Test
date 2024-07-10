const { Package } = require('../models');

const createPackage = async body => {
  return await Package.create(body);
};
const deletePackage = async id => {
  const package = await Package.findOneAndUpdate(
    { _id: id },
    { $set: { isDeleted: true } },
    { new: true }
  );
  return package;
};
const updatePackage = async (id, body) => {
  return await Package.findByIdAndUpdate(
    { _id: id },
    { $set: body },
    {
      new: true,
      runValidators: true
    }
  );
};
const getSinglePackage = async id => {
  return await Package.findById(id);
};
const getAllPackages = async () => {
  return await Package.find({ isDeleted: false });
};
module.exports = {
  createPackage,
  deletePackage,
  updatePackage,
  getSinglePackage,
  getAllPackages
};
