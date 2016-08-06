/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

// var mockModule = require('./mocks/mocked-backend');

describe("Widok katalogu", function () {

    beforeEach(function () {
        browser.get(browser.params.front_url);
    });

    it("Wyświetla listę rejestracji", function () {
        // browser.addMockModule('httpBackendMock', mockModule.httpBackendMock);
        //
        // httpGet("/events/").then(function (result) {
        //     expect(result.statusCode).toBe(200);
        //     expect(result.bodyString).toBe(JSON.stringify(mockModule.httpMocks.sample));
        // });
    });
});
