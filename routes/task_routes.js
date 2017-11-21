'use strict';

var express = require('express');
var router = express.Router();

var tasks = require('../controllers/task_controller');
var user = require('../controllers/user_controller');

router.get('/users/:user_id/tasks', user.login_required, tasks.list_all_tasks);
router.post('/users/:user_id/tasks', user.login_required, tasks.create_task);
router.put('/users/:user_id/tasks/:task_id', user.login_required, tasks.update_task);
router.delete('/users/:user_id/tasks/:task_id', user.login_required, tasks.remove_task);

router.get('/users/:user_id/tasks/date/:task_date', user.login_required, tasks.list_tasks_by_date);

module.exports = router;
