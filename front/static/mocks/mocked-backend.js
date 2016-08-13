/**
 * Created by Marcin Natanek on 06.08.2016.
 */

angular.module('httpBackendMock', ['charonFront', 'ngMockE2E'])
    .run(function ($httpBackend, $http) {
        $httpBackend.whenGET(/front\/static\//).passThrough();

        $http.get("front/static/mocks/mocks.js").then(function (response) {
            var charon_mocks = eval(response.data);
            
            $httpBackend.resetExpectations();

            $httpBackend.whenGET('/registrations').respond(charon_mocks.registrations);

            $httpBackend.whenGET(/.*/).passThrough();
        });
    });

