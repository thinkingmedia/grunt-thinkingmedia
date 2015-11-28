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

    grunt.task.registerTask('build', 'Performs all tasks to compile the target environment.', function (type) {
        type = type || 'prod';

        switch (type) {
            case 'dev':
                grunt.task.run(['sass:dev']);
                if (grunt.config('index.dev')) {
                    grunt.task.run(['index:dev']);
                }
                break;
            case 'prod':
                var tasks = [
                    'build:dev',
                    'sass:build'
                ];
                if(grunt.config('package')) {
                    tasks.push('package');
                }
                grunt.task.run(tasks);
                break;
        }
    });

    grunt.task.registerTask('dev', 'Compiles SASS and updates the index.html', ['build:dev']);
};