var db = require('../pg_config');

function getAllEvents(req, res, next) {

    db.any('select * from events where user_id=$1', req.params.id)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all events for user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllEvents: getAllEvents
}