gulp-tslint-log
===============

## Information

<table>
<tr> 
<td>Package</td><td>gulp-tslint-log</td>
</tr>
<tr>
<td>Description</td>
<td>tslint plugin for gulp, that uses the gulp log to report any failures.<br>
It does not modify the files in the stream, it simply analyses them.<br>
Based of <a href="https://github.com/panuhorsmalahti/gulp-tslint">gulp-tslint</a>.
</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>


## Usage

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

By default it checks for the `tslint.json` file in the current path, or you
can specify one by passing a string as the first argument. If the default 
`tslint.json` is used, you may override the options by passing an object
with the rules.

More information on about the available
<a href="https://github.com/palantir/tslint">tslint options</a>.