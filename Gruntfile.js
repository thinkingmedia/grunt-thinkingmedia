module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            tests: [
                'build',
                './www/css/App',
                './www/index.html'
            ]
        },

        dev: {
            options: {
                build: './build'
            },
            index: {
                js: [
                    "http://www.example.com/extra.js",
                    "bower/component/dist/component.min.js"
                ],
                css: [
                    "http://www.example.com/extra.css",
                    "bower/component/dist/component.css",
                    "css/App/App.css"
                ],
                data: {
                    api: 'http://api.example.com/'
                },
                version: 'test'
            }
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
