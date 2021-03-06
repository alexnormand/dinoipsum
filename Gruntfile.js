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
      backendjs: {
        files: ['app.js', 'dinoipsum/*'],
        tasks: ['develop', 'delayed-livereload'],
        options: {
          nospawn: true
        }
      },
      frontendjs: {
        files: 'public/javascripts/*'
      },
      stylus: {
        files: ['stylesheets/*.styl']
      },
      index: {
        files: ['public/index.html']
      }
    },

    // build tasks
    clean: ['dist'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [
              'public/index.html',
              'public/images/baby-37796.svg',
              'dinoipsum/*',
              'app.js',
              'package.json'
            ],
            dest: 'dist'
          },
          {
            expand: true,
            cwd: 'public/components/flatui/images/',
            src: ['**'],
            dest: 'dist/public/images'
          },
          {
            expand: true,
            cwd: 'public/components/bootstrap/img/',
            src: ['**'],
            dest: 'dist/public/images'
          },
          {
            expand: true,
            cwd: 'public/components/flatui/fonts/',
            src: ['**'],
            dest: 'dist/public/fonts'
          },
        ]
      }
    },
    stylus: {
      compile: {
        options: {
          use: [
            require('nib')
          ],
          import: [
            '../public/components/flatui/bootstrap/css/bootstrap.css',
            '../public/components/flatui/css/flat-ui.css',
            '../public/components/google-code-prettify/src/prettify.css'
          ],
          'include css': true
        },
        files: {
          'dist/public/stylesheets/style.css' : 'stylesheets/style.styl'
        }
      }
    },
    lineremover: {
      removelivereload: {
        files: {
          'dist/public/index.html':  'dist/public/index.html'
        },
        options: {
          exclusionPattern: /<script src="http:\/\/localhost:35729\/livereload.js"><\/script>/
        }
      },
      removeimports: {
        files: {
          'dist/public/stylesheets/style.css': 'dist/public/stylesheets/style.css'
        },
        options: {
          exclusionPattern: /@import url/
        }
      }
    },
    cssmin: {
      compile: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'dist/public/stylesheets/style.css': ['dist/public/stylesheets/style.css']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['dist/public/index.html'],
            module: 'main'
          }],
          preserveLicenseComments: false,
          modules: [{ name: 'main' }],
          dir: 'dist/public/javascripts',
          appDir: 'public/javascripts',
          baseDir: 'public/javascripts',
          mainConfigFile: 'public/javascripts/main.js'
        }
      }
    },
    dom_munger: {
      nunito: {
        options: {
          append: {
            selector: 'head',
            html: '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Nunito&amp;text=DinoIpsumylkedsars%3F%20">'
          }
        },
        src: 'dist/public/index.html'
      },
      lato: {
        options: {
          append: {
            selector: 'head',
            html: '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:400,700,900,400italic">'
          }
        },
        src: 'dist/public/index.html'
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false,

        }]
      },
      dist: {
        files: {
          'dist/public/images/baby-37796.svg': 'dist/public/images/baby-37796.svg'
        }
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
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-line-remover');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-svgmin');


  grunt.registerTask('default', ['develop', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'stylus', 'lineremover', 'cssmin', 'requirejs', 'dom_munger', 'svgmin']);
};
