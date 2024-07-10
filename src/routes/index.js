const v1_routes = app => {
  app.use('/v1/packages', require('./v1/packages.routes'));
  app.use('/v1/authentication', require('./v1/auth.routes'));
  app.use('/v1/subscriptions', require('./v1/subscriptions.routes'));
  app.use('/v1/locations', require('./v1/traininglocations.routes'));
};

module.exports = { v1_routes };
