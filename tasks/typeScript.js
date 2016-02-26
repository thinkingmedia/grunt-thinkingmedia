/**
 * @param {IGrunt} grunt
 */
module.exports = function (grunt) {
    /**
     * @type {ThinkingMedia.Common}
     */
    var c = require('./lib/common').init(grunt);

    c.load('grunt-ts');
    c.help('typescript', 'Compiles the TS files to JS');
};