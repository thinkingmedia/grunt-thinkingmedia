module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');

    return function (options) {
        return {
            dev: {
                options: {
                    compass: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    src: [
                        "./www/**/*.scss"
                    ],
                    rename: function () {
                        return options['css'] + "output.css"
                    }
                }]
            },
            prod: {
                options: {
                    compass: true,
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: [grunt.uriSrc + "/UI.scss"],
                    rename: function () {
                        return options['css'] + "thinkingmedia-ui.min.css"
                    }
                }]
            }
        }
    }
};
