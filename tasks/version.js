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

    c.help('increment', 'Handles the releasing of a new version');
    c.alias('increment', 'inv');
    c.help('version', 'Shows the current version in package.json');
    c.alias('version', 'ver');

    grunt.task.registerTask('increment', c.getHelp('increment'), function () {

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

    grunt.task.registerTask('version', c.getHelp('version'), function () {
        var pkg = grunt.file.readJSON('package.json');
        c.log('Version: ' + pkg.version);
    });
    grunt.task.registerTask('ver', ['version']);
};