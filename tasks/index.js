var _ = require('lodash');

/**
 * @param {grunt} grunt
 */
module.exports = function (grunt) {

    /**
     * @param {string} url
     * @returns {string}
     */
    function process(url) {
        if (/^(https?|file|ftp):\/\//.test(url)) {
            return url;
        }
        if (url[0] != '/') {
            url = '/' + url;
        }
        return url;
    }

    /**
     * @param {{version:string}} options
     * @returns {string}
     */
    function version(options) {
        if(options.version === 'auto') {
            // @todo what if there is no package.json file?
            var pkg = grunt.file.readJSON('package.json');
            return pkg.version || '0';
        }
        return options.version || '0';
    }

    grunt.registerMultiTask('index', 'Generates an index.html file from a template file.', function () {
        var self = this;
        var options = this.options({
            js: [],
            css: []
        });

        if(self.files.length == 0) {
            grunt.fail.warn("No source or destination set.");
            return;
        }

        var src = self.files[0].src;
        if(_.isArray(src) && src.length != 1) {
            grunt.fail.warn('Only one template source supported.');
            return;
        }
        src = _.isArray(src) ? src[0] : src;
        if(!grunt.file.exists(src)) {
            grunt.fail.warn('Template not found: '+src);
        }

        var dest = self.files[0].dest;
        if(_.isArray(dest) && dest.length != 1) {
            grunt.fail.warn('Only one destination file supported.');
            return;
        }
        dest = _.isArray(dest) ? dest[0] : dest;

        var codes;
        grunt.file.expandMapping( options.code, codes, {});
        console.log(codes);
        return;

        grunt.file.copy(src, dest, {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: _.extend({
                        scripts: _.map(options.js, process),
                        styles: _.map(options.css, process),
                        version: version(options)
                    }, options.data || {})
                });
            }
        });

    });

};