module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            tests: [
                'build',
                './www/css/App',
                './www/index.html'
            ]
        },

        source: {
            cwd: './www',
            src: [
                'src/**/*.js',
                '!**/*.Test.js',
                '!**/*_test.js'
            ]
        },

        index: {
            dev: {
                options: {
                    js: [
                        "bower/jquery/dest/jquery.js",
                        "bower/angular/angular.js",
                        "bower/lodash/lodash.js"
                    ],
                    // you will want to use cwd so valid URL paths are created.
                    include: {
                        cwd: './www',
                        src: [
                            'src/**/*.js',
                            '!**/*.Test.js',
                            '!**/*_test.js'
                        ]
                    },
                    css: [
                        "bower/normalize.css/normalize.css"
                    ],
                    data: {
                        api: 'http://api.example.com/'
                    },
                    version: 'test'
                },
                src: './www/_index.html',
                dest: './www/index.html'
            },
            build: {
                options: {
                    js: [
                        '/js/app.min.js'
                    ],
                    css: [
                        '/css/app.min.css'
                    ],
                    data: {
                        api: 'http://api.example.com/'
                    },
                    version: 'test'
                },
                src: './www/_index.html',
                dest: './build/index.html'
            }
        },

        package: {

            // package vendor libraries into a temp file
            vendors: {
                src: [
                    "./www/bower/jquery/dest/jquery.min.js",
                    "./www/bower/angular/angular.min.js",
                    "./www/bower/lodash/lodash.min.js"
                ],
                dest: "./build/js/vendors.min.js"
            },

            // package source code into a temp file
            source: {
                options: {
                    minify: true
                },
                src: [
                    './www/src/**/*.js'
                ],
                dest: "./build/js/source.min.js"
            },

            // package vendors and source together
            packageJs: {
                options: {
                    clear: [
                        './build/js/vendors.min.js',
                        './build/js/source.min.js'
                    ]
                },
                src: [
                    './build/js/vendors.min.js',
                    './build/js/source.min.js'
                ],
                dest: './build/js/app.min.js'
            },

            // package CSS files into temp file
            css: {
                options: {
                    minify: true
                },
                src: [
                    './www/css/**/*.css'
                ],
                dest: './build/css/source.min.css'
            },

            // package vendor and source CSS together
            cassJs: {
                options: {
                    clear: [
                        './build/css/source.min.css'
                    ]
                },
                src: [
                    './www/bower/normalize.css/normalize.css',
                    './build/css/source.min.css'
                ],
                dest: './build/css/app.min.css'
            }
        },

        nodeunit: {
            tests: ['test/**/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'index', 'package', 'nodeunit']);
    grunt.registerTask('default', ['test']);
};