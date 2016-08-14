/**
 * Created by Marcin Natanek on 06.08.2016.
 */

angular.module('httpBackendMock', ['ngMockE2E'])
    .run(function ($httpBackend, $http) {
        $httpBackend.resetExpectations();

        $httpBackend.whenGET('/registrations').respond(charon_global_mocks.registrations);

        $httpBackend.whenGET(/.*/).passThrough();
    });

