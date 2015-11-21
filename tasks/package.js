var _ = require('lodash');

module.exports = function (grunt) {

    grunt.registerMultiTask('package', 'Handles the creation of minified JS/CSS files', function () {
        var self = this;
        var options = this.options({
            minify: false,
            clear: []
        });

        // concat the files
        var src = _.map(self.filesSrc, function (filepath) {
            if (grunt.file.isDir(filepath)) {
                return "";
            }
            return grunt.file.read(filepath);
        }).join("\n");

        // save the concat version
        grunt.file.write(self.data.dest, src);
        grunt.log.writeln('File ' + self.data.dest + ' created.');

        // clear unwanted files
        if(_.isArray(options.clear)) {
            _.each(options.clear || [],function(filepath){
                grunt.file.delete(filepath);
            });
        }
    });

};