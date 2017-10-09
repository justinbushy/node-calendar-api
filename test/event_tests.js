
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');

var mongoose = require('mongoose');
var Event = require('../models/event_model');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Events', function() {

    beforeEach(function(done) {
        var event_1 = {
            user_id: '59da4b0e2cf90a31a9f2c079',
            title: 'Bart Day Care',
            description: 'Drop Bart off with Sandy',
            start_time: '2017-10-09T12:00:00Z',
            end_time: '2017-10-09T18:00:00Z',
            notes: ''
        };


        var new_event = new Event(event_1);

        Event.remove({}, function(err) {
            if(err)
                return err;
            done();
        });
    });

    describe('/GET events', function() {
        it('it should GET a list of all events', function(done) {

            var event_1 = {
                user_id: '1111',
                title: 'Bart Day Care',
                description: 'Drop Bart off with Sandy',
                start_time: '2017-10-09T12:00:00.000Z',
                end_time: '2017-10-09T18:00:00.000Z',
                notes: ''
            };

            var new_event = new Event(event_1);


            new_event.save(function(err, events) {
                chai.request(app)
                    .get('/api/users/' + new_event.user_id + '/events')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.data[0].should.have.property('_id').eql('' + new_event._id);
                        res.body.data[0].should.have.property('title').eql('' + event_1.title);
                        res.body.data[0].should.have.property('description').eql('' + event_1.description);
                        res.body.data[0].should.have.property('start_time').eql('' + event_1.start_time);
                        res.body.data[0].should.have.property('end_time').eql('' + event_1.end_time);
                        res.body.data[0].should.have.property('notes').eql('' + event_1.notes);
                        res.body.data.should.have.lengthOf(1);
                        done();
                    });
            });

        });
    });

    describe('/POST events', function() {
        it('it should POST and create new event', function(done) {
            var event_1 = {
                user_id: '1111',
                title: 'Bart Day Care',
                description: 'Drop Bart off with Sandy',
                start_time: '2017-10-09T12:00:00.000Z',
                end_time: '2017-10-09T18:00:00.000Z',
                notes: ''
            };

            chai.request(app)
                .post('/api/users/' + event_1.user_id + '/events')
                .send(event_1)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Event created');
                    done();
                });


        });
    });

    describe('DELETE events', function() {
        it('it should DELETE an event with the given id', function(done) {

            var event_1 = {
                user_id: '1111',
                title: 'Bart Day Care',
                description: 'Drop Bart off with Sandy',
                start_time: '2017-10-09T12:00:00.000Z',
                end_time: '2017-10-09T18:00:00.000Z',
                notes: ''
            };

            var new_event = new Event(event_1);

            new_event.save(function(err, event) {
                if(err)
                    return err;
                chai.request(app)
                    .delete('/api/users/' + event.user_id + '/events/' + event._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        done();
                    });

            });

        });
    });
});
