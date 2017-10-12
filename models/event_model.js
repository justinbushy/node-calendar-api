'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({

    user_id: [{
        type: String,
        required: 'User ID is needed'
    }],
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
});

module.exports = mongoose.model('Event', EventSchema);