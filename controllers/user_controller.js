'use strict'

var mongoose = require('mongoose');

var user_mod = require('../models/userModel');
var User = mongoose.model('User');

function list_all_users(req, res) {
    User.find({}, function(err, user) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: user,
                message: 'Retrieved all users'
            });
    });
};

function list_one_users(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: user,
                message: 'Retrieved all users'
            });
    });
};

function create_user(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                message: 'Created User'
            });
    });
};

function remove_user(req, res) {

    var user_id = parseInt(req.params.user_id);
    User.remove({_id: user_id}, function(err, result) {
        res.json({
            status: 'success',
            message: 'User removed'
        });
    });
};

module.exports = {
    list_all_users: list_all_users,
    list_one_users: list_one_users,
    create_user: create_user,
    remove_user: remove_user
}


