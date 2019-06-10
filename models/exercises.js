const mongoose = require("mongoose");

const Exercises = new mongoose.Schema({
  userName: String,
  userId: {
    type: String,
    ref: "Users",
    index: true
  },
  description: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exercises', Exercises);