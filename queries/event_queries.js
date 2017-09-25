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

function getEventsOnDate(req, res, next) {

    var dateStr = parseURLDate(req.params.date);
    console.log(dateStr);
    db.any('select * from events where user_id=$1 and start_date=$2', [req.params.id,
        dateStr])
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all events on this date'
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

function parseURLDate(date) {
    //yyyy mm dd
    var year = date.substring(0,4);
    var month = date.substring(4,6);
    var day = date.substring(6,8);

    var retStr = year + '-' + month + '-' + day;
    return retStr;
}

module.exports = {
    getAllEvents: getAllEvents,
    getEventsOnDate: getEventsOnDate
}