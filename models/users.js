const mongoose = require("mongoose");
const shortid = require("shortid");

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  _id: {
    type: String,
    index: true,
    default: shortid.generate
  }
});

module.exports = mongoose.model('Users', Users);