'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PendingSchema = new Schema({

  user_id: {
    type: String,
    required: 'User Name is required'
  },
  pending_events: [String],
  pending_friends: [String]
});

module.exports = mongoose.model('Pending', PendingSchema);
