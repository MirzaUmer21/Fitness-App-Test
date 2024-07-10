const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const packagesController = require('../../contorllers/packages.controllers');
const { packageValidation } = require('../../validations/package.validation');
const { register_route } = require('../../utils/register.routes');

const routes = [
  {
    route: '/create-package',
    admin_auth_enable: true,
    middlewares: [validate(packageValidation)],
    methods: [
      {
        method: 'POST',
        handler: packagesController.create_package
      }
    ]
  },
  {
    route: '/delete-package/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'DELETE',
        handler: packagesController.delete_package
      }
    ]
  },
  {
    route: '/update-package/:id',
    admin_auth_enable: true,
    middlewares: [validate(packageValidation)],
    methods: [
      {
        method: 'PUT',
        handler: packagesController.update_package
      }
    ]
  },
  {
    route: '/get-package/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: packagesController.get_package
      }
    ]
  },
  {
    route: '/get-all-packages',
    admin_auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: packagesController.get_all_packages
      }
    ]
  }
];
register_route(router, routes);
module.exports = router;
