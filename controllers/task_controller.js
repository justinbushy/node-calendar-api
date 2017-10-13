'use strict';

var mongoose = require('mongoose');

var task_model = require('../models/task_model'); //eslint-disable-line
var Task = mongoose.model('Task');

function listAllTasks (req, res) {
  Task.find({user_id: req.params.user_id}, function (err, tasks) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: tasks,
        message: 'Retrieved all tasks for user'
      });
  });
}

function listTasksByDate (req, res) {
  res.send();
}

function createTask (req, res) {
  var newTask = new Task(req.body);
  newTask.save(function (err, event) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: event,
        message: 'Task created'
      });
  });
}

function removeTask (req, res) {
  Task.remove({_id: req.params.task_id}, function (err, result) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        message: 'Task removed'
      });
  });
}

function updateTask (req, res) {
  Task.findById({_id: req.params.task_id}, function (err, task) {
    if (err) { res.send(err); }
    Object.assign(task, req.body).save(function (err, task) {
      if (err) { res.send(err); }
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
  list_all_tasks: listAllTasks,
  list_tasks_by_date: listTasksByDate,
  create_task: createTask,
  remove_task: removeTask,
  update_task: updateTask
};
