/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signup', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signup', {
            url: '/register',
            abstract: true,
            templateUrl: '',
            controller: function ($scope) {
                $scope.title = 'Załóż nowe konto';
            }
        });
    }]);
