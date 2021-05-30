const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const apiRouter = require('./routes/api');
const auth = require('./utils/auth');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./utils/db');

// Authorize user
app.use(function(req, res, next) {
  auth.authorize(req, res, next);
});


app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {


  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
