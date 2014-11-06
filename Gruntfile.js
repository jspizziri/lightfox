/*!
 * LightFox's Gruntfile
 * 
 * Author: Jacob Spizziri <jacob.spizziri@gmail.com>
 * Licensed under MIT
 */
module.exports = function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        src: ['js/lightbox.js', 'js/reader.js'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
		
		less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/lightfox.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
		
		cssmin: {
      options: {
        compatibility: 'ie9',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    }
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['uglify', 'less', 'cssmin']);
};
