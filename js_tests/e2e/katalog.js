/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require("./mocks/mocked-backend.js");
// var angularMocks = require("../../node_modules/angular-mocks/angular-mocks");

describe("Widok katalogu", function () {

    beforeEach(function () {
        browser.get(browser.params.front_url + '#/katalog');
        browser.wait(function () {
            return browser.isElementPresent(element(by.id("main_logo")));
        }, 1000);
    });

    it("Wyświetla listę rejestracji", function () {
        // zakłada że używamy mocków /registrations
        var registrations = element.all(by.className("registration-card"));
        expect(registrations.count()).toEqual(2);
    });

});
