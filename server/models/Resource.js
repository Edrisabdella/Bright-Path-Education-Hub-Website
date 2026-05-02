const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'video', 'image', 'other'] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);