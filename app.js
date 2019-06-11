const Users = require("./models/users.js");
const Exercises = require("./models/exercises.js");

/**
 * Add new user in db
 * POST req: /api/exercise/new-user
 */
exports.newUser = function(req, res, next) {
  const user = new Users(req.body);
  user.save(function(err, savedUser) {
    if(err) {
      return next(err);
    }
    res.json({
      userName: savedUser.userName,
      _id: savedUser._id
    })
  })
}

/**
 * get list of users from db
 * GET req: /api/exercise/
 */
exports.getAllUsers = function(req, res, next) {
  Users.find({}, function(err, userLst) {
    if(err) {
      return next(err);
    }
    res.json(userLst);
  })
}

/**
 * Add new Exercises for a user
 * POST req: /api/exercise/add
 */

exports.addExercises = function(req, res, next) {
  Users.findById(req.body.userId, function(err, user) {
    if(err) {
      return next(err);
    }
    if(!user) {
      return next({
        status: 400,
        message: "unknown _id"
      });
    }
    const exercises = new Exercises(req.body);
    exercises.userName = user.userName;
    exercises.save(function(err, savedExercises) {
      if(err) {
        return next(err);
      }
      console.log({savedExercises});
      res.json(savedExercises.toObject());
    });
  })
}

exports.log = function(req, res, next) {
  
}