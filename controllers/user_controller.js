'use strict'

var mongoose = require('mongoose');

var user_mod = require('../models/user_model');
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
    User.remove({_id: req.params.user_id}, function(err, result) {
        if(err) {
            console.log(err);
            return err;
        }
        res.json({
            status: 'success',
            message: 'User removed'
        });
    });
};

function update_user(req, res) {

    User.findById({_id: req.params.user_id}, function(err, user) {
        if(err)
            res.send(err);
        Object.assign(user, req.body).save(function(err, user) {
            if(err)
                res.send(err);
            res.json({
                status: 'success',
                message: 'User updated'
            });
        });
    });
}

module.exports = {
    list_all_users: list_all_users,
    list_one_users: list_one_users,
    create_user: create_user,
    remove_user: remove_user,
    update_user: update_user
}


