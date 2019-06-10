const Users = require("./users.js");
const Exercises = require("./exercises.js");

exports.newUser = function(req, res) {
  const user = new Users(req.body);
  user.save(function(err, savedUser) {
    if(err) {
      return;
    }
  })
}

exports.addExercises = function() {}

exports.getAllUsers = function() {}

exports.log = function() {}