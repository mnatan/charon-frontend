/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var mockModule = require("mocks/mocked-backend.js");

describe("Widok katalogu", function () {

    beforeEach(function () {
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
        browser.get(browser.params.front_url + '/#/katalog');
    });

    it("Wyświetla listę rejestracji", function () {
    });

});
