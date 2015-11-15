exports.init = function (grunt) {

    function string(msg) {
        if(typeof msg === 'object') {
            return JSON.stringify(msg, null, 2);
        }
        return msg;
    }

    var logger = function(msg) {
        grunt.log.writeln(string(msg));
    };

    logger.error = function(msg, verbose) {
        if(verbose) {
            grunt.verbose.error(string(verbose));
        }
        grunt.fail.warn(string(msg));
    };

    return logger;
};