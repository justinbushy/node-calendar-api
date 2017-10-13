'use strict';

var express = require('express');
var router = express.Router();

var pending = require('../controllers/pending_controller');

// pending_events paths
router.get('/users/:user_id/pending/events', pending.list_all_pending_event);
router.put('/users/:user_id/pending/events', pending.accept_pending_event);
router.post('/users/:user_id/events/share', pending.add_to_pending_events);

// pending_friends paths
router.get('/users/:user_id/pending/friends', pending.list_all_pending_friends);
router.post('/users/:user_id/friends/', pending.add_to_pending_friends);
router.put('/users/:user_id/friends', pending.accept_pending_friend);

module.exports = router;
