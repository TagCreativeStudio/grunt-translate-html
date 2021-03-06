/*
 * grunt-translate-html
 * https://github.com/Josh/grunt plugin
 *
 * Copyright (c) 2015 Josh Winskill, Tag Creative
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/test.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Check code style
    jscs: {
      src: [
        'tasks/*.js',
        'Gruntfile.js',
        'test/test.js',
      ],
      options: {
        config: '.jscsrc',
        esnext: true,
        verbose: true,
        fix: true,
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Copy files for the test setup:
    copy: {
      main: {
        files: [
          {
            src: 'test/**',
            dest: 'tmp/',
            expand: true,
          },
        ],
      },
    },

    // Configuration to be run (and then tested).
    translate: {
      options: {
        locale: 'de_DE',
        pathToLocFolders: 'tmp/test/fixtures/locales/',
      },
      files: {
          src: 'tmp/test/fixtures/**/*.html',
          dest: 'tmp/output/',
        },
    },

    // Mocha tests
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false,
        },
        src: ['test/**/*.js'],
      },
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-locales');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jscs');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy',
    'translate', 'mochaTest', 'clean',]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'mochaTest']);

};
