const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

/**
 * Validate request data using express-validator
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().forEach(err => {
      extractedErrors.push({
        field: err.param,
        message: err.msg
      });
    });

    logger.warn('Validation errors:', extractedErrors);
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: extractedErrors
    });
  };
};

module.exports = {
  validate
};
