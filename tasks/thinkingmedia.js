var _ = require('lodash');
var Q = require('q');

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);
    var config = require('./lib/config').init(grunt);

    var subTasks = _.map(['index'], function (key) {
        grunt.verbose.writeln("Loading sub-task " + key);
        return {
            name: key,
            config: require('./grunt/' + key)(grunt)
        };
    });

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {
        var done = this.async();
        config.defaults(this)
            .then(function (options) {
                grunt.verbose.writeln("Options: " + JSON.stringify(options));
                _.each(subTasks, function (subTask) {
                    var opt = _.clone(options);
                    opt[subTask.name] = grunt.config.get("dev." + subTask.name) || {};
                    grunt.config.set(subTask.name, subTask.config(opt));
                    grunt.task.run([subTask.name]);
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
