/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";

angular.module('charonFront.katalog')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('kierunek', {
            url: '/kierunek/{id:[^/]*}',
            resolve: {
                kierunek_data: function ($stateParams, KatalogService) {
                    return KatalogService.getRegistrations($stateParams.id).then(function (data) {
                        return data;
                    });
                }
            },
            templateUrl: '/app/components/katalog/kierunek.html',
            controller: function ($scope, kierunek_data) {
                $scope.title = 'Kierunek: ' + kierunek_data.name;
                $scope.kierunek = kierunek_data;
                console.log($scope.kierunek);
            }
        });
    }]);
