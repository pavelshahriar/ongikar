'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Configurations
const config = require('../config');

// Check, Uglify & Minify Javascripts
gulp.task('js', ['clean'], () => {
    return gulp.src(config.js.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat(config.js.name))
        .pipe(gulp.dest(config.js.dst));
});