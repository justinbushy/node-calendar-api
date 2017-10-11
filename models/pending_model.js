'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PendingSchema = new Schema({

    user_id: {
        type: String,
        required: 'User ID is required'
    },
    pending: [String]
});

module.exports = mongoose.model('Pending', PendingSchema);