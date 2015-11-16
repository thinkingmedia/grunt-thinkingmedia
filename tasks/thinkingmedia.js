var _ = require('lodash');
var Q = require('q');

module.exports = function (grunt) {

    var promises = require('./lib/promises').init(grunt);
    var logger = require('./lib/logger').init(grunt);
    var config = require('./lib/config').init(grunt);

    /**
     * Loads the tasks from the grunt folder.
     */
    var subTasks = _.mapValues({
        'sass': {},
        'index': {},
        'watcher': {}
    }, function (value, key) {
        grunt.verbose.writeln("Loading sub-task " + key);
        return {
            name: key,
            config: require('./grunt/' + key)(grunt)
        };
    });

    /**
     * @param {string} prefix Corresponds to the key in grunt config.
     * @param {string[]} taskNames List of subTask names to run in that order.
     * @param {Object} options The options loaded via config.defaults
     */
    function runTasks(prefix, taskNames, options) {
        grunt.verbose.writeln("Options: " + JSON.stringify(options));
        var tasks = _.map(taskNames, function (taskName) {
            if (!subTasks.hasOwnProperty(taskName)) {
                grunt.fail.fatal('subTask is not defined: ' + taskName);
            }
            return subTasks[taskName];
        });
        _.each(tasks, function (subTask) {
            grunt.verbose.writeln('Running: ' + subTask.name);
            var opt = _.clone(options);
            opt[subTask.name] = grunt.config.get(prefix + subTask.name) || {};
            grunt.config.set(subTask.name, subTask.config(opt));
            grunt.task.run([subTask.name]);
        });
    }

    grunt.task.registerTask('watch', 'Watches for changes to the SCSS and JS files.', function () {
        var done = this.async();
        config.defaults(this).then(function (options) {
            runTasks('', ['watcher'], options);
        }).finally(function () {
            done();
        });
    });

    grunt.task.registerTask('dev', 'Builds the development version of the project.', function () {
        var done = this.async();
        config.defaults(this).then(function (options) {
            runTasks('dev.', ['sass', 'index'], options);
        }).finally(function () {
            done();
        });
    });

    grunt.task.registerTask('build', 'Builds the production version of the project.', function () {
        var done = this.async();
        config.defaults(this).then(function (options) {
            runTasks('prod.', [], options);
        }).finally(function () {
            done();
        });
    });
};
