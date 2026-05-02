const mongoose = require('mongoose');

const tutoringSessionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // minutes
  meetingLink: { type: String, default: '' },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('TutoringSession', tutoringSessionSchema);