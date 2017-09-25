var db = require('../pg_config');


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

    db.one('select * from users where user_id = $1', userId)
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

    db.none('update users set first_name=$1, last_name=$2,' +
        'email=$3, user_name=$4, password=$5 where user_id=$6',
        [req.body.first_name, req.body.last_name, req.body.email,
        req.body.user_name, req.body.password, req.params.id])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {

    var userId = parseInt(req.params.id);
    db.result('delete from users where user_id=$1', userId)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
}