'use strict';

const gulp = require('gulp');

// Default task as a sequence of tasks
gulp.task('default', 
    [
        'clean', 
        'sass', 
        'js', 
        'img',
        'apidoc',
        'watch'
    ],
    () => {
        process.exit(0);
    }
);