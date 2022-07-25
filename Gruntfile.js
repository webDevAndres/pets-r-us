module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        imagemin: {
            jpg: {
              options: {
                progressive: true
              },
              files: [
                {
                  expand: true,
                  cwd: 'public/images/',
                  src: ['**/*.jpg','**/*.jpeg'],
                  dest: 'public/dist/images/',
                  ext: '.jpg'
                }
              ]
            }
        }
	});

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['imagemin']);

}