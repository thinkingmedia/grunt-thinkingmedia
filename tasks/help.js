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

    c.help('help', 'Displays a list of actions managed by grunt-thinkingmedia.');

    grunt.task.registerTask('help', c.getHelp('help'), function () {

        grunt.log.writeln('');
        grunt.log.writeln('This help pertains to grunt-thinkingmedia only.');
        grunt.log.writeln('');
        grunt.log.writeln('Tasks:');
        grunt.log.writeln('');

        var len = _.max(_.map(c.getHelp(), function (item) {
            return item.name.length;
        }));

        _.each(c.getHelp(), function (item) {
            grunt.log.writeln("  " + _.padEnd(item.name, len + 1) + item.desc);
        });
    });
};