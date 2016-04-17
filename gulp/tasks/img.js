'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// Configurations
const config = require('../config');

// Minify the images
gulp.task('img', ['clean'], () => {
    return gulp.src(config.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(config.img.dst));
});