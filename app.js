// set variables for environment
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//----------//
// DB Setup //
//----------//
var dbName = 'ongikar';
mongoose.connect('mongodb://localhost/' + dbName);
var db = mongoose.connection;
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

//---------------//
// Routing Setup //
//---------------//
app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

//------------//
// View Setup //
//------------//
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

//---------------------//
// Error Handler Setup //
//---------------------//
// catch 404 and forward to error handler
app.use(function(req,res,next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;