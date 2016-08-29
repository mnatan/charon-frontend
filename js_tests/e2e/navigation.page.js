/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var EC = protractor.ExpectedConditions;
var fs = require('fs');

var NavigationMenu = function () {
    this.get_main_page = function () {
        browser.get(browser.params.front_url);

        var logo = element(by.id("main-logo"));

        browser.wait(function () {
            return browser.isElementPresent(logo);
        }, 1000);
    };

    this.site_logo = element(by.id('main-logo'));
    this.katalog_btn = element(by.id('katalog-btn'));
    this.konto_btn = element(by.id('konto-btn'));
    this.faq_btn = element(by.id('faq-btn'));
    this.kontakt_btn = element(by.id('kontakt-btn'));
    this.login_btn = element(by.id('signin-btn'));
    this.register_btn = element(by.id('signup-btn'));
    this.loading = element(by.id('loading-image'));

    this.takeScreenshot = function (name) {
        var dir = browser.params.build_dir + 'screenshots/';
        browser.takeScreenshot().then(function (png) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            var stream = fs.createWriteStream(dir + name + '.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        })
    };

    this.isCssActive = function (menu_btn_element) {
        return menu_btn_element.element(by.xpath("..")).getAttribute("class").then(parent_classes => {
            return !!parent_classes.indexOf('active');
        });
    };

    this.wait_for_loaidng = function () {
        return browser.wait(EC.invisibilityOf(this.loading), 1000);
    };

    this.wait_for_url = function (url, timeout) {
        timeout = typeof timeout !== 'undefined' ? timeout : 1000;
        browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                return url.match(/login/);
            })
        }, timeout);
    };
};

module.exports = new NavigationMenu();
