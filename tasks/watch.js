var _ = require('lodash');

/**
 * @param {grunt} grunt
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    if (!grunt.task.exists('watch')) {
        grunt.fail.fatal('Expected task "watch" to be created by grunt-contrib-watch');
    }
    grunt.task.renameTask('watch', 'watcher');

    grunt.registerMultiTask('watch', 'Watches for changes to the SASS files, and Javascript files.', function () {
        // javascript files to watch
        var js = _.filter(this.filesSrc,function(file){
            return _.endsWith(file, ".js");
        });

        // SASS files to watch
        var sass = _.filter(this.filesSrc,function(file){
            return _.endsWith(file, ".scss") || _.endsWith(file, ".sass");
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