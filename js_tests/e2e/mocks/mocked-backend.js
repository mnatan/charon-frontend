/**
 * Created by Marcin Natanek on 06.08.2016.
 */

var mocks = require('./mocks.json');

exports.httpMocks = mocks;
exports.httpBackendMock = function () {
    angular.module('httpBackendMock', ['charonFront', 'ngMockE2E']).run(function ($httpBackend) {
        $httpBackend.whenGET('/events').respond([mocks.sample]);
        $httpBackend.whenGET('/events/' + sampleEventId).respond(mocks.sample);
    });
};

