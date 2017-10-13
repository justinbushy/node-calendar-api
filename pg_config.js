var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

// Used for AWS deployment
/* var cn = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: 'calendar',
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD
} */

// Used for local deployment
var cn = 'postgres://localhost:5432/calendar';
var db = pgp(cn);

module.exports = db;
