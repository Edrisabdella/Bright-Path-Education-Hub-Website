const TutoringSession = require('../models/TutoringSession');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.requestSession = catchAsync(async (req, res) => {
  const { tutorId, subject, dateTime, duration } = req.body;
  const tutor = await User.findById(tutorId);
  if (!tutor || tutor.role !== 'tutor') throw new AppError('Invalid tutor', 400);
  const session = await TutoringSession.create({
    student: req.user.id, tutor: tutorId, subject, dateTime, duration
  });
  res.status(201).json(session);
});

exports.getMySessions = catchAsync(async (req, res) => {
  const sessions = await TutoringSession.find({
    $or: [{ student: req.user.id }, { tutor: req.user.id }]
  }).populate('student tutor', 'name email');
  res.json(sessions);
});