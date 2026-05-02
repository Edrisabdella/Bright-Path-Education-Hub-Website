const cloudinaryService = require('../services/cloudinaryService');
const catchAsync = require('../utils/catchAsync');

exports.uploadImage = catchAsync(async (req, res) => {
  const result = await cloudinaryService.uploadFile(req.file.buffer);
  res.json({ url: result.secure_url });
});