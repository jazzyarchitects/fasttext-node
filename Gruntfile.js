module.exports = function(grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      lib: {
        src: ['dist/**/*.*', 'dist/**', 'public/js/bundle.js'],
      },
      test: {
        src: ['test/**/*.js', '!test/**/*.es6.js'],
      },
    },

    babel: {
      lib: {
        options: {
          sourceMap: false,
          presets: ['env'],
        },
        modules: {
          files: [
            {
              expand: true,
              cwd: 'lib/',
              src: ['**/*.js'],
              dest: 'dist/lib/',
            },
          ],
        },
      },
      test: {
        options: {
          sourceMap: false,
          presets: ['env'],
        },
        modules: {
          files: [
            {
              expand: true,
              cwd: 'test/',
              src: ['**/*.es6.js'],
              dest: 'test/',
            },
          ],
        },
      },
    },

    eslint: {
      options: {
        configFile: '.eslintrc.js',
        fix: true,
      },
      lib: {
        src: ['lib/**/*.js'],
      },
      test: {
        src: ['test/**/*.es6.js'],
      },
    },

    watch: {
      lib: {
        files: ['./lib/**/*.js'],
        tasks: ['clean:lib', 'eslint:lib', 'babel:lib'],
      },
      test: {
        files: ['./test/**/*.es6.js'],
        tasks: ['clean:test', 'eslint:test', 'bable:test'],
      },
    },
  });

  grunt.loadNpmTasks('gruntify-eslint');

  grunt.registerTask('build', 'Builds the project for deployment', () => {
    grunt.task.run('clean', 'babel');
  });

  grunt.registerTask('default', ['clean', 'babel']);
  grunt.registerTask('serve', ['clean', 'babel', 'eslint', 'watch']);
};
