'use strict'

var express = require('express');
var router = express.Router();

var events = require('../controllers/event_controller');

router.get('/users/:user_id/events', events.list_all_events);
router.post('/users/:user_id/events', events.create_event);

module.exports = router;