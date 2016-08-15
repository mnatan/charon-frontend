/**
 * Created by Marcin Natanek on 06.08.2016.
 */

angular.module('httpBackendMock', ['ngMockE2E'])
    .run(function ($httpBackend, $http) {
        $httpBackend.resetExpectations();

        $httpBackend.whenGET('/api/registrations').respond(charon_global_mocks.registrations);
        $httpBackend.whenGET('/api/forms/login').respond(charon_global_mocks.forms.login);
        $httpBackend.whenGET('/api/forms/register').respond(charon_global_mocks.forms.register);

        $httpBackend.whenGET(/.*/).passThrough();
    });

