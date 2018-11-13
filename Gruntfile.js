
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: ['dist/', 'webapp/src/<%= pkg.name %>.js']
        },
        wiredep: {
            target: {
                src: 'webapp/index.html'
            }
        },
        concat: {
            js: {
                src: [
                    'webapp/src/app.js',
                    'webapp/src/app-config/*.js',
                    'webapp/src/components/**/*.js',
                    'webapp/src/service/**',
                    'webapp/src/directive/**'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        uglify: {
            dist: {
                src: 'dist/<%= pkg.name %>.min.js',
                dest : 'dist/<%= pkg.name %>.js'

            }
        },
        copy: {
            files: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'webapp/src/<%= pkg.name %>.js'
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'webapp/src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'webapp/assets/**/*.*'],
            tasks: ['jshint', 'concat', 'uglify', 'nodemon', 'watch']
        },
        nodemon: {
            script: 'index.js'
        }
    });

    grunt.registerTask('default', [ 'wiredep', 'nodemon' ]);
    grunt.registerTask('c', ['clean']);
    grunt.registerTask('dev', ['clean', 'wiredep', 'concat', 'uglify', 'copy', 'watch']);
    grunt.registerTask('prod', ['clean', 'wiredep', 'concat', 'uglify', 'nodemon']);

};