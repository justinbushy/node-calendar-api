'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    first_name: {
        type: String,
        required: 'Please enter first name'
    },
    last_name: {
        type: String,
        required: 'Please enter last name'
    },
    email: {
        type: String,
        required: 'Please enter email'
    },
    user_name: {
        type: String,
        required: 'Please enter user name'
    },
    password: {
        type: String,
        required: 'Please enter password'
    },
    friends: [String]
});

module.exports = mongoose.model('User', UserSchema);
