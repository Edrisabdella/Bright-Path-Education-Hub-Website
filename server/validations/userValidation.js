const { body } = require('express-validator');

exports.updateProfileValidation = [
  body('name').optional().isString(),
  body('bio').optional().isString()
];