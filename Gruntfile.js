/*
 * grunt-thinkingmedia
 * https://github.com/mathew/grunt-thinkingmedia
 *
 * Copyright (c) 2015 ThinkingMedia
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            tests: ['build']
        },

        init: {
            options: {
                build: './build'
            },
        },

        thinkingmedia: {
            options: {
                build: './build'
            },
            dev: {
            },
            prod: {

            }
        },

        nodeunit: {
            tests: ['test/**/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    //grunt.registerTask('test', ['clean', 'thinkingmedia', 'nodeunit']);
    //grunt.registerTask('default', ['test']);
};
