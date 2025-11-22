import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9]{6,8}$/
  },
  target: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalClicks: {
    type: Number,
    default: 0
  },
  lastClicked: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Compound index: code must be unique per user
linkSchema.index({ code: 1, user: 1 }, { unique: true });

// Index for faster lookups
linkSchema.index({ code: 1 });

const Link = mongoose.model('Link', linkSchema);

export default Link;

