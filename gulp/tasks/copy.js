'use strict';

const gulp = require('gulp');
const copy = require('gulp-copy');

// Configurations
const config = require('../config');

// Copy Sass
gulp.task('copy:sass', ['sass'], () => {
    return gulp.src(config.sass.src)
        .pipe(gulp.dest(config.sass.dst));
});

// Copy Javascript
gulp.task('copy:js', ['js'], () => {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dst));
});

// Copy Images
gulp.task('copy:img', ['img'], () => {
    return gulp.src(config.img.src)
        .pipe(gulp.dest(config.img.dst));
});

// Copy everything
gulp.task('copy',['copy:sass', 'copy:js', 'copy:img']);