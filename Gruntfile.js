module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload'],
        options: {
          nospawn: true
        }
      },
      stylus: {
        files: ['views/stylesheets/*.styl']
      },
      jade: {
        files: ['views/*.jade']
      }
    },
    clean: ['dist'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              'public/**',
              'routes/**',
              'views/**',
              'app.js',
              'Gruntfile.js',
              'bower.json',
              'package.json'
            ],
            dest: 'dist'
          }
        ]
      }
    }
  });

  grunt.registerTask('delayed-livereload', 'delayed livereload', function () {
    var done = this.async();
    setTimeout(function () {
      grunt.task.run('watch');
      done();
    }, 500);
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['develop', 'watch']);
  grunt.registerTask('build', ['clean', 'copy']);
};
