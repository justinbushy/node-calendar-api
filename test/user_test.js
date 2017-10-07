
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app.js');
var should = chai.should();

chai.use(chaiHTTP);

describe('Users', function() {

    describe('/GET users', function() {
        it('it should GET a list of all users', function(done) {
            chai.request(app)
                .get('/api/users')
                .end(function(err, res) {
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
});

describe('Users', function() {

    var user = { id: '59d5178545dd57374e25855d' }
    describe('/GET users/:id', function() {
        it('it should GET a list of 1 user', function(done) {
            chai.request(app)
                .get('/api/users/' + user.id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id').eql(user.id);
                    res.body.data.should.have.property('first_name');
                    res.body.data.should.have.property('last_name');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('user_name');
                    res.body.data.should.have.property('password');
                    done();
                });
        });

    });
});

describe('Users', function() {

    var new_user = {
        first_name: 'Chelsey',
        last_name: 'Bush',
        email: 'cbush@gmail.com',
        user_name: 'cbush',
        password: 'letmein'
    }
    describe('/POST users', function() {
        it('it should POST and create new user', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(new_user)
                .end(function(err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});