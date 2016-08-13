/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.katalog', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('katalog', {
            url: '/katalog',
            templateUrl: '/front/static/app/components/katalog/katalog.html',
            controller: function ($scope, KatalogService) {
                $scope.title = 'Katalog Rekrutacji';
                KatalogService.getRegistrations().then(function (data) {
                    $scope.activeRegistrations = data;
                });
            }
        });
    }]);
