'use strict'

var mongoose = require('mongoose');

var task_model = require('../models/task_model');
var Task = mongoose.model('Task');

function list_all_tasks(req, res) {
    Task.find({user_id: req.params.user_id}, function(err, tasks) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: tasks,
                message: 'Retrieved all tasks for user'
            });
    });
}

module.exports = {
    list_all_tasks: list_all_tasks
};