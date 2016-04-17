'use strict';

const gulp = require('gulp');

// Configurations
const config = require('../config');

// Watch All
gulp.task('watch', () => {
    gulp.watch([config.sass.src],['sass']);
    gulp.watch([config.js.src], ['js']);
    gulp.watch([config.img.src], ['img']);
});
