// An example configuration file.
exports.config = {
    specs: [
        'e2e/**/*.js'
    ],
    seleniumAddress: 'http://localhost:6969/wd/hub',
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
        },
        'loggingPrefs': {
            'browser': 'ALL'
        }
    },
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    params: {
        front_url: 'http://mnatan.pl:8001/',
        back_url: 'http://mnatan.pl:3000/'
    },
    noColor: false
};
