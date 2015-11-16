module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            tests: [
                'build',
                './www/css/App'
            ]
        },

        thinkingmedia: {
            options: {
                build: './build'
            },
            dev: {},
            prod: {}
        },

        nodeunit: {
            tests: ['test/**/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'dev', 'nodeunit']);
    grunt.registerTask('default', ['clean', 'dev']);
};
