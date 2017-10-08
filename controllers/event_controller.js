'use strict'

var mongoose = require('mongoose');

var event_model = require('../models/event_model');
var Event = mongoose.model('Event');

function list_all_events(req, res) {
    Event.find({user_id: req.params.user_id}, function(err, events) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: events,
                message: 'Retrieved all events for user'
            });
    });
};

function create_event(req, res) {
    var new_event = new Event(req.body);
    new_event.save(function(err, event) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                message: 'Event created'
            });
    });
};

module.exports = {
    list_all_events: list_all_events,
    create_event: create_event
};