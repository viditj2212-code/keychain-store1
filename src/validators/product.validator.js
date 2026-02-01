const { body, param } = require('express-validator');

const createProductValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 200 }).withMessage('Product name must be between 3 and 200 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Product description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),

  body('salePrice')
    .optional({ nullable: true })
    .isFloat({ min: 0.01 }).withMessage('Sale price must be a positive number')
    .custom((value, { req }) => {
      // Parse values to floats for accurate comparison
      const sale = parseFloat(value);
      const regular = parseFloat(req.body.price);
      if (!isNaN(sale) && !isNaN(regular) && sale >= regular) {
        throw new Error('Sale price must be less than regular price');
      }
      return true;
    }),

  body('image')
    .trim()
    .notEmpty().withMessage('Product image is required')
    .custom((value) => {
      // Allow relative paths starting with /images/ OR valid URLs
      if (value.startsWith('/images/')) return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error('Image must be a valid URL or a local path starting with /images/');
      }
    }),

  body('images')
    .optional()
    .customSanitizer((value) => {
      // If it's a JSON string, parse it
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    })
    .toArray() // Force to array
    .isArray().withMessage('Images must be an array')
    .custom((value) => {
      if (value && value.length > 0) {
        const allValid = value.every(url => {
          // Allow relative paths starting with /images/ OR valid URLs
          if (typeof url === 'string' && url.startsWith('/images/')) return true;
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        });
        if (!allValid) {
          throw new Error('All images must be valid URLs or local paths starting with /images/');
        }
      }
      return true;
    }),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Minimalist', 'Leather', 'Metal', 'Custom']).withMessage('Invalid category'),

  body('stock')
    .notEmpty().withMessage('Stock is required')
    .toInt() // Ensure integer
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('isFeatured')
    .optional()
    .toBoolean() // Convert 'true'/'false' strings to boolean
    .isBoolean().withMessage('isFeatured must be a boolean'),

  body('isNew')
    .optional()
    .toBoolean()
    .isBoolean().withMessage('isNew must be a boolean'),

  body('rating')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),

  body('reviews')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('Reviews must be a non-negative integer'),

  body('features')
    .optional()
    .toArray() // Force to array
    .isArray().withMessage('Features must be an array')
    .custom((value) => {
      if (value && value.length > 0) {
        const allStrings = value.every(feature => typeof feature === 'string');
        if (!allStrings) {
          throw new Error('All features must be strings');
        }
      }
      return true;
    })
];

const updateProductValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('Product name must be between 3 and 200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),

  body('salePrice')
    .optional({ nullable: true })
    .isFloat({ min: 0.01 }).withMessage('Sale price must be a positive number')
    .custom((value, { req }) => {
      if (req.body.price) {
        const sale = parseFloat(value);
        const regular = parseFloat(req.body.price);
        if (!isNaN(sale) && !isNaN(regular) && sale >= regular) {
          throw new Error('Sale price must be less than regular price');
        }
      }
      return true;
    }),

  body('image')
    .optional()
    .trim()
    .custom((value) => {
      // Allow relative paths starting with /images/ OR valid URLs
      if (value.startsWith('/images/')) return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error('Image must be a valid URL or a local path starting with /images/');
      }
    }),

  body('images')
    .optional()
    .customSanitizer((value) => {
      // If it's a JSON string, parse it
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    })
    .toArray()
    .isArray().withMessage('Images must be an array')
    .custom((value) => {
      if (value && value.length > 0) {
        const allValid = value.every(url => {
          // Allow relative paths starting with /images/ OR valid URLs
          if (typeof url === 'string' && url.startsWith('/images/')) return true;
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        });
        if (!allValid) {
          throw new Error('All images must be valid URLs or local paths starting with /images/');
        }
      }
      return true;
    }),

  body('category')
    .optional()
    .trim()
    .isIn(['Minimalist', 'Leather', 'Metal', 'Custom']).withMessage('Invalid category'),

  body('stock')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('isFeatured')
    .optional()
    .toBoolean()
    .isBoolean().withMessage('isFeatured must be a boolean'),

  body('isNew')
    .optional()
    .toBoolean()
    .isBoolean().withMessage('isNew must be a boolean'),

  body('rating')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),

  body('reviews')
    .optional()
    .toInt()
    .isInt({ min: 0 }).withMessage('Reviews must be a non-negative integer'),

  body('features')
    .optional()
    .toArray()
    .isArray().withMessage('Features must be an array')
];

const productIdValidator = [
  param('id')
    .trim()
    .notEmpty().withMessage('Product ID is required')
    .isUUID().withMessage('Invalid product ID format')
];

module.exports = {
  createProductValidator,
  updateProductValidator,
  productIdValidator
};
