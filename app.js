var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var logger = require('morgan');

// var usersRouter = require('./routes/users');
var dbIndex = require('./schemas/index');
var app = express();
dbIndex();

// var CORS = require('cors');
// app.use(CORS);

// view engine setup
// app.set('views', path.join(__dirname, 'alcuk/build'));
app.set('view engine', 'jade');
// app.options('/', function (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.end();
// });
app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, './alcuk/build')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const port = process.env.PORT || 5000;
// app.listen(port);
// app.listen(80, function () {
//     console.log('CORS-enabled web server listening on port 80')
// });

// console.log('App is listening on port ' + port);

module.exports = app;
