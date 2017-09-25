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

    var userId = parseInt(req.params.id);

    db.one('select * from users where id = $1', userId)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'retrieved one user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createUser(req, res, next) {

    db.none('insert into users(first_name, last_name,' +
        'email, user_name, password) ' +
        'values(${first_name}, ${last_name}, ${email}, ' +
        '${user_name}, ${password})',
        req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Created user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
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