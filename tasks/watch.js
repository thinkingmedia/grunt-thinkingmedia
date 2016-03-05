var _ = require('lodash');

/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.load('grunt-contrib-watch');
    c.renameTask('watch', 'watcher');

    c.help('watch', 'Watches for changes to the SASS files, and Javascript files.');

    grunt.config('watch', {});

    grunt.task.registerTask('watch', c.getHelp('watch'), function () {

        // SASS files to watch
        var sass = _.map(c.config().src, function (dir) {
            return dir + '/**/*.s[ac]ss';
        });

        var watch = {
            sass: {
                options: {
                    atBegin: true,
                    spawn: false,
                    interrupt: true
                },
                files: sass,
                tasks: [
                    'sass:dev',
                    'beep'
                ]
            }
        };

        if (grunt.config('index.dev')) {
            // javascript files to watch
            var js = _.map(c.config().src, function (dir) {
                return dir + '/**/*.js';
            });
            watch['js'] = {
                options: {
                    atBegin: true,
                    event: ['added', 'deleted']
                },
                files: js,
                tasks: [
                    'index:dev',
                    'beep'
                ]
            };
        }

        grunt.config('watcher', watch);
        grunt.task.run(['watcher']);
    });
};