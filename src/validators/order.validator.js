const { body, param } = require('express-validator');

const createOrderValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Invalid phone number'),

  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters'),

  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),

  body('state')
    .trim()
    .notEmpty().withMessage('State is required')
    .isLength({ min: 2, max: 50 }).withMessage('State must be between 2 and 50 characters'),

  body('zipCode')
    .trim()
    .notEmpty().withMessage('ZIP code is required')
    .isPostalCode('any').withMessage('Invalid ZIP code'),

  body('country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Country must be between 2 and 100 characters'),

  body('items')
    .isArray({ min: 1 }).withMessage('Order must contain at least one item')
    .custom((items) => {
      for (const item of items) {
        if (!item.id || !item.name || !item.price || !item.quantity) {
          throw new Error('Each item must have id, name, price, and quantity');
        }
        if (item.quantity <= 0) {
          throw new Error('Item quantity must be greater than 0');
        }
      }
      return true;
    })
];

const orderIdValidator = [
  param('id')
    .trim()
    .notEmpty().withMessage('Order ID is required')
    .isUUID().withMessage('Invalid order ID format')
];

const updateOrderStatusValidator = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
];

module.exports = {
  createOrderValidator,
  orderIdValidator,
  updateOrderStatusValidator
};
