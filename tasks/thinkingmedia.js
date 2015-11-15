/*
 * grunt-thinkingmedia
 * https://github.com/mathew/grunt-thinkingmedia
 *
 * Copyright (c) 2015 ThinkingMedia
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);

    grunt.task.registerMultiTask('thinkingmedia', 'Build tools for working on AngularJS projects.', function () {

        var options = this.options({
            uri: './www/',
            uriCss: './www/css/',
            uriImg: './www/img/',
            uriJs: './www/js/',
            uriSrc: './www/src/',
            uriBuild: './build/'
        });

        grunt.log.writeln(this.target + ': ' + this.data);
        grunt.log.writeln(JSON.stringify(this.options()));
    });

};
