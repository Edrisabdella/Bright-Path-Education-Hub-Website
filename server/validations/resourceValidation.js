const { body } = require('express-validator');

exports.uploadResourceValidation = [
  body('title').notEmpty(),
  body('course').optional().isMongoId()
];