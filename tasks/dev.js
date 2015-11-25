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


    grunt.task.registerTask('dev','Compiles SASS and updates the index.html', function(){
        grunt.task.run(['sass:dev']);

        if(grunt.config('index.dev')) {
            grunt.task.run(['index:dev']);
        }
    });
};