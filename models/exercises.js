const mongoose = require("mongoose");

const Exercises = new mongoose.Schema({
  userName: String,
  userId: {
    type: String,
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