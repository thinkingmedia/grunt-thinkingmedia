var path = require('path');
var _ = require('lodash');

/**
 * @name {ThinkingMedia}
 * @constructor
 */
function ThinkingMedia() {
}

/**
 * @name {ThinkingMedia.Common}
 * @param {IGrunt} grunt
 * @constructor
 */
ThinkingMedia.Common = function (grunt) {

    /**
     * @param {Array|Object} options
     * @returns {string[]}
     */
    this.toFiles = function (options) {
        var self = this;
        var files = [];
        if (_.isObject(options)) {
            if (_.isArray(options.src)) {
                files = grunt.file.expandMapping(options.src, '', options);
                files = _.map(files, function (file) {
                    return file.dest;
                });
            } else {
                files = _.flatten(_.map(options, function (value) {
                    return self.toFiles(value);
                }));
            }
        } else if (_.isArray(options)) {
            files = grunt.file.expand(options);
        }
        return files;
    };

    /**
     * @param {string[]} files
     * @returns {string[]}
     */
    this.toJS = function (files) {
        return _.filter(files, function (file) {
            return _.endsWith(file, ".js");
        });
    };

    /**
     * @param {string[]} files
     * @returns {string[]}
     */
    this.toSASS = function (files) {
        return _.filter(files, function (file) {
            return _.endsWith(file, ".scss") || _.endsWith(file, ".sass");
        });
    };

    /**
     * @param {string|Object|function} value
     * @returns {string}
     */
    this.toString = function (value) {
        if (_.isObject(value)) {
            return JSON.stringify(value, null, 2);
        }
        return this.toValue(value);
    };

    /**
     * @param {*} value
     * @returns {*}
     */
    this.toValue = function (value) {
        return _.isFunction(value) ? value() : value;
    };

    /**
     * @param {*} value
     * @returns {*[]}
     */
    this.toArray = function (value) {
        value = this.toValue(value);
        return _.isArray(value) ? value : [value];
    };

    /**
     * @param {*} value
     * @returns {Object}
     */
    this.toObject = function (value) {
        value = this.toValue(value);
        if (_.isObject(value)) {
            return value;
        }
        throw Error("index.data was not an object. Value is ignored.")
    };

    /**
     * @param {string} url
     * @returns {string}
     */
    this.toAbsoluteURL = function (url) {
        if (/^(https?|file|ftp):\/\//.test(url)) {
            return url;
        }
        if (url[0] != '/') {
            url = '/' + url;
        }
        return url;
    };

    /**
     * @returns {{webroot:string,build:string,src:string[]}}
     */
    this.config = function () {

        if (this._config) {
            return this._config;
        }

        var cnfg = _.merge({
            webroot: './www',
            build: './build',
            src: [
                './www/src'
            ],
            files: []
        }, grunt.config('config'));

        cnfg.webroot = path.resolve(this.toString(cnfg.webroot));
        cnfg.build = path.resolve(this.toString(cnfg.build));
        cnfg.src = _.map(this.toArray(cnfg.src), function (src) {
            return path.resolve(src);
        });

        _.each(_.flatten([
            cnfg.webroot,
            cnfg.webroot + path.sep + 'css',
            cnfg.webroot + path.sep + 'js',
            cnfg.src
        ]), function (dir) {
            if (!grunt.file.isDir(dir)) {
                grunt.fail.fatal("Directory does not exist: " + dir);
            }
        });

        cnfg.files = _.filter(_.flatten(_.map(cnfg.src, function (dir) {
            if (grunt.file.isDir(dir)) {
                return grunt.file.expand([
                    dir + '/**/*.js',
                    dir + '/**/*.s[ac]ss'
                ]);
            }
            return false;
        })));

        cnfg.files = _.map(cnfg.files, function (file) {
            return path.resolve(file);
        });

        // logging
        grunt.log.verbose.writeln('Common.config()');
        grunt.log.verbose.writeln(cnfg.webroot);
        grunt.log.verbose.writeln(cnfg.build);
        _.each(cnfg.src, function (dir) {
            grunt.log.verbose.writeln(dir);
        });

        this._config = cnfg;

        return cnfg;
    };

    /**
     * @param {string} msg
     */
    this.log = function (msg) {
        grunt.log.writeln(this.toString(msg));
    };

    /**
     * @param {string} msg
     * @param {boolean} verbose
     */
    this.error = function (msg, verbose) {
        if (!!verbose) {
            grunt.log.verbose.error(this.toString(verbose));
        }
        grunt.fail.warn(this.toString(msg));
    };

    this.promising = function (task, promise) {
        var done = task.async();
        promise.then(function () {
            done();
        }, function (error) {
            grunt.log.write(error + '\n');
            done(false);
        });
    };

    this.system = function (cmd) {
        grunt.log.write('% ' + cmd + '\n');
        return exec(cmd).then(function (result) {
            grunt.log.write(result.stderr + result.stdout);
        }, function (error) {
            grunt.log.write(error.stderr + '\n');
            throw 'Failed to run \'' + cmd + '\'';
        });
    };

    this.ensureCleanMaster = function () {
        return exec('git symbolic-ref HEAD').then(function (result) {
            if (result.stdout.trim() !== 'refs/heads/master') throw 'Not on master branch, aborting';
            return exec('git status --porcelain');
        }).then(function (result) {
            if (result.stdout.trim() !== '') throw 'Working copy is dirty, aborting';
        });
    };

    /**
     * @param {string} oldName
     * @param {string} newName
     */
    this.renameTask = function (oldName, newName) {
        if (!grunt.task.exists(oldName)) {
            grunt.fail.fatal('Expected task "' + newName + '" to be created by grunt-contrib-sass');
            return;
        }
        grunt.task.renameTask(oldName, newName);
    }
}
;

/**
 * @param grunt
 * @returns {ThinkingMedia.Common}
 */
exports.init = function (grunt) {
    return new ThinkingMedia.Common(grunt);
};
