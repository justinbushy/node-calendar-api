
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');

// var mongoose = require('mongoose');
var Task = require('../models/task_model');
// var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Tasks', function () {
  var user1ID = '';
  var authTok1 = '';

  before(function (done) {
    var userLogin1 = {
      email: 'b@gmail.com',
      password: 'pass'
    };

    chai.request(app)
      .post('/api/users/signin')
      .send(userLogin1)
      .end(function (err, res) {
        if (err) return err;

        user1ID = res.body.user_id;
        authTok1 = 'JWT ' + res.body.token;
        done();
      });
  });

  beforeEach(function (done) {
    Task.remove({}, function (err) {
      if (err) { return err; }
      done();
    });
  });

  describe('/GET tasks', function () {
    it('it should GET a list of all tasks for the given user_id', function (done) {
      var task1 = {
        user_id: user1ID,
        title: 'Laundry',
        description: 'Wash, dry, fold',
        task_date: '2017-10-09T00:00:00.000Z',
        completed: false
      };

      var newTask = new Task(task1);

      newTask.save(function (err, tasks) {
        if (err) return err;

        chai.request(app)
          .get('/api/users/' + user1ID + '/tasks/')
          .set('Authorization', authTok1)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.data[0].should.have.property('_id').eql('' + newTask._id);
            res.body.data[0].should.have.property('title').eql('' + task1.title);
            res.body.data[0].should.have.property('description').eql('' + task1.description);
            res.body.data[0].should.have.property('task_date').eql('' + task1.task_date);
            res.body.data[0].should.have.property('completed').eql(task1.completed);
            res.body.data.should.have.lengthOf(1);
            res.body.should.have.property('message').eql('Retrieved all tasks for user');
            done();
          });
      });
    });
  });

  describe('POST tasks', function () {
    it('it should POST and create a task', function (done) {
      var task1 = {
        user_id: user1ID,
        title: 'Laundry',
        description: 'Wash, dry, fold',
        task_date: '2017-10-09T00:00:00.000Z',
        completed: false
      };

      chai.request(app)
        .post('/api/users/' + user1ID + '/tasks/')
        .set('Authorization', authTok1)
        .send(task1)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.data.should.have.property('user_id').eql('' + task1.user_id);
          res.body.data.should.have.property('title').eql('' + task1.title);
          res.body.data.should.have.property('description').eql('' + task1.description);
          res.body.data.should.have.property('task_date').eql('' + task1.task_date);
          res.body.data.should.have.property('completed').eql(task1.completed);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Task created');
          done();
        });
    });
  });

  describe('PUT tasks', function () {
    it('it should PUT and update a task', function (done) {
      var task1 = {
        user_id: user1ID,
        title: 'Laundry',
        description: 'Wash, dry, fold',
        task_date: '2017-10-09T00:00:00.000Z',
        completed: false
      };

      var updatedTask = {
        user_id: user1ID,
        title: 'Laundry',
        description: 'Wash, dry, fold, repeat',
        task_date: '2017-10-09T00:00:00.000Z',
        completed: false
      };

      var newTask = new Task(task1);

      newTask.save(function (err, task) {
        if (err) return err;

        chai.request(app)
          .put('/api/users/' + user1ID + '/tasks/' + task._id)
          .set('Authorization', authTok1)
          .send(updatedTask)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.data.should.have.property('user_id').eql('' + updatedTask.user_id);
            res.body.data.should.have.property('title').eql('' + updatedTask.title);
            res.body.data.should.have.property('description').eql('' + updatedTask.description);
            res.body.data.should.have.property('task_date').eql('' + updatedTask.task_date);
            res.body.data.should.have.property('completed').eql(updatedTask.completed);
            res.body.should.have.property('message').eql('Task updated');
            done();
          });
      });
    });
  });

  describe('DELETE tasks', function () {
    it('it should DELETE and remove a task with given id', function (done) {
      var task1 = {
        user_id: user1ID,
        title: 'Laundry',
        description: 'Wash, dry, fold',
        task_date: Date.now(),
        completed: false
      };

      var newTask = new Task(task1);

      newTask.save(function (err, res) {
        if (err) return err;

        chai.request(app)
          .delete('/api/users/' + user1ID + '/tasks/' + newTask._id)
          .set('Authorization', authTok1)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.should.have.property('message').eql('Task removed');
            done();
          });
      });
    });
  });
});
