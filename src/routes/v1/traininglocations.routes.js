const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const locationsController = require('../../contorllers/traininglocations.controllers');
const { register_route } = require('../../utils/register.routes');
const {
  trainingLocationValidation
} = require('../../validations/traininglocations.validations');

const routes = [
  {
    route: '/create-location',
    admin_auth_enable: true,
    middlewares: [validate(trainingLocationValidation)],
    methods: [
      {
        method: 'POST',
        handler: locationsController.create_location
      }
    ]
  },
  {
    route: '/delete-location/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'DELETE',
        handler: locationsController.delete_location
      }
    ]
  },
  {
    route: '/update-location/:id',
    admin_auth_enable: true,
    middlewares: [validate(trainingLocationValidation)],

    methods: [
      {
        method: 'PUT',
        handler: locationsController.update_location
      }
    ]
  },
  {
    route: '/get-location/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: locationsController.get_location
      }
    ]
  },
  {
    route: '/get-all-locations',
    admin_auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: locationsController.get_all_locations
      }
    ]
  }
];
register_route(router, routes);
module.exports = router;
