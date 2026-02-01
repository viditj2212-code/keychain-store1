const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { rateLimitModerate } = require('../middlewares/rateLimit.middleware');
const { contactValidator } = require('../validators/contact.validator');

// Public route
router.post(
  '/',
  rateLimitModerate,
  validate(contactValidator),
  contactController.submitContact
);

// Admin routes
router.get(
  '/',
  authenticateAdmin,
  contactController.getAllMessages
);

router.patch(
  '/:id/status',
  authenticateAdmin,
  contactController.updateMessageStatus
);

router.delete(
  '/:id',
  authenticateAdmin,
  contactController.deleteMessage
);

module.exports = router;
