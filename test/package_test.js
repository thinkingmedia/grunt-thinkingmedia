var grunt = require('grunt');
var path = require('path');

exports.package = {
    js: function (test) {
        test.expect(1);
        var expect = grunt.file.read('test/expected/build/js/app.min.js');
        var actual = grunt.file.read('build/js/app.min.js');
        test.equal(expect, actual, 'app.min.js for javascript package to be the same');
        test.done();
    },
    css: function(test) {
        test.expect(1);
        var expect = grunt.file.read('test/expected/build/css/app.min.css');
        var actual = grunt.file.read('build/css/app.min.css');
        test.equal(expect, actual, 'app.min.css for CSS package to be the same');
        test.done();
    }
};
