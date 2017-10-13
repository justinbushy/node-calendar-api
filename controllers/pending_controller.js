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
