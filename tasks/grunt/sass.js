var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');

    return function (options) {

        function rewrite(dest, src) {
            dest = path.resolve(dest) + path.sep;
            src = path.resolve(src).substr(options.src.length);
            var file = dest + src;
            var parse = path.parse(file);
            var outfile = parse.dir + path.sep + parse.name + ".css";
            grunt.verbose.writeln("Rename: " + outfile);
            return outfile;
        }

        return {
            dev: {
                options: {
                    compass: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    src: [
                        options.src + "**/*.scss",
                        '!' + options.src + "**/_*.scss"
                    ],
                    dest: options.css,
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
                        options.src + "**/*.scss",
                        '!' + options.src + "**/_*.scss"
                    ],
                    dest: options.build + path.sep + 'css',
                    rename: rewrite
                }]
            }
        }
    }
};
