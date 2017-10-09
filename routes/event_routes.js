'use strict'

var express = require('express');
var router = express.Router();

var events = require('../controllers/event_controller');

router.get('/users/:user_id/events', events.list_all_events);
router.post('/users/:user_id/events', events.create_event);
router.get('/users/:user_id/events/:event_id', events.list_one_event);
router.put('/users/:user_id/events/:event_id', events.update_event);
router.delete('/users/:user_id/events/:event_id', events.remove_event);

module.exports = router;