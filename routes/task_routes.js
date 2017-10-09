'use strict'

var express = require('express');
var router = express.Router();

var tasks = require('../controllers/task_controller');

router.get('/users/:user_id/tasks', tasks.list_all_tasks);

module.exports = router;