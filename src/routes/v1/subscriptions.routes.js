const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const subscriptionsController = require('../../contorllers/subscription.controllers');
const { register_route } = require('../../utils/register.routes');
const {
  subscriptionValidation
} = require('../../validations/subscription.validation');

const routes = [
  {
    route: '/subscribe-package',
    auth_enable: true,
    middlewares: [validate(subscriptionValidation)],
    methods: [
      {
        method: 'POST',
        handler: subscriptionsController.create_subscription
      }
    ]
  },
  {
    route: '/update-subscription/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'PUT',
        handler: subscriptionsController.update_subscription
      }
    ]
  },
  {
    route: '/get-subscription/:id',
    auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: subscriptionsController.get_subscription
      }
    ]
  },
  {
    route: '/get-all-user-subscription/:id',
    auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: subscriptionsController.get_subscription
      }
    ]
  },
  {
    route: '/get-all-subscription',
    auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: subscriptionsController.get_all_subscriptions
      }
    ]
  }
];
register_route(router, routes);
module.exports = router;
