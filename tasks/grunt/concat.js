var path = require('path');
var _ = require('lodash');
var values = require('../lib/values');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    return function (options) {

        //files.push('!' + grunt.uriSrc + '**/Templates.js');
        //files.push(grunt.uriBuild + 'js/templates.js');

        console.log('*********************************');
        console.log(options);
        console.log('*********************************');

        var fileName = values.toValue(options.concat.source) || '_tmp_source.js';

        return {
            source: {
                src: [
                    options.src + '*/*.js',
                    options.src + '*/*/*.js',
                    options.src + '*/*/*/*.js',
                    options.src + '*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*/*/*/*/*.js',
                    options.src + '*/*/*/*/*/*/*/*/*/*/*/*.js',
                    '!' + options.src + '**/*.Test.js',
                    '!' + options.src + '**/*_test.js'
                ],
                dest: options.build + path.sep + 'js' + path.sep + fileName
            },
            css: {
                src: [
                    options.build + path.sep + 'css/**/*.css'
                ],
                dest: options.build + path.sep + 'css' + path.sep + '_tmp_source.css'
            }
        };
    };
};
