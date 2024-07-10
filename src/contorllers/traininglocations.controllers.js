const {
  createTrainingLocation,
  deleteTrainingLocation,
  getSingleTrainingLocation,
  getAllTrainingLocations,
  updateTrainingLocation
} = require('../services/traininglocations.service');
const ApiError = require('../utils/catchAPIError');
const catchAsync = require('../utils/catchAsync');

const create_location = catchAsync(async (req, res) => {
  const location = await createTrainingLocation(req.body);
  if (!location) {
    throw new ApiError(404, 'Location not found');
  }
  res.Response(location, 'Location created successfully', 201);
});
const delete_location = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedPackage = await deleteTrainingLocation(id);
  if (!deletedPackage) {
    throw new ApiError(404, 'Location not found');
  }
  res.Response(null, 'Location deleted successfully');
});
const update_location = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedPackage = await updateTrainingLocation(id, req.body);
  if (!updatedPackage) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(updatedPackage, 'Package updated successfully');
});
const get_location = catchAsync(async (req, res) => {
  const { id } = req.params;
  const location = await getSingleTrainingLocation(id);
  if (!location || location.isDeleted) {
    throw new ApiError(404, 'Location not found');
  }
  res.Response(location, 'Location retrieved successfully');
});
const get_all_locations = catchAsync(async (req, res) => {
  const location = await getAllTrainingLocations();
  res.Response(location, 'Location retrieved successfully');
});

module.exports = {
  create_location,
  delete_location,
  update_location,
  get_location,
  get_all_locations
};
