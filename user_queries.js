var promise = require('bluebird');

var options = {
    //Initialize Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/calendar';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
    db.any('select * from users')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleUser(req, res, next) {

}

function createUser(req, res, next) {

}

function updateUser(req, res, next) {

}

function removeUser(req, res, next) {

}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
}