'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var user_mod = require('../models/user_model'); //eslint-disable-line
var User = mongoose.model('User');

var secret = process.env.JWT_SECRET || '26073B5085EF60DC6FD0BD416D8DDE5F4B71CF222A21C4BF1CD31485273C06B8';

/**
 * Route handler for 'GET /api/users'
 *
 * Retrieves all users in the database.
 *
 * NOTE: This should be blocked for all users except an 'admin'
 *
 * @param req
 * @param res
 */
function listAllUsers (req, res) {
  User.find({}, function (err, user) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: user,
        message: 'Retrieved all users'
      });
  });
}

/**
 * Route handler for 'Get /api/users/:user_id'
 *
 * Retrieves the user with the given user_id
 *
 * @param req
 * @param res
 */
function listOneUser (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: user,
        message: 'Retrieved all users'
      });
  });
}

/**
 * Route handler for 'POST /api/users;
 *
 * Creates user with data from client body
 *
 * Expected body format from client:
 * {
 *    first_name: String (required),
 *    last_name: String (required),
 *    email: String (required),
 *    user_name: String (required),
 *    password: String (required) ENCRYPTED BY BCRYPT
 * }
 *
 * @param req
 * @param res
 */
function createUser (req, res) {
  var newUser = new User(req.body);
  var salt = bcrypt.genSaltSync(10);
  newUser.password = bcrypt.hashSync(req.body.password, salt);
  newUser.save(function (err, user) {
    if (err) { return res.send(err); }

    if (user) {
      res.status(200)
        .json({
          status: 'success',
          token: jwt.sign({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            _id: user._id
          }, secret),
          user_id: user._id,
          message: 'Created User'
        });
    } else {
      res.status(409)
        .json({
          status: 'Conflict',
          message: 'User already created'
        });
    }
  });
}

/**
 * Route handler for 'DELETE /api/users/:user_id'
 *
 * Removes the user from the database with given user_id
 *
 * NOTE: Should only allow authentication from user with
 * that user_id or 'admin'
 *
 * @param req
 * @param res
 */
function removeUser (req, res) {
  User.remove({ _id: req.params.user_id }, function (err, result) {
    if (err) {
      console.log(err);
      return err;
    }
    res.json({
      status: 'success',
      message: 'User removed'
    });
  });
}

/**
 * Route handler for 'PUT /api/users:user_id'
 *
 * Updates user with given data from client
 *
 * Expected body format from client:
 * {
 *    first_name: String,
 *    last_name: String,
 *    email: String,
 *    user_name: String,
 *    password: String  NEEDS ENCRYPTION
 * }
 *
 * @param req
 * @param res
 */
function updateUser (req, res) {
  // Mongoose findOneAndUpdate takes conditions, update parameter, and options
  var conditions = { _id: req.params.user_id };
  var update = req.body;
  var options = {
    overwrite: true,
    new: true
  };

  User.findOneAndUpdate(conditions, update, options,
    function (err) {
      if (err) { console.log(err); } else {
        res.status(200)
          .json({
            status: 'success',
            message: 'User updated'
          });
      }
    });
}

function loginRequired (req, res, next) {
  // jwt is authenticated first by middleware
  // If token is valid, then req.user is not undefined
  if (req.user) {
    // check that the token contains requesting user id .
    var decoded = jwt.decode(req.headers.authorization.split(' ')[1]);
    if (decoded._id !== req.params.user_id) {
      res.status(401)
        .json({
          status: 'unauthorized',
          message: 'User unauthorized'
        });
    } else {
      next();
    }
  } else {
    res.status(401)
      .json({
        status: 'unauthorized',
        message: 'User unauthorized'
      });
  }
}

function signIn (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { console.log(err); }
    if (!user) {
      res.status(401)
        .json({
          message: 'User not found'
        });
    } else if (user) {
      if (!user.comparePasswords(req.body.password)) {
        res.status(401)
          .json({
            message: 'Wrong password'
          });
      } else {
        res.status(200)
          .json({
            status: 'success',
            token: jwt.sign({
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              _id: user._id
            }, secret),
            user_id: user._id,
            message: 'User Authenticated.'
          });
      }
    }
  });
}

module.exports = {
  list_all_users: listAllUsers,
  list_one_users: listOneUser,
  create_user: createUser,
  remove_user: removeUser,
  update_user: updateUser,
  login_required: loginRequired,
  sign_in: signIn
};
