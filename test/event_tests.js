
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');

var should = chai.should(); //eslint-disable-line
var mongoose = require('mongoose'); //eslint-disable-line
var Event = require('../models/event_model');
var User = require('../models/user_model'); //eslint-disable-line

chai.use(chaiHTTP);

describe('Events', function () {
  var userID = '';
  var authTok = '';
  before(function (done) {
    var userLogin = {
      email: 'b@gmail.com',
      password: 'pass'
    };

    chai.request(app)
      .post('/api/users/signin')
      .send(userLogin)
      .end(function (err, res) {
        if (err) console.log(err);

        userID = res.body.user_id;
        authTok = 'JWT ' + res.body.token;
        done();
      });
  });

  beforeEach(function (done) {
    /*
    var event_1 = {
      user_id: '59da4b0e2cf90a31a9f2c079',
      title: 'Bart Day Care',
      description: 'Drop Bart off with Sandy',
      start_time: '2017-10-09T12:00:00Z',
      end_time: '2017-10-09T18:00:00Z',
      notes: ''
    };

    var new_event = new Event(event_1);
    */

    Event.remove({}, function (err) {
      if (err) { return err; }
      done();
    });
  });

  describe('/GET events', function () {
    it('it should GET a list of all events', function (done) {
      var event1 = {
        user_id: userID,
        title: 'Bart Day Care',
        description: 'Drop Bart off with Sandy',
        start_time: '2017-10-09T12:00:00.000Z',
        end_time: '2017-10-09T18:00:00.000Z',
        notes: ''
      };

      var newEvent = new Event(event1);

      newEvent.save(function (err, events) {
        if (err) return err;

        chai.request(app)
          .get('/api/users/' + newEvent.user_id + '/events')
          .set('Authorization', authTok)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.data[0].should.have.property('_id').eql('' + newEvent._id);
            res.body.data[0].should.have.property('title').eql('' + event1.title);
            res.body.data[0].should.have.property('description').eql('' + event1.description);
            res.body.data[0].should.have.property('start_time').eql('' + event1.start_time);
            res.body.data[0].should.have.property('end_time').eql('' + event1.end_time);
            res.body.data[0].should.have.property('notes').eql('' + event1.notes);
            res.body.data.should.have.lengthOf(1);
            done();
          });
      });
    });
  });

  describe('/POST events', function () {
    it('it should POST and create new event', function (done) {
      var event1 = {
        user_id: userID,
        title: 'Bart Day Care',
        description: 'Drop Bart off with Sandy',
        start_time: '2017-10-09T12:00:00.000Z',
        end_time: '2017-10-09T18:00:00.000Z',
        notes: ''
      };

      chai.request(app)
        .post('/api/users/' + event1.user_id + '/events')
        .set('Authorization', authTok)
        .send(event1)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Event created');
          done();
        });
    });
  });

  describe('DELETE events', function () {
    it('it should DELETE an event with the given id', function (done) {
      var event1 = {
        user_id: userID,
        title: 'Bart Day Care',
        description: 'Drop Bart off with Sandy',
        start_time: '2017-10-09T12:00:00.000Z',
        end_time: '2017-10-09T18:00:00.000Z',
        notes: ''
      };

      var newEvent = new Event(event1);

      newEvent.save(function (err, event) {
        if (err) { return err; }

        chai.request(app)
          .delete('/api/users/' + event.user_id + '/events/' + event._id)
          .set('Authorization', authTok)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('UPDATE events', function () {
    it('it should UPDATE an event with given id', function (done) {
      var event1 = {
        user_id: userID,
        title: 'Bart Day Care',
        description: 'Drop Bart off with Sandy',
        start_time: '2017-10-09T12:00:00.000Z',
        end_time: '2017-10-09T18:00:00.000Z',
        notes: ''
      };

      var updateEvent = {
        user_id: userID,
        title: 'Bart Day Care',
        description: 'Drop Bart off with Sandy',
        start_time: '2017-10-09T12:00:00.000Z',
        end_time: '2017-10-09T20:00:00.000Z',
        notes: ''
      };

      var newEvent = new Event(event1);

      newEvent.save(function (err, event) {
        if (err) { console.log(err); }

        chai.request(app)
          .put('/api/users/' + event.user_id + '/events/' + event._id)
          .set('Authorization', authTok)
          .send(updateEvent)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.should.have.property('message').eql('Event updated');
            done();
          });
      });
    });
  });
});
