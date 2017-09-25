var promise = require('bluebird');

var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/calendar';
var db = pgp(connectionString);

module.exports = db;