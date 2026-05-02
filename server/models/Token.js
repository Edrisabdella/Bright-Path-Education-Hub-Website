const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  type: { type: String, enum: ['reset', 'verify'], default: 'reset' },
  expiresAt: { type: Date, required: true, default: () => Date.now() + 3600000 }, // 1 hour
});

module.exports = mongoose.model('Token', tokenSchema);