'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({

    user_id: {
        type: String,
        required: 'user_id is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    description: String,
    task_date: Date,
    completed: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);