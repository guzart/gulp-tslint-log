/* jshint latedef: false */
/* global Lint */
'use strict';

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var merge = require('merge');
var tslint = require('tslint');

module.exports = tslintPlugin;

function tslintPlugin(config) {

    var configPath;
    if (typeof config === 'string') {
        configPath = config;
        config = undefined;
    }

    var options = {
        formatter: 'json',
        configuration: merge(
            true,
            Lint.Configuration.findConfiguration(configPath),
            { rules: config }
        )
    };

    return through.obj(objectStream);

    function objectStream(file, enc, cb) {
        /* jshint validthis: true */

        var _this = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            _this.emit('error', pluginError('Streaming not supported'));
            return cb();
        }

        try {
            var ll = new tslint(file.path, file.contents.toString(), options);
            var result = ll.lint();
            if (result.failureCount > 0) {
                var failures = JSON.parse(result.output);
                failures.forEach(logFailure);
            }
        } catch (err) {
            err.fileName = file.path;
            _this.emit('error', pluginError(err));
        }

        _this.push(file);

        cb();
    }
}

function logFailure(data) {
    var start = data.startPosition;
    gutil.log(
        gutil.colors.red('tslint:'),
        gutil.colors.cyan(path.relative(process.cwd(), data.name)),
        gutil.colors.magenta('[' + start.line + ', ' + start.character + ']:'),
        data.failure
    );
}

function pluginError(msg) {
    return new gutil.PluginError('gulp-tslint-log', msg);
}