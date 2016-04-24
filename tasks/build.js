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

    c.load('grunt-contrib-htmlmin');
    c.load('grunt-html2js');
    c.load('grunt-contrib-uglify');

    c.help('build', 'Performs all tasks to compile the target environment.');
    c.help('dev', 'Alias to perform build:dev for development assets only.');

    grunt.task.registerTask('build', c.getHelp('build'), function (type) {
        type = type || 'prod';

        switch (type) {
            case 'dev':
                grunt.task.run(['sass:dev']);
                if (grunt.config('index.dev')) {
                    grunt.task.run(['index:dev']);
                }
                break;
            case 'prod':

                if (c.config().templates !== false) {
                    // map source HTML to temp HTML paths.
                    var sources = c.toHTML(c.config().files);
                    var dests = _.map(sources, function (file) {
                        return c.config().temp + file.substr(c.config().webroot.length);
                    });

                    grunt.config('htmlmin', {
                        build: {
                            options: {
                                collapseWhitespace: true,
                                removeComments: true
                            },
                            files: _.zipObject(dests, sources)
                        }
                    });

                    var templatesFile = c.config().temp + path.sep + c.config().templates + '.js';
                    grunt.config('html2js', {
                        options: {
                            base: c.config().temp,
                            module: c.config().templates,
                            quoteChar: '\'',
                            indentString: ''
                        },
                        prod: {
                            src: c.config().temp + '/**/*.html',
                            dest: templatesFile
                        }
                    });
                }

                var jsTarget = c.config().build + path.sep + 'js' + path.sep + c.config().name + '.min.js';
                var files = {};
                files[jsTarget] = c.toJS(c.config().files);
                if (c.config().templates !== false) {
                    files[jsTarget].push(templatesFile);
                }

                grunt.config('uglify.build', {
                    screwIE8: true,
                    files: files
                });

                var tasks = [
                    //'build:dev'
                ];
                if (grunt.file.exists(c.config().webroot + path.sep + 'css')) {
                    tasks.push('sass:build');
                }
                if (c.config().templates !== false) {
                    tasks.push('htmlmin');
                    tasks.push('html2js');
                }
                tasks.push('uglify:build');
                if (grunt.config('package')) {
                    tasks.push('package');
                }
                if (grunt.config('index.prod')) {
                    tasks.push('index:prod');
                }
                grunt.task.run(tasks);
                break;
        }
    });

    c.help('desc', 'Compiles SASS and updates the index.html');
    grunt.task.registerTask('dev', c.getHelp('dev'), ['build:dev']);

    if (!grunt.config('default')) {
        grunt.task.registerTask('default', ['build:prod']);
    }
};
