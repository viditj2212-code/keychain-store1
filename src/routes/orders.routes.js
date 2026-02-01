const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const { authenticateUser, authenticateAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { 
  createOrderValidator,
  orderIdValidator,
  updateOrderStatusValidator
} = require('../validators/order.validator');

// Public routes
router.post(
  '/',
  validate(createOrderValidator),
  ordersController.createOrder
);

// User routes (requires authentication)
router.get(
  '/my-orders',
  authenticateUser,
  ordersController.getMyOrders
);

router.get(
  '/:id',
  authenticateUser,
  validate(orderIdValidator),
  ordersController.getOrderById
);

// Admin routes
router.get(
  '/',
  authenticateAdmin,
  ordersController.getAllOrders
);

router.patch(
  '/:id/status',
  authenticateAdmin,
  validate(orderIdValidator),
  validate(updateOrderStatusValidator),
  ordersController.updateOrderStatus
);

router.delete(
  '/:id',
  authenticateAdmin,
  validate(orderIdValidator),
  ordersController.deleteOrder
);

module.exports = router;
