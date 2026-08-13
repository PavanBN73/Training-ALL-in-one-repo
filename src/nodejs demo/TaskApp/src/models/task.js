const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 3) {
        throw new Error('Task description must be at least 3 characters');
      }
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Populate owner details when fetching tasks
taskSchema.pre(/^find/, function(next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'owner',
    select: 'name email'
  });
  next();
});

// Remove tasks when user is deleted
taskSchema.statics.deleteTasksByUser = async function(userId) {
  return await this.deleteMany({ owner: userId });
};

module.exports = mongoose.model('Task', taskSchema);
