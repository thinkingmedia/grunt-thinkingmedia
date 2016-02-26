/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.help('peers', 'Displays a list of peer dependencies required by grunt-thinkingmedia.');

    grunt.task.registerTask('peers', c.getHelp('peers'), function () {
    });
};