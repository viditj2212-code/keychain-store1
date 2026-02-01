const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { rateLimitModerate } = require('../middlewares/rateLimit.middleware');
const { body } = require('express-validator');

// Public route
router.post(
  '/subscribe',
  rateLimitModerate,
  validate([
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail()
  ]),
  newsletterController.subscribe
);

router.post(
  '/unsubscribe',
  rateLimitModerate,
  validate([
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail()
  ]),
  newsletterController.unsubscribe
);

// Admin routes
router.get(
  '/',
  authenticateAdmin,
  newsletterController.getAllSubscribers
);

router.delete(
  '/:id',
  authenticateAdmin,
  newsletterController.deleteSubscriber
);

module.exports = router;
