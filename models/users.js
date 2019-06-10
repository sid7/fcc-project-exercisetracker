const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  _id: {
    type: String,
    index: true
  }
});

module.exports = mongoose.model('Users', Users);