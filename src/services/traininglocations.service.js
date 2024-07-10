const { TrainingLocation } = require('../models');

const createTrainingLocation = async body => {
  return await TrainingLocation.create(body);
};
const deleteTrainingLocation = async id => {
  const package = await TrainingLocation.findOneAndUpdate(
    { _id: id },
    { $set: { isDeleted: true } },
    { new: true }
  );
  return package;
};
const updateTrainingLocation = async (id, body) => {
  return await TrainingLocation.findByIdAndUpdate(
    { _id: id },
    { $set: body },
    {
      new: true,
      runValidators: true
    }
  );
};
const getSingleTrainingLocation = async id => {
  return await TrainingLocation.findById(id);
};
const getAllTrainingLocations = async () => {
  return await TrainingLocation.find({ isDeleted: false });
};
module.exports = {
  createTrainingLocation,
  deleteTrainingLocation,
  updateTrainingLocation,
  getSingleTrainingLocation,
  getAllTrainingLocations
};
