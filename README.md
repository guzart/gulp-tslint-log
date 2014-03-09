gulp-tslint-log
===============

tslint plugin for gulp, that uses the gulp log to report any failures.

By default it checks for the `tslint.json` file in the current path, or you
can specify one by passing a string as the first argument. If the default 
`tslint.json` is used, you may override the options by passing an object
with the rules.

    var gulp = require('gulp');
    var tslintLog  = require('gulp-tslint-log');

    gulp.task('default', function () {
      return gulp
        .src('app/**/*.ts')
        .pipe(tslintLog({
            quotemark: [true, 'single'],
            semicolon: true
        }))
        .pipe(gulp.dest('dev'));
    });
