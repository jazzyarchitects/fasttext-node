module.exports = function(grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      lib: {
        src: ['dist/**/*.*'],
      },
    },

    babel: {
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

    eslint: {
      options: {
        configFile: '.eslintrc.js',
        fix: true,
      },
      lib: {
        src: ['lib/**/*.js'],
      },
    },

    watch: {
      lib: {
        files: ['./lib/**/*.js'],
        tasks: ['clean', 'eslint', 'babel'],
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
