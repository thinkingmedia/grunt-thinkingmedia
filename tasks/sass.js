var path = require('path');
var _ = require('lodash');

/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.load('grunt-contrib-sass');
    c.renameTask('sass', 'sassy');

    c.help('sass','Compiles the SASS files into CSS files.');

    grunt.task.registerTask('sass', c.getHelp('sass'), function (type) {

        // default is dev
        type = type || 'dev';

        var files = {
            expand: true,
            src: c.toSASS(c.config().files),
            dest: null,
            rename: rewrite
        };

        var options = {
            compass: true
        };

        function rewrite(dest, src) {
            dest = path.resolve(dest);
            src = path.resolve(src);

            var base = _.find(c.config().src, function (dir) {
                return _.startsWith(src, dir);
            });

            if (!base) {
                grunt.fail.fatal('Could not resolve source for: ' + src);
            }

            var parse = path.parse(src);
            var outfile = dest + path.sep + parse.name + (options.style === 'compressed' ? ".min.css" : ".css");

            grunt.log.writeln("SASS Output: " + outfile);

            return outfile;
        }

        switch (type) {

            case 'dev':
                files.dest = c.config().webroot + path.sep + 'css';
                options.lineNumbers = true;
                break;

            case 'build':
                files.dest = c.config().build + path.sep + 'css';
                options.sourcemap = 'none';
                options.style = 'compressed';
                break;

            default:
                grunt.fail.fatal("Unsupported SASS build type:"+type);
        }

        grunt.config('sassy', {
            build: {
                options: options,
                files: [files]
            }
        });

        grunt.task.run(['sassy:build']);
    });
};
