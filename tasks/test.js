var path = require('path');

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
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-open');

    grunt.task.registerTask('test', 'Handles executing the tests', function () {
        var config = {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test-results.txt'
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

    grunt.task.registerTask('coverage', 'Generates a test coverage report', function (arg) {
        var config = {
            coverage: {
                options: {},
                src: [
                    c.config().test + '/**/*.test.js'
                ]
            }
        };

        var bootstrap = c.config().test + '/bootstrap.js';
        if (grunt.file.exists(bootstrap)) {
            config.coverage.options.require = bootstrap;
        }
        grunt.config('mocha_istanbul', config);

        if (this.flags.open) {
            // also open the coverage report when done
            grunt.config('open', {
                test: {
                    path: 'coverage/lcov-report/index.html'
                }
            });
            grunt.task.run(['mocha_istanbul:coverage', 'open:test'])
        } else {
            grunt.task.run(['mocha_istanbul:coverage'])
        }
    });
}

module.exports = Module;