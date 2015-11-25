var _ = require('lodash');

/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);
    c.renameTask('watch','watcher');

    grunt.config('watch',{});

    grunt.task.registerTask('watch', 'Watches for changes to the SASS files, and Javascript files.', function () {

        // javascript files to watch
        var js = _.map(c.config().src,function(dir){
            return dir + '/**/*.js';
        });

        // SASS files to watch
        var sass = _.map(c.config().src,function(dir){
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
                    'sass:dev'
                ]
            },
            js: {
                options: {
                    atBegin: true,
                    event: ['added', 'deleted']
                },
                files: js,
                tasks: [
                    'index:dev'
                ]
            }
        };

        grunt.config('watcher', watch);
        grunt.task.run(['watcher']);
    });
};