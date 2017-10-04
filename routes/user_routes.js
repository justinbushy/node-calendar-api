'use strict'

module.exports = function(app) {
    var user = require('../controllers/userController');

    app.route('/users')
        .get(user.list_all_users);

   //add single user routes here later
}