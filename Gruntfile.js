module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'front/static/app/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        karma: {
            unit: {
                configFile: 'js_tests/karma.conf.js',
                singleRun: true
            }
        },

        connect: {
            options: {
                port: 4444,
                hostname: 'localhost'
            },
            test: {
                options: {
                    base: ['front/static/app']
                }
            }
        },

        protractor: {
            options: {
                configFile: "js_tests/protractor-conf.js", // Default config file 
                noColor: false,
                args: {}
            }
            ,
            e2e: {
                keepAlive: true
            }
        }

    })
    ;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('tests', [
        // 'karma:unit',
        'connect:test',
        'protractor:e2e'
    ]);

    grunt.registerTask('default', [
        'uglify',
        'karma',
        'protractor'
    ]);

};