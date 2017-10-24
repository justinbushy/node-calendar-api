'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

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
    unique: true,
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

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync (password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
