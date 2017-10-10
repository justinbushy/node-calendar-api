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

function list_tasks_by_date(req, res) {
    res.send();
}

function create_task(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, event) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: event,
                message: 'Task created'
            });
    });
}

function remove_task(req, res) {
    Task.remove({_id: req.params.task_id}, function(err, result) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
            status: 'success',
            message: 'Task removed'
        });
    });
}

function update_task(req, res) {
    Task.findById({_id: req.params.task_id}, function(err, task) {
        if(err)
            res.send(err);
        Object.assign(task, req.body).save(function(err, task) {
            if(err)
                res.send(err);
            res.status(200)
                .json({
                status: 'success',
                data: task,
                message: 'Task updated'
            });
        });
    });
}

module.exports = {
    list_all_tasks: list_all_tasks,
    list_tasks_by_date: list_tasks_by_date,
    create_task: create_task,
    remove_task: remove_task,
    update_task: update_task
};