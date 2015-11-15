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

    grunt.task.registerTask('build', 'Builds the production version of the project.', function () {

    });

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {

    });

    grunt.task.registerMultiTask('thinkingmedia', 'Build tools for working on AngularJS projects.', function () {

        var self = this;
        var done = this.async();

        var options = this.options({
            // directories used during build
            www: './www',
            css: './www/css',
            src: './www/src',
            build: './build'
        });

        var checkDirectories = _.map(['www', 'css', 'src'],function(key){
            options[key] = path.resolve(options[key]);
            return fs.stat(options[key]).then(function(stat){
                if(!stat.isDirectory()){
                    throw Error('not a directory');
                }
            });
        });

        Q.all(checkDirectories).then(function(){
            //logger(this.target + ': ' + this.data);
            //logger(JSON.stringify(options));
            //logger(self.target);
            //logger('all done');
        }).catch(function(err){
            logger.error("Not A Directory: " + (err && err.path),err);
        }).finally(function(){
            done();
        });

    });

};
