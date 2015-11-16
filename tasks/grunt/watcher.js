module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    if (!grunt.task.exists('watch')) {
        grunt.fail.fatal('Expected task "watch" to be created by grunt-contrib-watch');
    }
    grunt.task.renameTask('watch', 'watcher');

    return function (options) {
        return {
            sass: {
                files: [
                    options.src + "**/*.scss"
                ],
                tasks: [
                    'dev'
                ],
                options: {
                    atBegin: true,
                    spawn: false,
                    interrupt: true
                }
            },
            js: {
                files: [
                    options.src + "**/*.js"
                ],
                tasks: [
                    'dev'
                ],
                options: {
                    atBegin: true,
                    event: ['added', 'deleted']
                }
            }
        }
    };
};
