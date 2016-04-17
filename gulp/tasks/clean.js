'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');

// Configurations
const config = require('../config');

// Clean the sass destination directory
gulp.task('clean:sass',() => {
    return gulp.src(config.sass.dst)
        .pipe(clean({
            force:true
        }));
});

// Clean the js destination directory
gulp.task('clean:js',() => {
    return gulp.src(config.js.dst)
        .pipe(clean({
            force:true
        }));
});

// Clean the img destination directory
gulp.task('clean:img',() => {
    return gulp.src(config.img.dst)
        .pipe(clean({
            force:true
        }));
});

gulp.task('clean', ['clean:sass', 'clean:js', 'clean:img']);