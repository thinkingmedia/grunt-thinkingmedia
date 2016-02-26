/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.load('grunt-ngdocs');
    c.help('docs', 'Creates HTML documentation from the AngularJS source code using ngDoc notation.');

    // this is still under construction.

    grunt.task.registerTask('docs', c.getHelp('docs'), function () {

        grunt.config('ngdocs', {
            options: {
                dest: 'docs',
                html5Mode: false,
                startPage: '/docs',
                title: "Docs",
                sourceLink: true,
                editLink: true,
                editExample: true
            },
            docs: {
                api: true,
                src: c.toJS(c.config().files),
                title: "Documentation"
            }
        });

        grunt.task.run(['ngdocs'])
    });
};