var express = require('express');
var router = express.Router();

var user_db = require('../user_queries');
var event_db = require('../event_queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User routes */
router.get('/api/users', user_db.getAllUsers);
router.get('/api/users/:id', user_db.getSingleUser);
router.post('/api/users', user_db.createUser);
router.put('/api/users/:id', user_db.updateUser);
router.delete('/api/users/:id', user_db.removeUser);

/* Event routes */
router.get('/api/events/:id', event_db.getAllEvents);

module.exports = router;
