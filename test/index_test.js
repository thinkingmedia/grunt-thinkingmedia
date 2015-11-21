var grunt = require('grunt');
var path = require('path');

exports.index = {
    dev: function(test) {
        test.expect(1);
        var expect = grunt.file.read('test/expected/index.html');
        var actual = grunt.file.read('www/index.html');
        test.equal(expect, actual, 'Index.html for dev should match');
        test.done();
    }
};
