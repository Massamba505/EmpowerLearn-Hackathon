
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var authRouter = require('./routes/auth.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../frontend',"index.html")));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);

module.exports = app;
