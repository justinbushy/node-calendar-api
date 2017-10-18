'use strict';

var mongoose = require('mongoose');

var task_model = require('../models/task_model'); //eslint-disable-line
var Task = mongoose.model('Task');

/**
 * Route handler for 'GET /api/users/:user_id/tasks'
 *
 * Retrieves all tasks for user and sends list back to client
 *
 * @param req
 * @param res
 */
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

/**
 * Will list all tasks for user by given date
 *
 * @param req
 * @param res
 */
function listTasksByDate (req, res) {
  // TODO
}

/**
 * Route handler for 'POST /api/users/:user_id/tasks'
 *
 * Creates task for user with the given data from client
 *
 * Expected body format from client:
 * {
 *    user_id: String (required),
 *    title: String (required),
 *    description: String,
 *    task_date: String (format: yyy-mm-ddThh:mm:ss.000Z required),
 *    completed: Boolean (required)
 * }
 *
 * @param req
 * @param res
 */
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

/**
 * Route handler for 'DELETE /api/users/:user_id/tasks/:task_id'
 *
 * Removes the task from the database.
 *
 * @param req
 * @param res
 */
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

/**
 * Route handler for 'PUT /api/users/:user_id/tasks/:task_id'
 *
 * Updates the task with the data from the client
 *
 * Expected body format from client:
 * {
 *    user_id: String,
 *    title: String,
 *    description: String,
 *    task_date: String (format: yyy-mm-ddThh:mm:ss.000Z),
 *    completed: Boolean
 * }
 *
 * @param req
 * @param res
 */
function updateTask (req, res) {
  // Mongoose findOneAndUpdate takes conditions, update parameters, and options
  var conditions = { _id: req.params.task_id };
  var update = req.body;
  var options = {
    overwrite: true,
    new: true
  };

  Task.findOneAndUpdate(conditions, update, options,
    function (err, task) {
      if (err) { console.log(err); } else {
        res.status(200)
          .json({
            status: 'success',
            data: task,
            message: 'Task updated'
          });
      }
    });
}

module.exports = {
  list_all_tasks: listAllTasks,
  list_tasks_by_date: listTasksByDate,
  create_task: createTask,
  remove_task: removeTask,
  update_task: updateTask
};
