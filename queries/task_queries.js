var db = require('../pg_config');

function getAllTasks(req, res, next) {

    db.any('select * from tasks where user_id=$1', req.params.id)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all tasks for user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createTask(req, res, next) {

    db.none('insert into tasks(user_id, title,' +
        'description, task_date, completed) ' +
        'values(${user_id}, ${title}, ${description}, ' +
        '${task_date}, ${completed})',
        req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Created task'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeTask(req, res, next) {

    var  taskId = parseInt(req.params.task_id);
    db.none('delete from tasks where id=$1', taskId)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed task'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllTasks: getAllTasks,
    createTask: createTask,
    removeTask: removeTask
}