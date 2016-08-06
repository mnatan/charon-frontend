module.exports = function (grunt) {
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
            options: {
                configFile: 'js_tests/karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            continuous: {
                singleRun: false
            }
        },
        // connect: {
        //     options: {
        //         port: 4444,
        //         hostname: 'localhost'
        //     },
        //     test: {
        //         options: {
        //             base: ['front/static/app']
        //         }
        //     }
        // },
        protractor: {
            options: {
                configFile: "js_tests/protractor-conf.js", // Default config file 
                noColor: false,
                args: {
                    params: {
                        front_url: 'http://mnatan.pl:8001',
                        back_url: 'http://mnatan.pl:3000'
                    }
                }
            },
            e2e: {
                keepAlive: false
            },
            continuous: {
                keepAlive: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('tests', [
        // 'connect:test',
        'karma:unit',
        'protractor:e2e'
    ]);

    grunt.registerTask('default', [
        'tests',
        'uglify'
    ]);
};