'use strict';

require('dotenv').config();

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
const connectionString = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
mongoose.connect(connectionString, {user: process.env.DB_USER, pass: process.env.DB_PASS});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('And the promising DB is connected!');
});

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

//-------------------------//
// Static Asset Path Setup //
//-------------------------//
app.use(express.static(path.join(__dirname, 'public')));
// apidoc static page
app.use('/api', express.static(path.join(__dirname, 'public/api/doc')));

//---------------//
// Routing Setup //
//---------------//
const beBase = './src/';
// web routes
app.use('/', require(beBase + 'routes/index'));
// api routes
app.use('/api/users', require(beBase + 'api/users'));
app.use('/api/promises', require(beBase + 'api/promises'));

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
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stack traces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;