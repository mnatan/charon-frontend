/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require("./mocks/mocked-backend.js");
// var angularMocks = require("../../node_modules/angular-mocks/angular-mocks");

describe("Widok katalogu", function () {

    beforeEach(function () {
        browser.get(browser.params.front_url + '#/katalog');
    });

    it("Wyświetla listę rejestracji", function () {
        element.all(by.css("dupa"));
    });

});
