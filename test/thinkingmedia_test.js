var grunt = require('grunt');
var dircompare = require('dir-compare');

exports.thinkingmedia = {
    setUp: function (done) {
        done();
    },

    sassDev: function (test) {
        test.expect(1);
        var res = dircompare.compareSync('test/expected/css', 'www/css');
        test.equal(true, res.same, 'should match exclusions');
        test.done();
    }
};
