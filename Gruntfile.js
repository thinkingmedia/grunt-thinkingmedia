module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            tests: [
                'build',
                './www/css/App',
                './www/index.html'
            ]
        },

        readme_generator: {
            readme: {
                options: {
                    github_username: 'thinkingmedia',
                    travis_branch: 'master'
                },
                order: {
                    'usage.md': 'Usage',
                    'index.md': 'Index Task',
                    'package.md': 'Package Task'
                }
            }
        },

        sources: {
            'app.js': [
                './www/src'
            ],
            'app.css': [
                './css/App/App.css'
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
                src: [
                    './www/src/**/*.js'
                ],
                minify: true,
                dest: "./build/js/source.min.js"
            },

            // package vendors and source together
            packageJs: {
                src: [
                    './build/js/vendors.min.js',
                    './build/js/source.min.js'
                ],
                dest: './build/js/app.min.js',
                clear: [
                    './build/js/vendors.min.js',
                    './build/js/source.min.js'
                ]
            },

            // package CSS files into temp file
            css: {
                src: [
                    './www/css/**/*.css'
                ],
                minify: true,
                dest: './build/css/source.min.css'
            },

            // package vendor and source CSS together
            cassJs: {
                src: [
                    './www/bower/normalize.css/normalize.css',
                    './build/css/source.min.css'
                ],
                dest: './build/css/app.min.css',
                clear: [
                    './build/css/source.min.css'
                ]
            }
        },

        nodeunit: {
            tests: ['test/**/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-readme-generator');

    grunt.registerTask('test', ['clean', 'dev', 'nodeunit']);
    grunt.registerTask('default', ['clean', 'dev']);
};
