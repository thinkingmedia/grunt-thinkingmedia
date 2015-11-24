var _ = require('lodash');

/**
 * @param {grunt} grunt
 */
module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);
    var config = require('./lib/config').init(grunt);

    grunt.loadNpmTasks('grunt-contrib-sass');

    if (!grunt.task.exists('sass')) {
        grunt.fail.fatal('Expected task "sass" to be created by grunt-contrib-sass');
    }
    grunt.task.renameTask('sass', 'sassy');

    function rewrite(dest, src) {
        dest = path.resolve(dest) + path.sep;
        src = path.resolve(src).substr(options.src.length);
        var file = dest + src;
        var parse = path.parse(file);
        var outfile = parse.dir + path.sep + parse.name + ".css";
        grunt.verbose.writeln("Rename: " + outfile);
        return outfile;
    }

    grunt.config('sass',{
        dev: {

        },
        build: {

        }
    });

    grunt.task.registerMultiTask('sass', '', function(){

        var files = config.source();

        var options = {
            dev: {
                options: {
                    compass: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    src: [
                    ],
                    dest: './www/css',
                    rename: rewrite
                }]
            },
            prod: {
                options: {
                    compass: true,
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: [
                    ],
                    dest: './build/css',
                    rename: rewrite
                }]
            }
        }
    });
};