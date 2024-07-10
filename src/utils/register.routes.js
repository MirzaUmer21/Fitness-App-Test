const {
  authMiddleware,
  adminAuthMiddleware
} = require('../middleware/authentication');

const register_route = (router, routes = []) => {
  routes.forEach(
    ({
      route,
      auth_enable = false,
      admin_auth_enable = false,
      middlewares = [],
      methods = []
    }) => {
      if (auth_enable) {
        middlewares.unshift(authMiddleware);
      } else if (admin_auth_enable) {
        middlewares.unshift(adminAuthMiddleware);
      }

      methods.forEach(({ method, handler }) => {
        if (!method || !handler) {
          return;
        }
        router[method.toLowerCase()](route, ...middlewares, handler);
      });
    }
  );
};

module.exports = {
  register_route
};
