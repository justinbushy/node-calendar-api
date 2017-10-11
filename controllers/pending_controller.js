'use strict'

var mongoose = require('mongoose');

var pending_model = require('../models/pending_model');
var Pending = mongoose.model('Pending');

function list_all_pending_events(req, res) {
    Pending.find({user_id: req.params.user_id}, function(err, events) {
        if(err)
            res.send(err);
        res.status(200)
            .json({
                status: 'success',
                data: events,
                message: 'Retrieved all pending events for user'
            });
    });
}

function add_to_pending_events(req, res) {

    Pending.find({user_id: req.body.user_id}, function(err, pends) {
        if(pends.length){
            //already exists, update document
            var pending_doc = pends[0];
            pending_doc.pending.push(req.body.pending);
            pending_doc.save(function(err){
                if(err)
                    console.log(err);
                else{
                    res.status(200)
                        .json({
                            status: 'success',
                            message: 'Added event to users pending events'
                        })
                }
            });
            /*
            Pending.update(
                {user_id: req.body.user_id},
                {$push: { pending: req.body.pending }},
                function(err, event) {
                    if(err)
                        console.log(err);
                    else
                        res.status(200)
                            .json({
                                status: 'success',
                                message: 'Added event to users pending events'
                            });
                }

            );
            */
        }
        else {
            //Does not exist, create new one
            var pend = {
                user_id: req.body.user_id,
                pending: req.body.pending
            };

            console.log('pend: ' +pend);

            var new_pending = new Pending(pend);

            new_pending.save(function(err) {
                if(err)
                    res.send(err)
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Added event to users pending events'
                    });
            });
        }
    });
}

module.exports = {
    list_all_pending_event: list_all_pending_events,
    add_to_pending_events: add_to_pending_events
};