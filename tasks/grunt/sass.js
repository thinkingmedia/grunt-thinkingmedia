var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');

    return function (options) {
        return {
            dev: {
                options: {
                    compass: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    src: [
                        options['src'] + "**/*.scss",
                        '!' + options['src'] + "**/_*.scss"
                    ],
                    dest: options['css'],
                    rename: function (dest, src) {
                        // rewrite the source path to dest
                        dest = path.resolve(dest) + path.sep;
                        src = path.resolve(src).substr(options['src'].length);
                        var file = dest + src;
                        var parse = path.parse(file);
                        var outfile = parse.dir + path.sep + parse.name + ".css";

                        grunt.verbose.writeln("Rename: " + outfile);

                        return outfile;
                    }
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
                    src: [grunt.uriSrc + "/UI.scss"],
                    rename: function () {
                        return options['css'] + "thinkingmedia-ui.min.css"
                    }
                }]
            }
        }
    }
};
