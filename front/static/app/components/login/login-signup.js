/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signup', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signup', {
            url: '/register',
            templateUrl: '/front/static/app/components/login/login-signup.html',
            controller: function ($scope) {
                $scope.title = 'Załóż nowe konto';
            }
        });
    }]);
