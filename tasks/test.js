var path = require('path');
var _ = require('lodash');

/**
 * Very simple test runner. Assumes Mocha is being used.
 *
 * @param {IGrunt} grunt
 */
function Module(grunt) {

    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    // @todo check if mocha is installed via package.json
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.task.registerTask('test', 'Handles executing the tests', function (type) {

        var config = {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    c.config().test + '/**/*.test.js'
                ]
            }
        };

        var bootstrap = c.config().test + '/bootstrap.js';
        if (grunt.file.exists(bootstrap)) {
            config.test.options.require = bootstrap;
        }

        grunt.config('mochaTest', config);
        grunt.task.run(['mochaTest']);
    });
}

module.exports = Module;