/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var EC = protractor.ExpectedConditions;

var Login = function () {
    var me = this;

    this.navigation = require('./navigation.page');

    this.get_page = function () {
        this.navigation.get_main_page();
        this.navigation.konto_btn.click();
    };
    
    this.login_test_user = function () {
        me.get_page();
        me.login.sendKeys("mnatan@openmailbox.org");
        me.password.sendKeys("dupadupa");
        me.submit.click();
    };
    
    this.logout_test_user = function () {
        browser.actions().mouseMove(me.navigation.konto_btn).perform().then(function () {
            me.navigation.logout_btn.click();
        });
    };

    this.login = element(by.id('login'));
    this.password = element(by.id('password'));
    
    this.submit = element(by.partialButtonText('Zaloguj'));
};

module.exports = new Login();

