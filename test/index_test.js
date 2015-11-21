var grunt = require('grunt');

exports.index = {
    dev: function (test) {
        test.expect(1);
        var expect = grunt.file.read('test/expected/www/index.html');
        var actual = grunt.file.read('www/index.html');
        test.equal(expect, actual, 'Index.html for dev should match');
        test.done();
    },
    build: function (test) {
        test.expect(1);
        var expect = grunt.file.read('test/expected/build/index.html');
        var actual = grunt.file.read('build/index.html');
        test.equal(expect, actual, 'Index.html for build should match');
        test.done();
    }
};
