'use strict'

var express = require('express');
var router = express.Router();

var tasks = require('../controllers/task_controller');

router.get('/users/:user_id/tasks', tasks.list_all_tasks);
router.post('/users/:user_id/tasks', tasks.create_task);
router.put('/users/:user_id/tasks/:task_id', tasks.update_task);
router.delete('/users/:user_id/tasks/:task_id', tasks.remove_task);

module.exports = router;