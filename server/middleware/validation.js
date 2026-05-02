const { validationResult } = require('express-validator');

/**
 * Middleware to validate request using express-validator rules.
 * @param {Array} validations - Array of validation chains
 */
exports.validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};