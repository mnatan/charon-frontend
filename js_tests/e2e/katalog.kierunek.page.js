/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var EC = protractor.ExpectedConditions;

var Katalog = function () {
    var me = this;

    this.navigation = require('./navigation.page');
    this.katalog = require('./katalog.page');

    this.get_page = function () {
        this.navigation.get_main_page();
        browser.wait(EC.visibilityOf(me.katalog.first_registration.more), 4000).then(function () {
            me.katalog.first_registration.more.click()
        });
    };

    this.wrapper = element(by.id("wrapper"));
    this.back = element(by.partialButtonText("Powrót"))
};

module.exports = new Katalog();

