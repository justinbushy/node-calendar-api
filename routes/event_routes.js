'use strict';

var express = require('express');
var router = express.Router();

var events = require('../controllers/event_controller');
var users = require('../controllers/user_controller');

router.get('/users/:user_id/events', users.login_required, events.list_all_events);
router.post('/users/:user_id/events', users.login_required, events.create_event);
router.get('/users/:user_id/events/:event_id', users.login_required, events.list_one_event);
router.put('/users/:user_id/events/:event_id', users.login_required, events.update_event);
router.delete('/users/:user_id/events/:event_id', users.login_required, events.remove_event);

module.exports = router;
