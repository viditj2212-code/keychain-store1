const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { rateLimitStrict } = require('../middlewares/rateLimit.middleware');
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/auth.validator');

// Public routes
router.post(
  '/register',
  rateLimitStrict,
  validate(registerValidator),
  authController.register
);

router.post(
  '/login',
  rateLimitStrict,
  validate(loginValidator),
  authController.login
);

router.post(
  '/forgot-password',
  rateLimitStrict,
  validate(forgotPasswordValidator),
  authController.forgotPassword
);

router.post(
  '/reset-password',
  rateLimitStrict,
  validate(resetPasswordValidator),
  authController.resetPassword
);

// Protected routes
router.get(
  '/me',
  authenticateUser,
  authController.getProfile
);

router.put(
  '/me',
  authenticateUser,
  authController.updateProfile
);

router.post(
  '/logout',
  authenticateUser,
  authController.logout
);

module.exports = router;
