var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
var mongoose = require('mongoose');

var index = require('./routes/index');
var userRoutes = require('./routes/user_routes');
var eventsRoutes = require('./routes/event_routes');
var taskRoutes = require('./routes/task_routes');
var pendingRoutes = require('./routes/pending_routes');

var app = express();

var secret = process.env.JWT_SECRET ||  '26073B5085EF60DC6FD0BD416D8DDE5F4B71CF222A21C4BF1CD31485273C06B8'
// Mongoose connection
var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/Calendardb';
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// JWT middleware
app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'JWT') {
    console.log('has auth header');
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      secret,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
  }
  else {
    console.log('no auth header');
    req.user = undefined;
    next();
  }
});

// Routes
app.use('/', index);
app.use('/api', userRoutes);
app.use('/api', eventsRoutes);
app.use('/api', taskRoutes);
app.use('/api', pendingRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
