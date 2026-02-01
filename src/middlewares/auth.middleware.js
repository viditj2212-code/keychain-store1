const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return errorResponse(res, 'Invalid or expired token', 401);
  }
}

async function authenticateAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return errorResponse(res, 'Admin access required', 403);
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Admin authentication error:', error);
    return errorResponse(res, 'Invalid or expired token', 401);
  }
}

module.exports = {
  authenticateUser,
  authenticateAdmin
};

