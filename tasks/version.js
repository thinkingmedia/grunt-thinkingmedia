var path = require('path');
var _ = require('lodash');

/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.load('grunt-bump');

    grunt.task.registerTask('increment', 'Handles the releasing of a new version', function () {

        var files = ['package.json'];

        if (grunt.file.exists('bower.json')) {
            files.push('bower.json');
        }

        grunt.config('bump', {
            options: {
                files: files,
                commit: false,
                createTag: false,
                push: false
            }
        });

        grunt.task.run(['bump']);
    });
    grunt.task.registerTask('inc', ['increment']);

    grunt.task.registerTask('version', 'Shows the current version in package.json', function () {
        var pkg = grunt.file.readJSON('package.json');
        c.log('Version: ' + pkg.version);
    });
    grunt.task.registerTask('ver', ['version']);
};