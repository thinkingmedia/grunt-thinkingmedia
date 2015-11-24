var path = require('path');
var _ = require('lodash');

exports.init = function (grunt) {
    return {

        /**
         * @param {Array|Object} options
         * @returns {string[]}
         */
        toFiles: function(options) {
            var files = [];
            if (_.isObject(options) && _.isArray(options.include.src)) {
                includes = grunt.file.expandMapping(options.include.src, '', options.include);
                includes = _.map(includes, function (include) {
                    return include.dest;
                });
            } else if (_.isArray(options.include)) {
                includes = grunt.file.expand(options.include);
            }
        },

        /**
         * @param {string[]} files
         * @returns {string[]}
         */
        toJS: function(files) {
            return _.filter(files,function(file){
                return _.endsWith(file, ".js");
            });
        },

        /**
         * @param {string[]} files
         * @returns {string[]}
         */
        toSASS: function(files) {
            return _.filter(files,function(file){
                return _.endsWith(file, ".scss") || _.endsWith(file, ".sass");
            });
        },

        source: function() {
            var s = grunt.config('source');
            console.log(s);


            var files = grunt.files.expand(s);
            console.log(files);
        }
    }
};