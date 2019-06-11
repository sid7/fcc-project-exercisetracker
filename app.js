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

/*
 * Format response for added Exercises
 **/
function formatForRes(obj) {
  obj.date = new Date(obj.date).toDateString();
  obj._id = obj.userId;
  delete obj.userId;
  delete obj.__v;
  return obj;
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
    
    const body = req.body;
    // date with empty string will not get default value
    // require strict undefined
    body.date = body.date === "" ? undefined : body.date;
    
    const exercises = new Exercises(body);
    exercises.userName = user.userName;
    exercises.save(function(err, savedExercises) {
      if(err) {
        return next(err);
      }
      res.json(formatForRes(savedExercises.toObject()));
    });
  })
}

exports.log = function(req, res, next) {
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);
  const limit = parseInt(req.query.limit);
  const userId = req.query.userId;
  
  Users.findById(userId, function(err, user) {
    if(err) {
      return next({ status: 400, message: "unknown userId" });
    }
    Exercises
      .find({
        userId: userId,
        date: {
          $lt: to != "Invalid Date" ? to.getTime() : Date.now(),
          $gt: from != "Invalid Date" ? from.getTime(): 0
        }
      }, {
        __v: 0,
        _id: 0
      })
      .sort("-date")
      .limit(limit)
      .exec(function(err, exc) {
        if(err) {
          return next(err);
          res.json({
            _id: userId,
            userName: user.userName,
            from: from != "Invalid Date" ? from.getTime() : undefined,
            to: to != "Invalid Date" ? to.getTime() : undefined,
            count: exc.length
          })
        }
    });
  })
}