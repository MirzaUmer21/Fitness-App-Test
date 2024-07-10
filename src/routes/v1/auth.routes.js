const express = require('express');
const router = express.Router();
const { register_route } = require('../../utils/register.routes');
const validate = require('../../middleware/validate');
const authController = require('../../contorllers/auth.controllers');
const {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation,
  registerAdminValidation
} = require('../../validations/auth.validations');

const routes = [
  {
    route: '/register',
    middlewares: [validate(registerUserValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.register
      }
    ]
  },
  {
    route: '/register-admin',
    middlewares: [validate(registerAdminValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.register_admin
      }
    ]
  },
  {
    route: '/login',
    middlewares: [validate(loginUserValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.login
      }
    ]
  },
  {
    route: '/get-profile/:id',
    auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: authController.get_profile
      }
    ]
  },
  {
    route: '/update-profile/:id',
    auth_enable: true,
    methods: [
      {
        method: 'PUT',
        handler: authController.update_profile
      }
    ]
  },
  {
    route: '/get-admin-profile/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'GET',
        handler: authController.get_profile
      }
    ]
  },
  {
    route: '/update-admin-profile/:id',
    admin_auth_enable: true,
    methods: [
      {
        method: 'PUT',
        handler: authController.update_admin_profile
      }
    ]
  },
  {
    route: '/refresh-token',
    middlewares: [validate(refreshTokenValidation)],
    methods: [
      {
        method: 'POST',
        handler: authController.refresh_user_token
      }
    ]
  },
  {
    route: '/verify-user/:id',
    methods: [
      {
        method: 'POST',
        handler: authController.verify_user
      }
    ]
  },
  {
    route: '/logout/:id',
    methods: [
      {
        method: 'GET',
        handler: authController.logout
      }
    ]
  }
];

register_route(router, routes);
module.exports = router;
