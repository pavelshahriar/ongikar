'use strict';

// set constiables for environment
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//----------//
// DB Setup //
//----------//
// const dbName = 'ongikar';
// mongoose.connect('mongodb://localhost/' + dbName);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('And the promising DB is connected!');
// });

//---------------//
// Favicon Setup //
//---------------//
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//---------------//
// Logging Setup //
//---------------//
app.use(logger('dev'));

//--------------------//
// JSON Parsing Setup //
//--------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------------//
// Cookie Parsing Setup //
//----------------------//
app.use(cookieParser());

//---------------//
// Routing Setup //
//---------------//
const beBase = './src/';
app.use('/', require(beBase + 'routes/index'));
app.use('/api/users', require(beBase + 'routes/users'));

//-------------------------//
// Static Asset Path Setup //
//-------------------------//
app.use(express.static(path.join(__dirname, 'public')));

//------------//
// View Setup //
//------------//
var feBase = __dirname + '/app/';
app.set('views', path.join( feBase + 'views' ));
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname + '/app/views/layouts'),
    partialsDir: path.join(__dirname + '/app/views/partials')
}));
app.set('view engine', '.hbs');

//---------------------//
// Error Handler Setup //
//---------------------//
// catch 404 and forward to error handler
app.use(function(req,res,next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stack traces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;