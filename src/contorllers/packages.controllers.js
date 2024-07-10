const {
  createPackage,
  deletePackage,
  updatePackage,
  getSinglePackage,
  getAllPackages
} = require('../services/packages.service');
const ApiError = require('../utils/catchAPIError');
const catchAsync = require('../utils/catchAsync');

const create_package = catchAsync(async (req, res) => {
  const package = await createPackage(req.body);
  if (!package) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(package, 'Package created successfully', 201);
});
const delete_package = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedPackage = await deletePackage(id);
  if (!deletedPackage) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(null, 'Package deleted successfully');
});
const update_package = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedPackage = await updatePackage(id, req.body);
  if (!updatedPackage) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(updatedPackage, 'Package updated successfully');
});
const get_package = catchAsync(async (req, res) => {
  const { id } = req.params;
  const package = await getSinglePackage(id);
  if (!package || package.isDeleted) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(package, 'Package retrieved successfully');
});
const get_all_packages = catchAsync(async (req, res) => {
  const packages = await getAllPackages();
  res.Response(packages, 'Packages retrieved successfully');
});

module.exports = {
  create_package,
  delete_package,
  update_package,
  get_package,
  get_all_packages
};
