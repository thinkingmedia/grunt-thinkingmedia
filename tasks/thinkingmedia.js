/*
 * grunt-thinkingmedia
 * https://github.com/mathew/grunt-thinkingmedia
 *
 * Copyright (c) 2015 ThinkingMedia
 * Licensed under the MIT license.
 */

var path = require('path');
var _ = require('lodash');
var fs = require('q-io/fs');
var Q = require('q');

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);

    // Each task has it's own JS file.
    var config = {};
    //config.pkg = grunt.file.readJSON('package.json');

    // Compass Tasks
    var sass = require('./grunt/sass.js')(grunt);

    function startUp(task) {
        var options = task.options({
            // directories used during build
            www: './www',
            css: './www/css',
            src: './www/src',
            build: './build'
        });
        var checkDirectories = _.map(['www', 'css', 'src'], function (key) {
            options[key] = path.resolve(options[key]) + "/";
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

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {
        var done = this.async();
        startUp(this).then(function (options) {
            //logger(options);

            grunt.config.set('sass',sass(options));
            grunt.task.run(['sass:dev']);


        }).finally(function () {
            done();
        });
    });

    grunt.task.registerTask('build', 'Builds the production version of the project.', function () {
        var done = this.async();
        startUp(this).then(function (options) {
            logger(options);
        }).finally(function () {
            done();
        });
    });

    // Initialize The Grunt Configuration
    grunt.config.merge(config);
};
