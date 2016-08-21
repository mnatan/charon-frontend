/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var EC = protractor.ExpectedConditions;

var NavigationMenu = function () {
    browser.get(browser.params.front_url);

    var logo = element(by.id("main-logo"));

    browser.wait(function () {
        return browser.isElementPresent(logo);
    }, 1000);
};

NavigationMenu.prototype = Object.create({}, {
    site_logo: {
        get: function () {
            return element(by.id('main-logo'));
        }
    },
    katalog_btn: {
        get: function () {
            return element(by.id('katalog-btn'));
        }
    },
    konto_btn: {
        get: function () {
            return element(by.id('konto-btn'));
        }
    },
    login_btn: {
        get: function () {
            return element(by.id('signin-btn'));
        }
    },
    register_btn: {
        get: function () {
            return element(by.id('signup-btn'));
        }
    },
    loading: {
        get: function () {
            return element(by.id('loading-image'));
        }
    },
    wait_for_loaidng: {
        value: function () {
            return browser.wait(EC.invisibilityOf(this.loading), 1000);
        }
    },
    wait_for_url: {
        value: function (url, timeout) {
            timeout = typeof timeout !== 'undefined' ? timeout : 1000;
            browser.wait(function () {
                return browser.getCurrentUrl().then(function (url) {
                    return url.match(/login/);
                })
            }, timeout);
        }
    }
});

module.exports = NavigationMenu;
