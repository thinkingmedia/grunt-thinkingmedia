var path = require('path');
var _ = require('lodash');
var fs = require('q-io/fs');
var Q = require('q');

exports.init = function (grunt) {

    return {
        defaults: function (task) {
            var options = task.options({
                // directories used during build
                www: './www',
                css: './www/css',
                src: './www/src',
                build: './build'
            });

            var checkDirectories = _.map(['www', 'css', 'src'], function (key) {
                options[key] = path.resolve(options[key]) + path.sep;
                return fs.stat(options[key]).then(function (stat) {
                    if (!stat.isDirectory()) {
                        throw Error('not a directory');
                    }
                });
            });

            return Q.all(checkDirectories).then(function () {
                return options;
            }).catch(function (err) {
                logger.error("Not A Directory: " + (err && err.path), err);
            });
        }
    }
};