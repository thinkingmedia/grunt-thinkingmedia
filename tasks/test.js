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
    c.load('grunt-mocha-test');
    c.load('grunt-mocha-istanbul');
    c.load('grunt-open');

    c.help('test', 'Handles executing the tests.');
    c.help('coverage', 'Generates a test coverage report.');

    grunt.task.registerTask('test', c.getHelp('test'), function () {
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

    grunt.task.registerTask('coverage', c.getHelp('coverage'), function (arg) {
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