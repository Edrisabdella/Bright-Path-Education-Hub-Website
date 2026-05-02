const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createCourse = catchAsync(async (req, res) => {
  const course = await Course.create({ ...req.body, instructor: req.user.id });
  res.status(201).json(course);
});

exports.getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.find({ isPublished: true }).populate('instructor', 'name');
  res.json(courses);
});

exports.getCourseById = catchAsync(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor resources');
  if (!course) throw new AppError('Course not found', 404);
  res.json(course);
});

exports.enrollCourse = catchAsync(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw new AppError('Course not found', 404);
  const already = await Enrollment.findOne({ user: req.user.id, course: course._id });
  if (already) throw new AppError('Already enrolled', 400);
  await Enrollment.create({ user: req.user.id, course: course._id });
  await Course.findByIdAndUpdate(course._id, { $addToSet: { enrolledStudents: req.user.id } });
  res.json({ message: 'Enrolled successfully' });
});