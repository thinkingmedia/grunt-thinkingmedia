var grunt = require('grunt');
var dircompare = require('dir-compare');
var path = require('path');

var read = function () {
    var filePath = path.join.apply(this, Array.prototype.slice.call(arguments));
    return grunt.util.normalizelf(grunt.file.read(filePath));
};

exports.thinkingmedia = {
    setUp: function (done) {
        done();
    },

    sass: function (test) {
        test.expect(1);
        var res = dircompare.compareSync('test/expected/css', 'www/css');
        test.equal(true, res.same, 'should match exclusions');
        test.done();
    },

    index: function (test) {
        test.expect(1);
        var actual = read('www', 'index.html');
        var expected = read('test', 'expected', 'index.html');
        test.equal(actual, expected, 'index task should equal test/expected/index.html');
        test.done();
    }
};
