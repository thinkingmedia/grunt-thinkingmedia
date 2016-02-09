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
    this.toHTML = function (files) {
        return _.filter(files, function (file) {
            return _.endsWith(file, ".html");
        });
    };

    /**
     * @param {string[]} files
     * @returns {string[]}
     */
    this.toSASS = function (files) {
        return _.filter(files, function (file) {
            var parse = path.parse(file);
            return !_.startsWith(parse.name, "_") && (parse.ext === ".scss" || parse.ext === ".sass");
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
     * @returns {{
     *  name:string,
     *  webroot:string,
     *  test:string,
     *  build:string,
     *  temp:string,
     *  src:string[],
     *  files:string[],
     *  templates:string|boolean
     *  }}
     */
    this.config = function () {

        if (this._config) {
            return this._config;
        }

        var cnfg = _.merge({
            name: 'app',
            webroot: './www',
            test: './test',
            build: './build',
            temp: './temp',
            src: [
                './www/src'
            ],
            templates: 'templates',
            files: []
        }, grunt.config('config'));

        cnfg.app = this.toString(cnfg.app);
        if (cnfg.webroot !== false) {
            cnfg.webroot = path.resolve(this.toString(cnfg.webroot));
        }
        cnfg.test = path.resolve(this.toString(cnfg.test));
        cnfg.build = path.resolve(this.toString(cnfg.build));
        cnfg.temp = path.resolve(this.toString(cnfg.temp));
        cnfg.src = _.map(this.toArray(cnfg.src), function (src) {
            return path.resolve(src);
        });
        cnfg.templates = this.toString(cnfg.templates);

        _.each(_.flatten([
            cnfg.webroot,
            cnfg.src
        ]), function (dir) {
            if (dir && !grunt.file.isDir(dir)) {
                grunt.fail.fatal("Directory does not exist: " + dir);
            }
        });

        cnfg.files = _.filter(_.flatten(_.map(cnfg.src, function (dir) {
            if (grunt.file.isDir(dir)) {
                return grunt.file.expand([
                    dir + '/**/*.js',
                    dir + '/**/*.s[ac]ss',
                    dir + '/**/*.html'
                ]);
            }
            return false;
        })));

        cnfg.files = _.map(_.sortBy(_.map(cnfg.files, function (file) {
            file = path.resolve(file);
            return {
                path: file,
                sort: file.split(path.sep).length
            }
        }), 'sort'), 'path');

        // logging
        if (cnfg !== false) {
            grunt.log.verbose.writeln('config:webroot=' + cnfg.webroot);
        }
        grunt.log.verbose.writeln('config:test=' + cnfg.test);
        grunt.log.verbose.writeln('config:build=' + cnfg.build);
        grunt.log.verbose.writeln('config:temp=' + cnfg.temp);
        _.each(cnfg.src, function (dir) {
            grunt.log.verbose.writeln('config:src[]=' + dir);
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
    };

    /**
     * Loads grunt modules relative to this plugin and not the Gruntfile.js that is using this plugin.
     *
     * @param {string} name
     */
    this.load = function (name) {
        var root = path.resolve('node_modules');
        var depth = 0;
        while (depth < 10) {
            var tasksDir = path.join(root, name, 'tasks');
            if (grunt.file.exists(tasksDir)) {
                grunt.loadNpmTasks(name);
                return;
            } else {
                name = '../../node_modules/' + name;
                depth++;
            }
        }
        grunt.log.error('Parent Npm module "' + name + '" not found. Is it installed?');
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
