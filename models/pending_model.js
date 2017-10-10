'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PendingSchema = new Schema({

    user_id: {
        type: String,
        required: 'User ID is required'
    },
    pending: [{
        user_id: {
            type: String,
            required: 'Other User ID is required'
        },
        title: String,
        description: String,
        start_time: {
            type: Date,
            default: Date.now
        },
        end_time: {
            type: Date,
            default: Date.now
        },
        notes: String
    }]
});

module.exports = mongoose.model('Pending', PendingSchema);