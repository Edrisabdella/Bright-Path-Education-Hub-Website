const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { name, bio } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, bio }, { new: true }).select('-password');
  res.json(user);
});

exports.getAllUsers = catchAsync(async (req, res) => {
  if (req.user.role !== 'admin') throw new AppError('Forbidden', 403);
  const users = await User.find().select('-password');
  res.json(users);
});