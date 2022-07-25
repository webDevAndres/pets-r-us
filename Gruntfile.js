module.exports = function(grunt) {
    grunt.initConfig({
      cssmin: {
        target: {
          src: ["./public/styles/site.css"],
          dest: "tmp/site.min.css"
        }
      },
      uglify: {
        myClient: {
          files: {
            "tmp/serve/main.min.js": ["tmp/serve/main.js"]
          }
        }
      }
    });
  
    grunt.loadNpmTasks("grunt-contrib-cssmin");
  
    grunt.registerTask("default", ["cssmin"]);
  };