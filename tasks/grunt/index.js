var _ = require('lodash');

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

        function toValue(value) {
            return _.isFunction(value) ? value() : value;
        }

        function toArray(value) {
            value = toValue(value);
            return _.isArray(value) ? value : [value];
        }

        function toObject(value) {
            value = toValue(value);
            if (_.isObject(value)) {
                return value;
            }
            grunt.warn("index.data was not an object. Value is ignored.")
            return {};
        }

        return {
            options: {
                js: toArray(options.index.js || []),
                css: toArray(options.index.css || []),
                data: toObject(options.index.data || {}),
                www: options.www,
                template: toValue(options.index.template) || (options.www + '_index.html'),
                dest: toValue(options.index.dest) || (options.www + 'index.html'),
                version: toValue(options.index.version) || 'auto'
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
