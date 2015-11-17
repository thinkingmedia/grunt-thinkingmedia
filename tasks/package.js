var _ = require('lodash');

module.exports = function (grunt) {

    grunt.registerMultiTask('package', 'Handles the creation of minified JS/CSS files', function () {
        var self = this;
        //var options = this.options();

        //console.log('*********************************');
        //console.log(self.data);
        //console.log(self.filesSrc);
        //console.log(self.files);
        //console.log('*********************************');

        var src = _.map(self.filesSrc, function (filepath) {
            //console.log(filepath);
            if (grunt.file.isDir(filepath)) {
                return "";
            }
            return grunt.file.read(filepath);
        }).join("\n");

        grunt.file.write(self.data.dest, src);

        grunt.log.writeln('File ' + self.data.dest + ' created.');

        _.each(self.data.clear || [],function(filepath){
            grunt.file.delete(filepath);
        });
    });

};