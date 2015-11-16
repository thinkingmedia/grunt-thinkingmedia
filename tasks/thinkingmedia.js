/*
 * grunt-thinkingmedia
 * https://github.com/mathew/grunt-thinkingmedia
 *
 * Copyright (c) 2015 ThinkingMedia
 * Licensed under the MIT license.
 */

var _ = require('lodash');
//var fs = require('q-io/fs');
var Q = require('q');

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);
    var startUp = require('./lib/startUp').init(grunt);

    // Each task has it's own JS file.
    var config = {};
    //config.pkg = grunt.file.readJSON('package.json');

    var subTasks = _.map(['sass'], function (key) {
        grunt.verbose.writeln("Loading sub-task "+key);
        return {
            name: key,
            config: require('./grunt/' + key)(grunt)
        };
    });

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {
        var done = this.async();
        startUp.defaults(this)
            .then(function (options) {
                _.each(subTasks, function (subTask) {
                    grunt.config.set(subTask.name, subTask.config(options));
                    grunt.task.run([subTask.name + ':dev']);
                });
            })
            .finally(function () {
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
