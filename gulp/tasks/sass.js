'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

// Configurations
const config = require('../config');

// Compile Sass file
gulp.task('sass', ['clean'], () => {
    return gulp.src(config.sass.src)
        .pipe(sass())
        .pipe(rename(config.sass.name))
        .pipe(gulp.dest(config.sass.dst));
});
