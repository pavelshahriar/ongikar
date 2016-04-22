"user strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

/* GET contact page. */
router.get('/contact', function (req, res) {
    res.render('contact');
});

module.exports = router;
