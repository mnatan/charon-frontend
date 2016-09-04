/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require("./mocks/mocked-backend.js");
// var angularMocks = require("../../node_modules/angular-mocks/angular-mocks");

"use strict";

var EC = protractor.ExpectedConditions;

var Katalog = function () {
    this.navigation = require('./navigation.page');

    this.get_main_page = function () {
        this.navigation.get_main_page();
    };

    this.wrapper = element(by.id("wrapper"));
    this.registrations = element.all(by.className("registration-card"));
    this.first_registration = this.registrations.get(0);
    this.first_registration.more = this.first_registration.element(by.partialButtonText("Więcej"))
};

module.exports = new Katalog();

