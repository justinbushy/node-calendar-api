'use strict';

var mongoose = require('mongoose');

var event_model = require('../models/event_model'); //eslint-disable-line
var Event = mongoose.model('Event');

function listAllEvents (req, res) {
  Event.find({ user_id: req.params.user_id }, function (err, events) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: events,
        message: 'Retrieved all events for user'
      });
  });
}

function createEvent (req, res) {
  var newEvent = new Event(req.body);
  newEvent.save(function (err, event) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        message: 'Event created'
      });
  });
}

function listOneEvent (req, res) {

}

function listEventsByEate (req, res) {

}

function removeEvent (req, res) {
  Event.remove({ _id: req.params.event_id }, function (err, result) {
    if (err) { return err; }
    res.status(200)
      .json({
        status: 'success',
        message: 'Event removed'
      });
  });
}

function updateEvent (req, res) {
  Event.findById({ _id: req.params.event_id }, function (err, event) {
    if (err) { res.send(err); }
    Object.assign(event, req.body).save(function (err, event) {
      if (err) { res.send(err); }
      res.status(200)
        .json({
          status: 'success',
          message: 'Event updated'
        });
    });
  });
}

module.exports = {
  list_all_events: listAllEvents,
  create_event: createEvent,
  list_one_event: listOneEvent,
  list_events_by_date: listEventsByEate,
  remove_event: removeEvent,
  update_event: updateEvent
};
