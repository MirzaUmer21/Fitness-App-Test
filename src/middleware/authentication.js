const jwt = require('jsonwebtoken');
const config = require('../config');
const { getUserByUserId } = require('../services/user.service');

const authorizeUser = async (req, res, next, role) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = await jwt.verify(token, config.jwt.secret);
    const user = await getUserByUserId(decoded.sub);
    if (user && user.role === role) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
const authMiddleware = async (req, res, next) => {
  return await authorizeUser(req, res, next, 'customer');
};
const adminAuthMiddleware = async (req, res, next) => {
  return await authorizeUser(req, res, next, 'admin');
};
module.exports = { authMiddleware, adminAuthMiddleware };
