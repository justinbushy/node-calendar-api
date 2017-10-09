'use strict'

var express = require('express');
var router = express.Router();

var users = require('../controllers/user_controller');

/* THESE ROUTES START WITH /users */
router.get('/users', users.list_all_users);
router.post('/users', users.create_user);
router.put('/users/:user_id', users.update_user);
router.get('/users/:user_id', users.list_one_users);
router.delete('/users/:user_id', users.remove_user);

module.exports = router;