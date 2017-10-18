
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');
// var should = chai.should();

// var mongoose = require('mongoose');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Users', function () {
  beforeEach(function (done) {
    var user1 = {
      first_name: 'Justin',
      last_name: 'Bush',
      email: 'jbush@gmail.com',
      user_name: 'jbush',
      password: 'letmein'
    };

    var user2 = {
      first_name: 'Bart',
      last_name: 'Bush',
      email: 'blackbart@gmail.com',
      user_name: 'blackbart',
      password: 'bones'

    };

    var newUser1 = new User(user1);
    var newUser2 = new User(user2);

    User.remove({}, function (err) {
      if (err) { return err; }
    }).then(newUser1.save(function (err) {
      if (err) { return err; }
    })).then(newUser2.save(function (err) {
      if (err) { return err; }
      done();
    }));
  });

  describe('/GET users', function () {
    it('it should GET a list of all users', function (done) {
      chai.request(app)
        .get('/api/users')
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
          res.body.data.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('GET /api/users/:user_id', function () {
    it('it should GET 1 user by the given id', function (done) {
      var newUser = {
        first_name: 'Nala',
        last_name: 'Bush',
        email: 'furrynala@gmail.com',
        user_name: 'babynala',
        password: 'scratch'
      };

      var insertUser = new User(newUser);

      insertUser.save(function (err, user) {
        if (err) return err;

        chai.request(app)
          .get('/api/users/' + user._id)
          .send(insertUser)
          .end(function (err, res) {
            if (err) return err;

            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.data.should.have.property('_id').eql('' + insertUser._id);
            res.body.data.should.have.property('first_name').eql('' + insertUser.first_name);
            res.body.data.should.have.property('last_name').eql('' + insertUser.last_name);
            res.body.data.should.have.property('email').eql('' + insertUser.email);
            res.body.data.should.have.property('user_name').eql('' + insertUser.user_name);
            res.body.data.should.have.property('password').eql('' + insertUser.password);
            done();
          });
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

  describe('DELETE /api/users/:id', function () {
    it('it should DELETE a user with the given id', function (done) {
      var newUser = {
        first_name: 'Chelsey',
        last_name: 'Bush',
        email: 'cbush@gmail.com',
        user_name: 'cbush',
        password: 'letmein'
      };
      var deleteUser = new User(newUser);
      deleteUser.save(function (err, user) {
        if (err) return err;

        chai.request(app)
          .delete('/api/users/' + user._id)
          .end(function (err, res) {
            if (err) { return err; }
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe('UPDATE /api/users/:id', function () {
    it('it should UPDATE a user with given id', function (done) {
      var user1 = {
        first_name: 'Chelsey',
        last_name: 'Bush',
        email: 'cbush@gmail.com',
        user_name: 'cbush',
        password: 'letmein'
      };

      /*
      var updateUser = {
        first_name: 'Chelsey',
        last_name: 'Bush',
        email: 'cbush@gmail.com',
        user_name: 'cbush',
        password: 'letmein2'
      };
      */

      var updateUser = {
        password: 'letmein2'
      };

      var newUser = new User(user1);

      newUser.save(function (err, user) {
        if (err) { console.log(err); }
        chai.request(app)
          .put('/api/users/' + user._id)
          .send(updateUser)
          .end(function (err, res) {
            if (err) { return err; } else {
              res.should.have.status(200);
              res.body.should.have.property('message').eql('User updated');
              done();
            }
          });
      });
    });
  });
});
