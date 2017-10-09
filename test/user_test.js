
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');
var should = chai.should();

var mongoose = require('mongoose');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Users', function() {

    beforeEach(function(done) {
        var user_1 = {
            first_name: 'Justin',
            last_name: 'Bush',
            email: 'jbush@gmail.com',
            user_name: 'jbush',
            password: 'letmein'
        };

        var user_2 = {
            first_name: 'Bart',
            last_name: 'Bush',
            email: 'blackbart@gmail.com',
            user_name: 'blackbart',
            password: 'bones'

        };

        var new_user_1 = new User(user_1);
        var new_user_2 = new User(user_2);

        User.remove({}, function(err) {
            if(err)
                return err;

        }).then(new_user_1.save(function(err){
            if(err)
                return err;
        })).then(new_user_2.save(function(err){
            if(err)
                return err;
            done();
        }));

    });

    describe('/GET users', function () {
        it('it should GET a list of all users', function (done) {
            chai.request(app)
                .get('/api/users')
                .end(function (err, res) {
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

    describe('GET /api/users/:user_id', function() {
        it('it should GET 1 user by the given id', function(done) {
            var new_user = {
                first_name: 'Nala',
                last_name: 'Bush',
                email: 'furrynala@gmail.com',
                user_name: 'babynala',
                password: 'scratch'
            };

            var insert_user = new User(new_user);

            insert_user.save(function(err, user) {
                chai.request(app)
                    .get('/api/users/' + user._id)
                    .send(insert_user)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('data');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.data.should.have.property('_id').eql('' + insert_user._id);
                        res.body.data.should.have.property('first_name').eql('' + insert_user.first_name);
                        res.body.data.should.have.property('last_name').eql('' + insert_user.last_name);
                        res.body.data.should.have.property('email').eql('' + insert_user.email);
                        res.body.data.should.have.property('user_name').eql('' + insert_user.user_name);
                        res.body.data.should.have.property('password').eql('' + insert_user.password);
                        done();
                    });
            });

        });
    });

    describe('/POST users', function () {
        it('it should POST and create new user', function (done) {
            var new_user = {
                first_name: 'Chelsey',
                last_name: 'Bush',
                email: 'cbush@gmail.com',
                user_name: 'cbush',
                password: 'letmein'
            };
            chai.request(app)
                .post('/api/users')
                .send(new_user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('DELETE /api/users/:id', function() {
        it('it should DELETE a user with the given id', function(done){

            var new_user = {
                first_name: 'Chelsey',
                last_name: 'Bush',
                email: 'cbush@gmail.com',
                user_name: 'cbush',
                password: 'letmein'
            };
            var delete_user = new User(new_user);
            delete_user.save(function(err, user){
                chai.request(app)
                    .delete('/api/users/' + user._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });

        });
    });

});