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
                var devTasks = [];
                grunt.task.exists('pre-build') && devTasks.push('pre-build:dev');
                devTasks.push('sass:dev');
                if (grunt.config('index.dev')) {
                    grunt.task.exists('pre-index') && devTasks.push('pre-index:dev');
                    devTasks.push('index:dev');
                    grunt.task.exists('post-index') && devTasks.push('post-index:dev');
                }
                grunt.task.exists('post-build') && devTasks.push('post-build:dev');
                grunt.task.run(devTasks);
                break;
            case 'prod':

                if (c.config().templates !== false) {
                    // this will minify the HTML and copy it to the temp folder
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
                            // @todo zipObject was removed in latest Lodash versions.
                            files: _.zipObject(dests, sources)
                        }
                    });

                    // this will create the templates module for AngularJS
                    var templateModuleFile = c.config().temp + path.sep + c.config().templates + '.js';
                    grunt.config('html2js', {
                        options: {
                            base: c.config().temp,
                            module: c.config().templates,
                            quoteChar: '\'',
                            indentString: ''
                        },
                        prod: {
                            src: c.config().temp + '/**/*.html',
                            dest: templateModuleFile
                        }
                    });
                }

                var jsTarget = c.config().build + path.sep + 'js' + path.sep + c.config().name + '.min.js';
                var files = {};
                files[jsTarget] = c.toJS(c.config().files);
                if (c.config().templates !== false) {
                    // add the template module to the top so that it exists when the App is created.
                    files[jsTarget].unshift(templateModuleFile);
                }

                grunt.config('uglify.build', {
                    screwIE8: true,
                    files: files
                });

                var prodTasks = [];
                grunt.task.exists('pre-build') && prodTasks.push('pre-build.prod');
                if (grunt.file.exists(c.config().webroot + path.sep + 'css')) {
                    prodTasks.push('sass:build');
                }
                if (c.config().templates !== false) {
                    prodTasks.push('htmlmin');
                    prodTasks.push('html2js');
                }
                prodTasks.push('uglify:build');
                if (grunt.config('package')) {
                    grunt.task.exists('pre-package') && prodTasks.push('pre-package:prod');
                    prodTasks.push('package');
                    grunt.task.exists('post-package') && prodTasks.push('post-package:prod');
                }
                if (grunt.config('index.prod')) {
                    grunt.task.exists('pre-index') && prodTasks.push('pre-index:prod');
                    prodTasks.push('index:prod');
                    grunt.task.exists('post-index') && prodTasks.push('post-index:prod');
                }
                grunt.task.exists('post-build') && prodTasks.push('post-build:prod');
                grunt.task.run(prodTasks);
                break;
        }
    });

    c.help('desc', 'Compiles SASS and updates the index.html');
    grunt.task.registerTask('dev', c.getHelp('dev'), ['build:dev']);

    if (!grunt.config('default')) {
        grunt.task.registerTask('default', ['build:prod']);
    }
};
