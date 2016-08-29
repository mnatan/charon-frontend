/**
 * Created by Marcin Natanek on 06.08.2016.
 */

angular.module('httpBackendMock', ['ngMockE2E'])
    .run(function ($httpBackend, $http) {
        $httpBackend.resetExpectations();

        $httpBackend.whenGET('/api/registrations').respond(charon_global_mocks.registrations);
        $httpBackend.whenGET(/\/api\/registrations\/.*/).respond(charon_global_mocks.registrations[0]);

        $httpBackend.whenGET('/api/forms/schema').respond(charon_global_mocks.forms.schema);
        $httpBackend.whenGET('/api/forms/login').respond(charon_global_mocks.forms.login);
        $httpBackend.whenGET('/api/forms/register').respond(charon_global_mocks.forms.register);
        $httpBackend.whenPOST('/api/users/login').respond(charon_global_mocks.login.login_response);
        $httpBackend.whenPOST('/api/users/register').respond(charon_global_mocks.login.register_response);

        $httpBackend.whenGET('/api/faq').respond(charon_global_mocks.faq);
        $httpBackend.whenGET('/api/kontakt').respond(charon_global_mocks.kontakt);

        $httpBackend.whenGET(/.*/).passThrough();
    });

