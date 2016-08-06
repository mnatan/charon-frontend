// An example configuration file.
exports.config = {
    specs: ['e2e/**/*.js'],
    seleniumAddress: 'http://localhost:6969/wd/hub',
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
