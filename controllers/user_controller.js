'use strict';

var mongoose = require('mongoose');

var user_mod = require('../models/user_model'); //eslint-disable-line
var User = mongoose.model('User');

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

function createUser (req, res) {
  var newUser = new User(req.body);
  newUser.save(function (err, user) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        message: 'Created User'
      });
  });
}

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

function updateUser (req, res) {
  User.findById({ _id: req.params.user_id }, function (err, user) {
    if (err) { res.send(err); }
    Object.assign(user, req.body).save(function (err, user) {
      if (err) { res.send(err); }
      res.json({
        status: 'success',
        message: 'User updated'
      });
    });
  });
}

module.exports = {
  list_all_users: listAllUsers,
  list_one_users: listOneUser,
  create_user: createUser,
  remove_user: removeUser,
  update_user: updateUser
};
