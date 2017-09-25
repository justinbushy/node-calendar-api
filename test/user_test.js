
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
                    res.body.data.should.have.lengthOf(1);
                    done();
                });
        });
    });
});