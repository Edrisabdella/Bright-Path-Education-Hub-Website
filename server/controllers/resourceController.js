const Resource = require('../models/Resource');
const catchAsync = require('../utils/catchAsync');
const cloudinaryService = require('../services/cloudinaryService');

exports.uploadResource = catchAsync(async (req, res) => {
  const { title, description, course, isPublic } = req.body;
  let fileUrl = '';
  if (req.file) {
    const result = await cloudinaryService.uploadFile(req.file.buffer, { resource_type: 'auto' });
    fileUrl = result.secure_url;
  }
  const resource = await Resource.create({
    title, description, fileUrl, fileType: req.file?.mimetype.split('/')[0],
    uploadedBy: req.user.id, course, isPublic: isPublic === 'true'
  });
  res.status(201).json(resource);
});

exports.getResources = catchAsync(async (req, res) => {
  const filter = { $or: [{ isPublic: true }, { uploadedBy: req.user.id }] };
  if (req.query.course) filter.course = req.query.course;
  const resources = await Resource.find(filter).populate('uploadedBy', 'name');
  res.json(resources);
});