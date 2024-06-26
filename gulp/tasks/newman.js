'use strict';

require('dotenv').config({path: '.env'});

const gulp = require('gulp');
const exec = require('child_process').exec;

// Configurations
const config = require('../config');

// Run newman tests
gulp.task('newman', ['apidoc'], (cb) => {
    exec('node node_modules/newman/bin/newman run ' + config.newman.path +'*.collection ' + '-e ' + config.newman.path + process.env.NODE_ENV + '.environment',
        (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        }
    );
});