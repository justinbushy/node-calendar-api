'use strict'

var express = require('express');
var router = express.Router();

var pending = require('../controllers/pending_controller');

router.get('/users/:user_id/pending', pending.list_all_pending_event);
router.post('/users/:user_id/events/share', pending.add_to_pending_events);

module.exports = router;