exports.init = function (grunt) {
    return {
        promising: function (task, promise) {
            var done = task.async();
            promise.then(function () {
                done();
            }, function (error) {
                grunt.log.write(error + '\n');
                done(false);
            });
        },

        system: function (cmd) {
            grunt.log.write('% ' + cmd + '\n');
            return exec(cmd).then(function (result) {
                grunt.log.write(result.stderr + result.stdout);
            }, function (error) {
                grunt.log.write(error.stderr + '\n');
                throw 'Failed to run \'' + cmd + '\'';
            });
        },

        ensureCleanMaster: function () {
            return exec('git symbolic-ref HEAD').then(function (result) {
                if (result.stdout.trim() !== 'refs/heads/master') throw 'Not on master branch, aborting';
                return exec('git status --porcelain');
            }).then(function (result) {
                if (result.stdout.trim() !== '') throw 'Working copy is dirty, aborting';
            });
        }
    };
};
