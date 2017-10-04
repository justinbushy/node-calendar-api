'use strict'

var express = require('express');
var router = express.Router();

var users = require('../controllers/user_controller');

/* THESE ROUTES START WITH /users */
router.get('/', users.list_all_users);
router.post('/', users.create_user);

module.exports = router;