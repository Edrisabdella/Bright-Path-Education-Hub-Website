const { body } = require('express-validator');

exports.createCourseValidation = [
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('category').notEmpty()
];