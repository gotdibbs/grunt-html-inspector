module.exports = function defineExports(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                includeJquery: true,
            },
            all: ['tasks/*.js', 'tasks/includes/bridge.js', 'tasks/lib/**/*.js']
        },

        nodeunit: {
            all: ['test/*.js']
        },

        // Example only
        'html-inspector': {
            options: {
                includeJquery: true
            },
            all: {
                src: ['./example/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Example only
    grunt.loadTasks('./tasks/');

    grunt.registerTask('default', ['jshint', 'nodeunit']);
};