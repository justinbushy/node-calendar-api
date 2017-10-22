'use strict';

var mongoose = require('mongoose');

var user_mod = require('../models/user_model'); //eslint-disable-line
var User = mongoose.model('User');

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
 *    password: String (required) NEEDS ENCRYPTION
 * }
 *
 * @param req
 * @param res
 */
function createUser (req, res) {
  var newUser = new User(req.body);
  newUser.save(function (err) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        message: 'Created User'
      });
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

function login_required(req, res, next) {

}

function sign_in (req, res) {

}

module.exports = {
  list_all_users: listAllUsers,
  list_one_users: listOneUser,
  create_user: createUser,
  remove_user: removeUser,
  update_user: updateUser,
  login_required: login_required,
  sign_in: sign_in
};
