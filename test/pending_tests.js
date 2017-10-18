
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app');

var should = chai.should(); //eslint-disable-line
var Pending = require('../models/pending_model');
var Event = require('../models/event_model');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Pending', function () {
  beforeEach(function (done) {
    Pending.remove({}, function (err) {
      if (err) return err;
      done();
    });
  });

  describe('/GET pending events', function () {
    it('it should GET a list of all pending events for user', function (done) {
      var pendingObj = {
        user_id: '1111',
        pending_events: [ '1234', '23456' ],
        pending_friends: []
      };

      var newPending = new Pending(pendingObj);

      newPending.save(function (err) {
        if (err) return err;

        chai.request(app)
          .get('/api/users/' + newPending.user_id + '/pending/events')
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
            res.body.should.have.property('message').eql('Retrieved all pending events for user');
            res.body.data[0].should.be.eql('1234');
            res.body.data[1].should.be.eql('23456');
            done();
          });
      });
    });
  });

  describe('/GET pending friends', function () {
    it('it should GET a list of all pending friends for user', function (done) {
      var pendingObj = {
        user_id: '1111',
        pending_events: [],
        pending_friends: [ '1112' ]
      };

      var newPending = new Pending(pendingObj);

      newPending.save(function (err) {
        if (err) return err;

        chai.request(app)
          .get('/api/users/' + newPending.user_id + '/pending/friends')
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.should.have.property('data');
            res.body.should.have.property('message').eql('Retrieved all pending friends for user');
            res.body.data[0].should.be.eql('1112');
            done();
          });
      });
    });
  });

  describe('/POST pending events', function () {
    it('it should POST and add to pending events', function (done) {
      var pendingObj = {
        user_id: '1111',
        pending_events: [ '1234' ],
        pending_friends: []
      };

      chai.request(app)
        .post('/api/users/' + pendingObj.user_id + '/events/share')
        .send(pendingObj)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Added event to users pending events');
          done();
        });
    });
  });

  describe('/POST pending friends', function () {
    it('it should POST and add to pending friends', function (done) {
      var pendingObj = {
        user_id: '1111',
        pending_events: [],
        pending_friends: [ '1112' ]
      };

      chai.request(app)
        .post('/api/users/' + pendingObj.user_id + '/friends')
        .send(pendingObj)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Added friend to users pending friends');
          done();
        });
    });
  });

  describe('/PUT pending events', function () {
    it('it should PUT and accept an event', function (done) {
      var user1 = {
        first_name: 'John',
        last_name: 'Smith',
        email: 'jsmith@ggg.com',
        user_name: 'jsmith',
        password: 'pass'
      };

      var user2 = {
        first_name: 'Jenny',
        last_name: 'Smith',
        email: 'jensmith@ggg.com',
        user_name: 'jensmith',
        password: 'pass'
      };

      var eventObj = {
        user_id: '',
        title: 'Go on date',
        description: 'Dinner and a movie',
        start_time: '2017-10-20T18:00:00.000Z',
        end_time: '2017-10-20T23:00:00.000Z',
        notes: ''
      };

      var pendingObj = {
        user_id: '',
        pending_events: [],
        pending_friends: []
      };

      var newUser1 = new User(user1);
      var newUser2 = new User(user2);
      var newEvent = new Event(eventObj);
      var newPend = new Pending(pendingObj);

      // save user1
      newUser1.save(function (err, retUser1) {
        if (err) return err;

        // save user2
        newUser2.save(function (err, retUser2) {
          if (err) return err;

          // save event with user1 id
          newEvent.user_id = retUser1._id;
          newEvent.save(function (err, retEvent) {
            if (err) return err;

            // save pending doc with user2 id
            newPend.user_id = retUser2._id;
            newPend.pending_events.push(retEvent._id);
            newPend.save(function (err, pend) {
              if (err) return err;

              var sendObj = { event_id: newEvent._id };
              chai.request(app)
                .put('/api/users/' + retUser2._id + '/pending/events')
                .send(sendObj)
                .end(function (err, res) {
                  if (err) return err;

                  res.should.have.status(200);
                  done();
                });
            });
          });
        });
      });
    });
  });

  describe('/PUT pending friends', function () {
    it('it should PUT and accept a friend', function (done) {
      var user1 = {
        first_name: 'John',
        last_name: 'Smith',
        email: 'jsmith@ggg.com',
        user_name: 'jsmith',
        password: 'pass'
      };

      var user2 = {
        first_name: 'Jenny',
        last_name: 'Smith',
        email: 'jensmith@ggg.com',
        user_name: 'jensmith',
        password: 'pass'
      };

      var pendingObj = {
        user_id: '',
        pending_events: [],
        pending_friends: []
      };

      var newUser1 = new User(user1);
      var newUser2 = new User(user2);
      var newPend = new Pending(pendingObj);

      // save user1
      newUser1.save(function (err, retUser1) {
        if (err) return err;

        // save user2
        newUser2.save(function (err, retUser2) {
          if (err) return err;

          newPend.user_id = retUser2._id;
          newPend.pending_friends.push(retUser1._id);
          newPend.save(function (err) {
            if (err) return err;

            var sendObj = { user_id: retUser1._id };
            chai.request(app)
              .put('/api/users/' + retUser2._id + '/friends')
              .send(sendObj)
              .end(function (err, res) {
                if (err) return err;

                res.should.have.status(200);
                done();
              });
          });
        });
      });
    });
  });
});