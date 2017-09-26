var db = require('../pg_config');

/**
 * GET /events
 * @param req
 * @param res
 * @param next
 */
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

function createEvent(req, res, next) {

    db.none('insert into events(user_id, title,' +
        'description, start_date, end_date, start_time, end_time) ' +
        'values(${user_id}, ${title}, ${description}, ' +
        '${start_date}, ${end_date}, ${start_time}, ${end_time})',
        req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Created event'
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

function getEventsBetweenTime(req, res, next) {

    var times = parseURLTime(req.params.time);

}

function removeEvent(req, res, next) {

    var eventId = parseInt(req.params.event_id);
    db.result('delete from events where id=$1', eventId)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed event'
                });
        })
        .catch(function (err) {
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

function parseURLTime(time) {
   //HH:MM:SS T HH:MM:SS
    var times = time.split('T');
    return times;
}

module.exports = {
    getAllEvents: getAllEvents,
    getEventsOnDate: getEventsOnDate,
    getEventsBetweenTime: getEventsBetweenTime,
    creatEvent: createEvent,
    removeEvent: removeEvent
}