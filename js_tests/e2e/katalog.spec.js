/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require("./mocks/mocked-backend.js");
// var angularMocks = require("../../node_modules/angular-mocks/angular-mocks");

var katalog = require("./katalog.page.js");
var kierunek = require("./katalog.kierunek.page.js");
var EC = protractor.ExpectedConditions;

describe("Login", function () {
    describe("Widok katalogu", function () {

        var EC = protractor.ExpectedConditions;

        beforeEach(function () {
            katalog.navigation.get_main_page();
        });

        it("Wyświetla listę rejestracji", function () {
            // zakłada że używamy mocków /registrations
            browser.wait(EC.textToBePresentInElement(katalog.wrapper, "Rejestracja"), 4000).then(function () {
                expect(katalog.registrations.count()).toEqual(2);
            });
        });

        it("Przekierowuje do podstrony kierunku po kliknięciu 'więcej'", function () {
            // zakłada że używamy mocków /registrations
            browser.wait(EC.visibilityOf(katalog.first_registration.more), 4000).then(function () {
                katalog.first_registration.more.click().then(function () {
                    expect(browser.getCurrentUrl()).toMatch("#/kierunek");
                });
            });
        });
    });

    describe("Widok kierunku", function () {
        beforeEach(function () {
            kierunek.get_page();
        });

        it("Przekierowuje do katalogu kierunku po kliknięciu 'porwrót'", function () {
            browser.wait(EC.visibilityOf(kierunek.back), 4000).then(function () {
                kierunek.back.click().then(function () {
                    expect(browser.getCurrentUrl()).toMatch("#/katalog");
                });
            });
        });
    });
});
