/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require("./mocks/mocked-backend.js");
// var angularMocks = require("../../node_modules/angular-mocks/angular-mocks");

var menu = require("./navigation.page.js");

describe("Widok katalogu", function () {

    var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        menu.get_main_page();
        browser.get(browser.params.front_url + '#/katalog');
        browser.wait(function () {
            return browser.isElementPresent(element(by.id("main-logo")));
        }, 1000);
    });

    it("Wyświetla listę rejestracji", function () {
        // zakłada że używamy mocków /registrations
        browser.wait(EC.textToBePresentInElement(element(by.id("wrapper")), "Rejestracja"), 4000).then(function () {
            var registrations = element.all(by.className("registration-card"));
            expect(registrations.count()).toEqual(2);
        });
    });

});
