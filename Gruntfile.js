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
        express: {
            options: {
                // Override defaults here
            },
            prod: {
                options: {
                    background: true,
                    script: 'server.js',
                    args: ['prod']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ignore: ["build/*", "js_tests/*"],
                    args: ['dev']
                }
            }
        },
        protractor: {
            options: {
                configFile: "js_tests/protractor-conf.js" // Default config file 
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
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('dev-server', [
        'nodemon:dev'
    ]);

    grunt.registerTask('e2e-tests', [
        'protractor:e2e'
    ]);

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