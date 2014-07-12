// Generated on 2014-07-12 using generator-angular 0.9.3
'use strict';

var fs = require('fs'),
d = new Date();

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Create a restart.txt file
  fs.writeFileSync('.rebooted', 'rebooted');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      cdnContainer: '',
      cdnUrl: '',
      dist: 'dist',
      pkg: grunt.file.readJSON('package.json')
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      server: {
        files:  [ '.rebooted' ],
        options: {
          livereload: true
        }
      },
      ejs: {
        files: ['<%= yeoman.app %>/**/*.ejs'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%= yeoman.app %>/**/*.html'],
        tasks: ['html2js'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '35729'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/{,*/}*.ejs',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ignore: ['server/**/*.ejs'],
          watch: ['server'],
          env: {
            PORT: '8000',
            DEBUG: 'app'
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      },
      dist: {
        script: 'server.js',
        options: {
          ignore: ['server/**/*.ejs'],
          watch: ['server'],
          env: {
            PORT: '9000',
            NODE_ENV: 'production'
          }
        }
      },
      test: {
        script: 'server.js',
        options: {
          ignore: ['server/**/*.ejs'],
          watch: ['server'],
          env: {
            PORT: '9000'
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.app %>/scripts/views.js',
            '<%= yeoman.dist %>'
          ]
        }]
      },
      server: [
        '.tmp',
        '<%= yeoman.app %>/scripts/views.js'
      ],
      deploy: '.tmp/deploy'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    html2js: {
      options: {
        base: './app',
        rename: function(moduleName) {
          return '/' + moduleName;
        },
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }
      },
      main: {
        src: ['app/views/**/*.html'],
        dest: 'app/scripts/views.js'
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: '<%= yeoman.app %>/**/*.ejs',
        ignorePath: '<%= yeoman.app %>/'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n',
        bundleExec:true
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/*.ejs',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/{,*/}*.ejs'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.ejs', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.ejs']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.ejs',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      deploy: {
        expand: true,
        dest: '.tmp/deploy',
        src: ['package.json', 'app/**/*', 'dist/**/*', 'server/**/*', 'server.js']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ],
      express: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    cdn: {
      options: {
        /** @required - root URL of your CDN (may contains sub-paths as shown below) */
        cdn: '<%= yeoman.cdnUrl %>/<%= yeoman.pkg.version %>/',
        /** @optional  - if provided both absolute and relative paths will be converted */
        flatten: true,
        /** @optional  - if provided will be added to the default supporting types */
        supportedTypes: { 'ejs': 'html' }
      },
      dist: {
        /** @required  - string (or array of) including grunt glob variables */
        src: ['<%= yeoman.dist %>/*.ejs']
      }
    },

    // TODO - headers shouldn't override what pkgcloud does. create pr for merging upload.headers with default mime-type headers
    cloudfiles: {
      dist: {
        user: process.env.RX_USERNAME,
        key: process.env.RX_API_KEY,
        region: 'DFW',
        upload: [{
          container: '<%= yeoman.cdnContainer %>',
          src: ['dist/**/*', '!dist/bower_components/**/*', '!dist/**/*.html', '!dist/*.ejs'],
          dest: '<%= yeoman.pkg.version %>/',
          stripcomponents: 1
        }]
      }
    },

    'git_deploy': {
      heroku: {
        options: {
          url: 'git@heroku.com:example-repo.git',
          branch: 'master',
          message: 'Grunt Deployment'
        },
        src: '.tmp/deploy'
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'nodemon:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'concurrent:express',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'nodemon:test',
    'karma'
  ]);

  grunt.registerTask('build', function (target) {
    grunt.task.run([
      'clean:dist',
      'html2js',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'ngmin',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
    ]);

    if (target === 'cdn') {
      grunt.task.run(['cloudfiles','cdn']);
    }
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('deploy:heroku', [
    'clean:server',
    'copy:deploy',
    'git_deploy:heroku',
    'clean:deploy'
  ]);
};
