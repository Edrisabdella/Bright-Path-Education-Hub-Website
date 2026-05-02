const express = require('express');
const { createCourse, getAllCourses, getCourseById, enrollCourse } = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { createCourseValidation } = require('../validations/courseValidation');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.use(protect);
router.post('/', restrictTo('admin', 'tutor'), validate(createCourseValidation), createCourse);
router.post('/:id/enroll', enrollCourse);

module.exports = router;