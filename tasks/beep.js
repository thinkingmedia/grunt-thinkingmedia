/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.help('beep', 'Plays a beep sound.');

    grunt.task.registerTask('beep', c.getHelp('beep'), function () {
        grunt.log.writeln("\x07");
    });
};