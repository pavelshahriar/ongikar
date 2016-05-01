'use strict';

const gulp = require('gulp');
const apidoc = require('gulp-apidoc');

// Configurations
const config = require('../config');

// Generate apidoc
gulp.task('apidoc', ['clean', 'sass', 'js', 'img'], (done) => {
    apidoc({
        src: config.apidoc.src,
        dest: config.apidoc.dst,
        debug: true,
        includeFilters: [ ".*\\.js$" ]
    }, done);
});