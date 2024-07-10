const { Subscription } = require('../models');

const createSubscription = async body => {
  return await Subscription.create(body);
};

const updateSubscription = async (id, body) => {
  const { Subscription_name, Subscription_description, price } = body;

  return await Subscription.findByIdAndUpdate(
    id,
    { Subscription_name, Subscription_description, price },
    {
      new: true,
      runValidators: true
    }
  );
};
const getSingleSubscription = async id => {
  return await Subscription.findById(id);
};
const getAllSubscriptions = async () => {
  return await Subscription.find();
};
module.exports = {
  createSubscription,
  updateSubscription,
  getSingleSubscription,
  getAllSubscriptions
};
