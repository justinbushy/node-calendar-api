'use strict';

var mongoose = require('mongoose');

var event_model = require('../models/event_model'); //eslint-disable-line
var Event = mongoose.model('Event');

var moment = require('moment');

/**
 * Route handler for 'GET /api/users/:user_id/events'
 *
 * Retrieves all of the users events and sends the list to the client
 *
 * @param req
 * @param res
 */
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

/**
 * Route handler for 'POST /api/users/:user_id/events'
 *
 * Creates the event passed in the body
 *
 * Expected body format from client:
 * {
 *    user_id: String (required),
 *    title: String (required),
 *    description: String,
 *    start_time: String (format: yyy-mm-ddThh:mm:ss.000Z),
 *    end_time: String (format: yyy-mm-ddThh:mm:ss.000Z),
 *    notes: String
 * }
 *
 * @param req
 * @param res
 */
function createEvent (req, res) {
  // TODO: validate client input
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

/**
 * Will list single event by event_id
 * Not sure if really needed yet.
 * @param req
 * @param res
 */
function listOneEvent (req, res) {
  // TODO
}

/**
 * Route handler for 'GET /api/users/:user_id/events/:event_date
 *
 * Will list all events for user on Date
 * Should be useful
 * @param req
 * @param res
 */
function listEventsByDate (req, res) {
  console.log(req.params.event_date);
  var startDate = moment(req.params.event_date);
  var nextDate = startDate.clone().add(1, 'day');
  Event.find({
    user_id: req.params.user_id,
    start_time: { '$gte': startDate.toDate(), '$lt': nextDate.toDate() }
  },
    function (err, events) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.status(200)
          .json({
            status: 'success',
            data: events,
            message: 'Retrieved all events for user on given date'
          });
      }
    });
}

/**
 * Route handler for 'DELETE /api/users/:user_id/events/:event_id'
 *
 * Deletes the event from the database.
 *
 * @param req
 * @param res
 */
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

/**
 * Route handler for 'PUT /api/users/:user_id/events/:event_id'
 *
 * Updates the event with data in client sent body
 *
 * Expected body format from client:
 * {
 *    user_id: String (required),
 *    title: String (required),
 *    description: String,
 *    start_time: String (format: yyyy-mm-ddThh:mm:ss.000Z),
 *    end_time: String (format: yyyy-mm-ddThh:mm:ss.000Z),
 *    notes: String
 * }
 *
 * @param req
 * @param res
 */
function updateEvent (req, res) {
  // TODO: validate client input
  // Mongoose findOneAndUpdate takes conditions, update parameters, and options
  var conditions = { _id: req.params.event_id };
  var update = req.body;
  var options = {
    overwrite: true,
    new: true
  }; // need overwrite and new options set to true to overwrite parameters and return updated doc

  Event.findOneAndUpdate(conditions, update, options,
    function (err) {
      if (err) { console.log(err); } else {
        res.status(200)
          .json({
            status: 'success',
            message: 'Event updated'
          });
      }
    });
}

module.exports = {
  list_all_events: listAllEvents,
  create_event: createEvent,
  list_one_event: listOneEvent,
  list_events_by_date: listEventsByDate,
  remove_event: removeEvent,
  update_event: updateEvent
};
