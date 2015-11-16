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
            index: {
                js: [
                    "bower/jquery/dest/jquery.js",
                    "bower/angular/angular.js",
                    "bower/lodash/lodash.js"
                ],
                css: [
                    "bower/normalize.css/normalize.css",
                    "css/App/App.css"
                ],
                data: {
                    api: 'http://api.example.com/'
                },
                version: 'test'
            }
        },

        prod: {
            concat: {
                full: {
                    js: 'js/app.js',
                    css: 'css/app.css'
                },
                min: {
                    js: 'js/app.min.js',
                    css: 'css/app.min.css'
                }
            },
            minify: {
                js: [
                    "bower/jquery/dest/jquery.min.js",
                    "bower/angular/angular.min.js",
                    "bower/lodash/lodash.min.js"
                ],
                css: [
                    'bower/normalize.css/normalize.css',
                    'css/App/App.css'
                ]
            },
            index: {
                js: [
                    "js/app.min.js"
                ],
                css: [
                    'css/app.min.css'
                ],
                data: {
                    api: 'http://api.example.com/'
                },
                version: 'test',
            },
            copy: [
                '.htaccess',
                'img/**/*.*'
            ]
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
