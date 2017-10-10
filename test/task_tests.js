
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');

var mongoose = require('mongoose');
var Task = require('../models/task_model');
var User = require('../models/user_model');

chai.use(chaiHTTP);

describe('Tasks', function() {

    beforeEach(function(done) {

        Task.remove({}, function(err) {
            if(err)
                return err;
            done();
        });
    });

    describe('/GET tasks', function() {
        it('it should GET a list of all tasks for the given user_id', function(done) {

            var task_1 = {
                user_id: '1111',
                title: 'Laundry',
                description: 'Wash, dry, fold',
                task_date: '2017-10-09T00:00:00.000Z',
                completed: false
            };

            var new_task = new Task(task_1);

            new_task.save(function(err, tasks) {
                chai.request(app)
                    .get('/api/users/' + new_task.user_id + '/tasks/')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.data[0].should.have.property('_id').eql('' + new_task._id);
                        res.body.data[0].should.have.property('title').eql('' + task_1.title);
                        res.body.data[0].should.have.property('description').eql('' + task_1.description);
                        res.body.data[0].should.have.property('task_date').eql('' + task_1.task_date);
                        res.body.data[0].should.have.property('completed').eql(task_1.completed);
                        res.body.data.should.have.lengthOf(1);
                        res.body.should.have.property('message').eql('Retrieved all tasks for user');
                        done();
                    });
            });
        });
    });

    describe('POST tasks', function() {
        it('it should POST and create a task', function(done){
            var task_1 = {
                user_id: '1111',
                title: 'Laundry',
                description: 'Wash, dry, fold',
                task_date: '2017-10-09T00:00:00.000Z',
                completed: false
            };

            chai.request(app)
                .post('/api/users/' + task_1.user_id + '/tasks/')
                .send(task_1)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.data.should.have.property('user_id').eql('' + task_1.user_id);
                    res.body.data.should.have.property('title').eql('' + task_1.title);
                    res.body.data.should.have.property('description').eql('' + task_1.description);
                    res.body.data.should.have.property('task_date').eql('' + task_1.task_date);
                    res.body.data.should.have.property('completed').eql(task_1.completed);
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Task created');
                    done();
                });
        });
    });

    describe('PUT tasks', function() {
        it('it should PUT and update a task', function(done) {
            var task_1 = {
                user_id: '1111',
                title: 'Laundry',
                description: 'Wash, dry, fold',
                task_date: '2017-10-09T00:00:00.000Z',
                completed: false
            };

            var updated_task = {
                user_id: '1111',
                title: 'Laundry',
                description: 'Wash, dry, fold, repeat',
                task_date: '2017-10-09T00:00:00.000Z',
                completed: false
            };
            var new_task = new Task(task_1);

            new_task.save(function(err, task) {
                chai.request(app)
                    .put('/api/users/' + task.user_id + '/tasks/' + task._id)
                    .send(updated_task)
                    .end(function(err, res) {
                        res.should.have.status(200);
                    res.body.data.should.have.property('user_id').eql('' + updated_task.user_id);
                    res.body.data.should.have.property('title').eql('' + updated_task.title);
                    res.body.data.should.have.property('description').eql('' + updated_task.description);
                    res.body.data.should.have.property('task_date').eql('' + updated_task.task_date);
                    res.body.data.should.have.property('completed').eql(updated_task.completed);
                        res.body.should.have.property('message').eql('Task updated');
                        done();
                    });
            });
        });
    });

    describe('DELETE tasks', function() {
        it('it should DELETE and remove a task with given id', function(done) {
            var task_1 = {
                user_id: '1111',
                title: 'Laundry',
                description: 'Wash, dry, fold',
                task_date: Date.now(),
                completed: false
            };

            var new_task = new Task(task_1);

            new_task.save(function(err, res) {
                chai.request(app)
                    .delete('/api/users/' + new_task.user_id + '/tasks/' + new_task._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Task removed');
                        done();
                    });
            });
        });
    });
});