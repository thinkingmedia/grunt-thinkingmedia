var _ = require('lodash');
var Q = require('q');

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);
    var config = require('./lib/config').init(grunt);

    var subTasks = _.map(['sass'], function (key) {
        grunt.verbose.writeln("Loading sub-task "+key);
        return {
            name: key,
            config: require('./grunt/' + key)(grunt)
        };
    });

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {
        var done = this.async();
        config.defaults(this)
            .then(function (options) {
                _.each(subTasks, function (subTask) {
                    grunt.config.set(subTask.name, subTask.config(options));
                    grunt.task.run([subTask.name + ':dev']);
                });
            })
            .finally(function () {
                done();
            });
    });

    grunt.task.registerTask('build', 'Builds the production version of the project.', function () {
        var done = this.async();
        config(this).then(function (options) {
            logger(options);
        }).finally(function () {
            done();
        });
    });
};
