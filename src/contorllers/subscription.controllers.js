const { updatePackage } = require('../services/packages.service');
const {
  createSubscription,
  getSingleSubscription,
  getAllSubscriptions
} = require('../services/subscriptions.service');
const ApiError = require('../utils/catchAPIError');
const catchAsync = require('../utils/catchAsync');

const create_subscription = catchAsync(async (req, res) => {
  const package = await createSubscription(req.body);
  if (!package) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(package, 'Subscription created successfully', 201);
});
const update_subscription = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedPackage = await updatePackage(id, req.body);
  if (!updatedPackage) {
    throw new ApiError(404, 'Subscription not found');
  }
  res.Response(updatedPackage, 'Subscription updated successfully');
});

const get_subscription = catchAsync(async (req, res) => {
  const { id } = req.params;
  const package = await getSingleSubscription(id);
  if (!package) {
    throw new ApiError(404, 'Package not found');
  }
  res.Response(package, 'Subscription retrieved successfully');
});

const get_all_subscriptions = catchAsync(async (req, res) => {
  const packages = await getAllSubscriptions();
  res.Response(packages, 'Subscription retrieved successfully');
});

module.exports = {
  create_subscription,
  update_subscription,
  get_subscription,
  get_all_subscriptions
};
