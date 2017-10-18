'use strict';

var mongoose = require('mongoose');

// Pending mongoose model
var pending_model = require('../models/pending_model'); //eslint-disable-line
var Pending = mongoose.model('Pending');

// Event mongoose model
var event_model = require('../models/event_model'); //eslint-disable-line
var Event = mongoose.model('Event');

// User mongoose model
var user_model = require('../models/user_model'); //eslint-disable-line
var User = mongoose.model('User');

/**
 * Route handler for 'GET /api/users/:user_id/pending/events'
 *
 * Retrieves all the of the pending events for user_id from the database,
 * Then sends the list of pending events to the client
 *
 * @param req
 * @param res
 */
function listAllPendingEvents (req, res) {
  Pending.findOne({ user_id: req.params.user_id }, function (err, events) {
    if (err) { res.send(err); } else {
      res.status(200)
        .json({
          status: 'success',
          data: events.pending_events,
          message: 'Retrieved all pending events for user'
        });
    }
  });
}

/**
 * Route handler for 'GET /api/users/:user_id/pending/friends'
 *
 * Retrieves all of the pending friends for the user_id from the database
 * Then sends the list of pending friends to the client
 *
 * @param req
 * @param res
 */
function listAllPendingFriends (req, res) {
  Pending.findOne({ user_id: req.params.user_id }, function (err, friends) {
    if (err) { res.send(err); }
    res.status(200)
      .json({
        status: 'success',
        data: friends.pending_friends,
        message: 'Retrieved all pending friends for user'
      });
  });
}

/**
 * Route handler for 'POST /api/users/:user_id/events/share'
 *
 * Adds the event_id to the other users list of pending events
 *
 * Expected body format from client:
 * {
 *    user_id: String,
 *    pending_events: [String]
 * }
 *
 * NOTE: the user can share multiple events at a time
 *
 * @param req
 * @param res
 */
function addToPendingEvents (req, res) {
  // TODO: need to check that other user_id is in friends list
  Pending.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $push: { pending_events: req.body.pending_events } },
    { upsert: true },
    function (err) {
      if (err) { console.log(err); } else {
        res.status(200)
          .json({
            status: 'success',
            message: 'Added event to users pending events'
          });
      }
    });
}

/**
 * Route handler for 'POST /api/users/:user_id/friends'
 *
 * Adds user_id to other users pending friends list
 *
 * Expected body format from client:
 * {
 *    user_id: String
 * }
 *
 * @param req
 * @param res
 */
function addToPendingFriends (req, res) {
  Pending.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $push: { pending_friends: req.params.user_id } },
    { upsert: true },
    function (err) {
      if (err) { console.log(err); } else {
        res.status(200)
          .json({
            status: 'success',
            message: 'Added friend to users pending friends'
          });
      }
    });
}

/**
 * Route handler for 'PUT /api/users/:user_id/events'
 *
 * Accepts the event_id from the pending event list as an event.
 * Removes the event_id from the pending list and adds user_id to event's users.
 *
 * Expected body format from client:
 * {
 *    event_id: String
 * }
 *
 * @param req
 * @param res
 */
function acceptPendingEvent (req, res) {
  // find and update pending events for user
  Pending.findOneAndUpdate({ user_id: req.params.user_id },
    { $pull: { pending_events: req.body.event_id } },
    function (err) {
      if (err) { console.log(err); } else {
        // find and update event to include this user_id
        Event.findOneAndUpdate({ _id: req.body.event_id },
          { $push: { user_id: req.params.user_id } },
          function (err, doc) {
            if (err) { console.log(err); } else {
              res.status(200)
                .json({
                  status: 'success',
                  message: 'Accepted event from pending events'
                });
            }
          });
      }
    });
}

/**
 * Route handler for 'PUT /api/users/:user_id/friends'
 *
 * Accepts the user_id (from body) as a friend.
 * Removes the user_id (from body) from pending friends list and adds to users friends
 *
 * Expected body format from client:
 * {
 *    user_id: String
 * }
 *
 * NOTE: users friends list is found in User model
 *
 * @param req
 * @param res
 */
function acceptPendingFriend (req, res) {
  Pending.findOneAndUpdate({ user_id: req.params.user_id },
    { $pull: { pending_friends: req.body.user_id } },
    function (err) {
      if (err) { console.log(err); } else {
        // add other user to requesting users friends list
        User.findOneAndUpdate({ _id: req.params.user_id },
          { $push: { friends: req.body.user_id } },
          function (err) {
            if (err) { console.log(err); } else {
              // add requesting user to other users friends list
              User.findOneAndUpdate({ _id: req.body.user_id },
                { $push: { friends: req.params.user_id } },
                function (err) {
                  if (err) { console.log(err); } else {
                    res.status(200)
                      .json({
                        status: 'success',
                        message: 'Friend is accepted'
                      });
                  }
                });
            }
          });
      }
    });
}

module.exports = {
  list_all_pending_event: listAllPendingEvents,
  list_all_pending_friends: listAllPendingFriends,
  add_to_pending_events: addToPendingEvents,
  add_to_pending_friends: addToPendingFriends,
  accept_pending_event: acceptPendingEvent,
  accept_pending_friend: acceptPendingFriend
};
