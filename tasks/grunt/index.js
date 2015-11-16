var _ = require('lodash');
var values = require('../lib/values');

module.exports = function (grunt) {

    function process(url) {
        if (/^(https?|file|ftp):\/\//.test(url)) {
            return url;
        }
        if (url[0] != '/') {
            url = '/' + url;
        }
        return url;
    }

    grunt.registerMultiTask('index', "Compiles the _index.html template to index.html", function () {
        var self = this;
        var options = this.options();

        function version() {
            if(options.version === 'auto') {
                var pkg = grunt.file.readJSON('package.json');
                return pkg.version || 0;
            }
            return options.version || 0;
        }


        grunt.file.copy(options.template, options.dest, {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: _.extend({
                        scripts: _.map(options.js.concat(self.filesSrc), process),
                        styles: _.map(options.css, process),
                        version: version()
                    }, options.data)
                });
            }
        });
    });

    return function (options) {
        return {
            options: {
                js: values.toArray(options.index.js || []),
                css: values.toArray(options.index.css || []),
                data: values.toObject(options.index.data || {}),
                www: options.www,
                template: values.toValue(options.index.template) || (options.www + '_index.html'),
                dest: values.toValue(options.index.dest) || (options.www + 'index.html'),
                version: values.toValue(options.index.version) || 'auto'
            },
            files: {
                cwd: options.src,
                // sets the order files are added to index.html
                src: [
                    '*/*.js',
                    '*/*/*.js',
                    '*/*/*/*.js',
                    '*/*/*/*/*.js',
                    '*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*/*/*/*/*.js',
                    '*/*/*/*/*/*/*/*/*/*/*/*.js',
                    '!**/*.Test.js',
                    '!**/*_test.js'
                ]
            }
        };
    };
};
