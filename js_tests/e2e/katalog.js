/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var mockModule = require('./mocks/mocked-backend');

function httpGet(siteUrl) {
    var http = require('http');
    var defer = protractor.promise.defer();

    http.get(siteUrl, function (response) {

        var bodyString = '';

        response.setEncoding('utf8');

        response.on("data", function (chunk) {
            bodyString += chunk;
        });

        response.on('end', function () {
            defer.fulfill({
                statusCode: response.statusCode,
                bodyString: bodyString
            });
        });

    }).on('error', function (e) {
        defer.reject("Got http.get error: " + e.message);
    });

    return defer.promise;
}

describe("Widok katalogu", function () {

    beforeEach(function () {
        browser.get(browser.params.front_url);
    });

    it("Wyświetla listę rejestracji", function () {
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);

        httpGet("/events/").then(function (result) {
            expect(result.statusCode).toBe(200);
            expect(result.bodyString).toBe(JSON.serialize(mockModule.httpMocks.sample));
        });
    });
});
