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
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    params: {
        front_url: 'http://localhost:8000/',
        back_url: 'http://localhost:3000/'
    },
    noColor: false,
    plugins: [{
        package: 'protractor-console',
        logLevels: ['severe']
    }],
    onPrepare: function () {
        var fs = require('fs-extra');
        browser.params.build_dir = __dirname + '/../build/';
        if (!fs.existsSync(browser.params.build_dir)) {
            fs.mkdirSync(browser.params.build_dir);
        }
        if (fs.existsSync(browser.params.build_dir + 'html')) {
            fs.removeSync(browser.params.build_dir + 'html')
        }

        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'summary',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
            displayFailuresSummary: true, // display summary of all failures after execution
            displayPendingSummary: true,  // display summary of all pending specs after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: true,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: true    // display each suite number (hierarchical)
        }));

        var HtmlReporter2 = require('protractor-angular-screenshot-reporter');
        jasmine.getEnv().addReporter(new HtmlReporter2({
            baseDirectory: browser.params.build_dir + 'html'
        }).getJasmine2Reporter());
    }
};
