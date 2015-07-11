/*!
 * Starter Slicing Gruntfile
 * http://tukangslicing.com
 */

module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dir: {
      less : 'app/less',
      css : 'app/css',
      js  : 'app/js',
      jade : 'app/jade',
      bootstrap: 'app/js/bootstrap',
      mobilejade: 'app/jade-mobile',
      mobile: 'app/mobile'
    },
    watch: {
      all: {
        files: [
          'Gruntfile.js',
          '<%= dir.jade %>/**/*.jade',
          '<%= dir.jade %>/*.jade',
          '<%= dir.mobilejade %>/**/*.jade',
          '<%= dir.mobilejade %>/*.jade',
          '<%= dir.js %>/*.js',
          '<%= dir.js %>/**/*.js',
          '<%= dir.less %>/*.less',
          '<%= dir.less %>/**/*.less'
        ],
        tasks: [
          'jade',
          'newer:less',
          'jscs:bootstrap',
          'jscs:main',
          'jscs:grunt',
          'jshint',
          'newer:concat',
          'notify:watch'
        ],
        options: {
          nospawn: true
        }
      }
    },

    jade: {
      html: {
        files: {
          'app/': ['app/jade/*.jade'],
          'app/mobile': ['<%= dir.mobilejade %>/*.jade']
        },
        options: {
          pretty: true,
          client: false
        }
      }
    },

    notify: {
      watch: {
        options: {
          title: '<%= pkg.name %>',
          message: 'CSS and JS finished compiling.'
        }
      }
    },

    concat: {
      options: {
        // separator: ';'
      },
      bootstrap: {
        src: [
          // '<%= dir.bootstrap %>/transition.js',
          '<%= dir.bootstrap %>/alert.js',
          '<%= dir.bootstrap %>/button.js',
          // '<%= dir.bootstrap %>/carousel.js',
          '<%= dir.bootstrap %>/collapse.js',
          '<%= dir.bootstrap %>/dropdown.js',
          '<%= dir.bootstrap %>/modal.js',
          '<%= dir.bootstrap %>/tooltip.js',
          '<%= dir.bootstrap %>/popover.js'
          // '<%= dir.bootstrap %>/scrollspy.js',
          // '<%= dir.bootstrap %>/tab.js',
          // '<%= dir.bootstrap %>/affix.js'
        ],
        dest: '<%= dir.js %>/bootstrap.js'
      },
      main: {
        src: [
          '<%= dir.js %>/shared/*.js',
          '<%= dir.js %>/web/*.js'
        ],
        dest: '<%= dir.js %>/<%= pkg.name.toLowerCase() %>.js'
      },
      plugins: {
        src: [
          '<%= dir.js %>/plugins/*.js'
        ],
        dest: '<%= dir.js %>/plugins.js'
      },
      mobile: {
        src: [
          '<%= dir.js %>/plugins/validator.js',
          '<%= dir.js %>/plugins/bootstrap-datepicker.js',
          '<%= dir.bootstrap %>/tab.js',
          '<%= dir.js %>/mobile/jquery.swipebox.js',
          '<%= dir.js %>/mobile/main-mobile.js'
        ],
        dest: '<%= dir.js %>/<%= pkg.name.toLowerCase() %>.mobile.js'
      }
    },

    jshint: {
      options: {
        jshintrc: '<%= dir.js %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      core: {
        options: {
          jshintrc: '<%= dir.bootstrap %>/.jshintrc'
        },
        src: '<%= dir.bootstrap %>/*.js'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src:'Gruntfile.js'
      },
      main: {
        jshintrc: '<%= dir.js %>/.jshintrc',
        src: ['<%= dir.js %>/shared/*.js', '<%= dir.js %>/web/*.js', '<%= dir.js %>/mobile/main-mobile.js']
      },
      afterConcat: {
        src: ['<%= dir.js %>/<%= pkg.name.toLowerCase() %>.js']
      }
    },

    jscs: {
      options: {
        config: '<%= dir.bootstrap %>/.jscsrc'
      },
      bootstrap: {
        src: '<%= dir.bootstrap %>/*.js'
      },
      main: {
        src: ['<%= dir.js %>/shared/*.js', '<%= dir.js %>/web/*.js']
      },
      mobile: {
        src: ['<%= dir.js %>/mobile/main-mobile.js']
      },
      grunt: {
        src: 'Gruntfile.js'
      }
    },

    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      frontend: {
        files: {
          '<%= dir.js %>/<%= pkg.name.toLowerCase() %>.min.js': ['<%= dir.js %>/bootstrap.js', '<%= dir.js %>/plugins.js', '<%= dir.js %>/<%= pkg.name.toLowerCase() %>.js']
        }
      }
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: '<%= dir.css %>/bootstrap.css.map'
        },
        files: {
          '<%= dir.css %>/bootstrap.css': '<%= dir.less %>/bootstrap/bootstrap.less'
        }
      },
      compileWeb: {
        options: {
          // strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name.toLowerCase() %>.css.map',
          sourceMapFilename: '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.css.map'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.css': '<%= dir.less %>/apps.less'
        }
      },
      compileMobile: {
        options: {
          // strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name.toLowerCase() %>.mobile.css.map',
          sourceMapFilename: '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.mobile.css.map'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.mobile.css': '<%= dir.less %>/mobile.less'
        }
      },
      email: {
        files: {
          '<%= dir.css %>/email-template-1.css' : '<%= dir.less %>/email-template-1.less',
          '<%= dir.css %>/email-template-2.css' : '<%= dir.less %>/email-template-2.less',
          '<%= dir.css %>/email-eticket.css' : '<%= dir.less %>/email-eticket.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: '<%= dir.css %>/bootstrap.css'
      },
      web: {
        options: {
          map: true
        },
        src: '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.css'
      },
      mobile: {
        options: {
          map: true
        },
        src: '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.mobile.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      core: {
        files: {
          '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.css': '<%= dir.css %>/<%= pkg.name.toLowerCase() %>.css',
          '<%= dir.mobile %>/css/<%= pkg.name.toLowerCase() %>.mobile.css': '<%= dir.mobile %>/css/<%= pkg.name.toLowerCase() %>.mobile.css',
          '<%= dir.css %>/bootstrap.css': '<%= dir.css %>/bootstrap.css'
        }
      }
    },

    csscomb: {
      options: {
        config: '<%= dir.less %>/bootstrap/.csscomb.json'
      },
      web: {
        expand: true,
        cwd: '<%= dir.css %>/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= dir.css %>/'
      }
    },

    concurrent: {
      less: [
        'less:compileCore',
        'less:compileWeb',
        'less:compileMobile'
      ],
      js: [
        'jscs',
        'jshint',
        'concat'
      ],
      options: {
        // logConcurrentOutput: true
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'app/img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'app/img/'                  // Destination path prefix
        }]
      }
    },

    newer: {
      options: {
        /**
         * when changing a less file, we run an addional check on all the *.less files to see if they are @importing a modified *.less file, and if so we include it in the files which less task should execute.
         */
        override: function (details, shouldIncludeCallback) {
          var fs = require('fs');
          var path = require('path');
          var async = require('async');

          var checkFileForModifiedImports = async.memoize(function (filepath, fileCheckCallback) {
            fs.readFile(filepath, 'utf8', function (error, data) {
              var directoryPath = path.dirname(filepath);
              var regex = /@import (?:\([^)]+\) )?"(.+?)(\.less)?"/g;
              var match;

              function checkNextImport() {
                if ((match = regex.exec(data)) === null) {
                  return fileCheckCallback(false); // all @import files has been checked.
                }

                var importFilePath = path.join(directoryPath, match[1] + '.less');
                fs.exists(importFilePath, function (exists) {
                  if (!exists) { // @import file does not exists.
                    return checkNextImport(); // skip to next
                  }

                  fs.stat(importFilePath, function (error, stats) {
                    if (stats.mtime > details.time) { // @import file has been modified, -> include it.
                      fileCheckCallback(true);
                    } else { // @import file has not been modified but, lets check the @import's of this file.
                      checkFileForModifiedImports(importFilePath, function (hasModifiedImport) {
                        if (hasModifiedImport) {
                          fileCheckCallback(true);
                        } else {
                          checkNextImport();
                        }
                      });
                    }
                  });
                });
              }

              checkNextImport();
            });
          });

          // only add override behavior to less tasks.
          if (details.task === 'less') {
            checkFileForModifiedImports(details.path, function (found) {
              shouldIncludeCallback(found);
            });
          } else {
            shouldIncludeCallback(false);
          }
        }
      }
    },
    clean: {
      dev: ['<%= dir.js %>/plugins.js', '<%= dir.js %>/<%= pkg.name.toLowerCase() %>.js', '<%= dir.css %>/*.css', '<%= dir.css %>/*.css.map'],
      build: ['build/*']
    },
    premailer: {
      simple: {
        options: {},
        files: {
          'app/email-template-1-css-inline.html': ['app/email-template-1.html'],
          'app/email-template-2-css-inline.html': ['app/email-template-2.html']
        }
      }
    }
  });

  grunt.registerTask('compress-image', ['imagemin']);
  grunt.registerTask('dev', ['concurrent:less', 'jade', 'concurrent:js', 'notify', 'autoprefixer']);
  grunt.registerTask('default', ['dev', 'watch']);
  grunt.registerTask('production', ['clean:build', 'compress-image', 'jade', 'less', 'concat', 'autoprefixer', 'csscomb', 'cssmin', 'uglify']);
  grunt.registerTask('heroku', 'dev');
  grunt.registerTask('heroku:development', 'dev');
  grunt.registerTask('heroku:production', 'dev');
};
