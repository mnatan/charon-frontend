/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signin', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signin', {
            url: '',
            abstract: true,
            templateUrl: '',
            controller: function ($scope) {
                $scope.title = 'Zaloguj się';
            }
        });
    }]);
