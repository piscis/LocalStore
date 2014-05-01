module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            base: {
                src: ['ts/*.ts'],
                dest: 'js/LocalStore.js',
                options: {
                    target: 'es5',
                    basePath: 'ts',
                    sourceMap: true,
                    declaration: true,
                    noImplicitAny: true,
                    useTabIndent: true
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'js/LocalStore.js',
                options: {
                    specs: 'tests/*.js'
                }
            }
        },
        uglify: {
            build: {
                src: 'js/LocalStore.js',
                dest: 'js/LocalStore.min.js'
            },
            options: {
                sourceMap: true
            }
        },
        watch: {
            scripts: {
                files: ['ts/*.ts'],
                tasks: ['typescript', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['typescript', 'uglify', 'watch']);

};
