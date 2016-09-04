/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var EC = protractor.ExpectedConditions;

var Login = function () {
    var me = this;

    this.navigation = require('./navigation.page');
    this.login = require('./login.page');

    this.get_page = function () {
        this.navigation.get_main_page();
        browser.actions().mouseMove(this.navigation.konto_btn).perform().then(function () {
            me.navigation.register_btn.click();
            me.navigation.wait_for_url("login/register");
        });
    };
    
    this.form = element(by.id('registration_form'));
    
    this.name = element(by.id('name'));
    this.surname = element(by.id('surname'));
    this.email = element(by.id('email'));
    this.gender = element(by.model("model['sex']"));
    this.citizenship = element(by.id('citizenship'));
    this.pesel = element(by.id('pesel'));
    this.phone = element(by.id('phone_number'));
    this.password = element(by.id('password'));
    this.password_check = element(by.id('password_check'));
    
    this.submit = element(by.partialButtonText('Zarejestruj'));
};

module.exports = new Login();

