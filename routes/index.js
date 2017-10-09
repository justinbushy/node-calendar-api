var express = require('express');
var router = express.Router();

var user_db = require('../queries/user_queries');
var event_db = require('../queries/event_queries');
var task_db = require('../queries/task_queries');
var users = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User routes */
/*
router.get('/api/users', user_db.getAllUsers);
router.get('/api/users/:id', user_db.getSingleUser);
router.post('/api/users', user_db.createUser);
router.put('/api/users/:id', user_db.updateUser);
router.delete('/api/users/:id', user_db.removeUser);
*/

/* Event routes */
/*
router.get('/api/users/:id/events/', event_db.getAllEvents);
router.post('/api/users/:id/events/', event_db.creatEvent);
router.get('/api/users/:id/events/:date', event_db.getEventsOnDate);
router.get('/api/users/:id/events/:time', event_db.getEventsBetweenTime);
router.delete('/api/users/:id/events/:event_id', event_db.removeEvent);
*/

/* Task routes */
/*
router.get('/api/users/:id/tasks', task_db.getAllTasks);
router.post('/api/users/:id/tasks', task_db.createTask);
router.delete('/api/users/:id/tasks/:task_id', task_db.removeTask);
*/

//testing mongo users
/*
router.get('/users', users.list_all_users);
router.post('/users', users.create_user);
*/

module.exports = router;
