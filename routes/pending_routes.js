'use strict';

var express = require('express');
var router = express.Router();

var pending = require('../controllers/pending_controller');
var user = require('../controllers/user_controller');

// pending_events paths
router.get('/users/:user_id/pending/events', user.login_required, pending.list_all_pending_event);
router.put('/users/:user_id/pending/events', user.login_required, pending.accept_pending_event);
router.post('/users/:user_id/events/share', user.login_required, pending.add_to_pending_events);

// pending_friends paths
router.get('/users/:user_id/pending/friends', user.login_required, pending.list_all_pending_friends);
router.post('/users/:user_id/friends/', user.login_required, pending.add_to_pending_friends);
router.put('/users/:user_id/friends', user.login_required, pending.accept_pending_friend);

module.exports = router;
