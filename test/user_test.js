
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');
// var should = chai.should();

// var mongoose = require('mongoose');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Users', function () {
  var user1ID = '';
  var authTok1 = '';

  beforeEach(function (done) {
    var user1 = {
      first_name: 'Justin',
      last_name: 'Bush',
      email: 'jbush@gmail.com',
      user_name: 'jbush',
      password: 'letmein'
    };

    // var newUser1 = new User(user1);
    // var userList = [ user1.user_name ];
    // var user1login = { email: user1.email, password: user1.password };

    User.remove({ email: user1.email }, function (err) {
      if (err) return err;

      chai.request(app)
        .post('/api/users')
        .send(user1)
        .end(function (err, res) {
          if (err) return console.log(err);
          else {
            user1ID = res.body.user_id;
            authTok1 = 'JWT ' + res.body.token;
            done();
          }
        });
    });
  });

  describe('/GET users', function () {
    it('it should GET a list of all users', function (done) {
      chai.request(app)
        .get('/api/users')
        .set('Authorization', authTok1)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('_id');
          res.body.data[0].should.have.property('first_name');
          res.body.data[0].should.have.property('last_name');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('user_name');
          res.body.data[0].should.have.property('password');
          done();
        });
    });
  });

  describe('GET /api/users/:user_id', function () {
    it('it should GET 1 user by the given id', function (done) {
      chai.request(app)
        .get('/api/users/' + user1ID)
        .set('Authorization', authTok1)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.have.property('_id').eql('' + user1ID);
          done();
        });
    });
  });

  describe('/POST users', function () {
    it('it should POST and create new user', function (done) {
      var newUser = {
        first_name: 'Chelsey',
        last_name: 'Bush',
        email: 'cbush@gmail.com',
        user_name: 'cbush',
        password: 'letmein'
      };
      User.remove({ user_name: 'cbush' }, function (err) {
        if (err) return err;

        chai.request(app)
          .post('/api/users')
          .send(newUser)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('DELETE /api/users/:id', function () {
    it('it should DELETE a user with the given id', function (done) {
      chai.request(app)
        .delete('/api/users/' + user1ID)
        .set('Authorization', authTok1)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          done();
        });
    });
  });

  describe('UPDATE /api/users/:id', function () {
    it('it should UPDATE a user with given id', function (done) {
      var updatedUser = {
        first_name: 'Justin',
        last_name: 'Bush',
        email: 'jbush@gmail.com',
        password: 'letmein2'
      };

      chai.request(app)
        .put('/api/users/' + user1ID)
        .set('Authorization', authTok1)
        .send(updatedUser)
        .end(function (err, res) {
          if (err) return err;

          res.should.have.status(200);
          done();
        });
    });
  });
});
