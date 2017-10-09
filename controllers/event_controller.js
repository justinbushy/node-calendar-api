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
}

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
}

function list_one_event(req, res) {

}

function list_events_by_date(req, res) {

}

function remove_event(req, res) {
    Event.remove({_id: req.params.event_id}, function(err, result) {
        if(err)
            return err;
        res.json({
            status: 'success',
            message: 'Event removed'
        });
    });
}

function update_event(req, res) {
    Event.findById({_id: req.params.event_id}, function(err, event){
        if(err)
            res.send(err);
        Object.assign(event, req.body).save(function(err, event) {
            if(err)
                res.send(err);
            res.json({
                status: 'success',
                message: 'Event updated'
            });
        });
    });
}

module.exports = {
    list_all_events: list_all_events,
    create_event: create_event,
    list_one_event: list_one_event,
    list_events_by_date: list_events_by_date,
    remove_event: remove_event,
    update_event: update_event
};