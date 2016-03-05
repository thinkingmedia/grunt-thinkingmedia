/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    // this feature is on hold until I can figure out how it can be easily configured.
    return;

    c.load('grunt-ngdocs');
    c.help('docs', 'Creates HTML documentation from the AngularJS source code using ngDoc notation.');

    // this is still under construction.

    grunt.task.registerTask('docs', c.getHelp('docs'), function () {

        var pkg = grunt.file.readJSON('package.json');

        grunt.config('ngdocs', {
            options: {
                dest: './docs',
                html5Mode: false,
                startPage: '/docs',
                title: pkg.name || 'Documentation',
                sourceLink: true,
                editLink: true,
                editExample: true
            },
            docs: {
                api: true,
                src: c.toJS(c.config().files),
                title: "API"
            }
        });

        grunt.task.run(['ngdocs'])
    });
};