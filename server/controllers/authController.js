const User = require('../models/User');
const Token = require('../models/Token');
const generateToken = require('../utils/generateToken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../services/emailService');
const crypto = require('crypto');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already registered', 400);
  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);
  res.status(201).json({ token, user: { id: user._id, name, email, role } });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }
  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('No user with that email', 404);
  const resetToken = crypto.randomBytes(32).toString('hex');
  await Token.create({ userId: user._id, token: resetToken, type: 'reset' });
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail(email, 'Password Reset', `<a href="${resetUrl}">Reset</a>`);
  res.json({ message: 'Reset email sent' });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  const tokenDoc = await Token.findOne({ token, type: 'reset', expiresAt: { $gt: Date.now() } });
  if (!tokenDoc) throw new AppError('Invalid or expired token', 400);
  const user = await User.findById(tokenDoc.userId);
  user.password = newPassword;
  await user.save();
  await Token.deleteOne({ _id: tokenDoc._id });
  res.json({ message: 'Password updated' });
});