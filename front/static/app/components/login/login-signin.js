/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signin', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signin', {
            url: '',
            templateUrl: '/front/static/app/components/login/login-signin.html',
            resolve: {
                loginForm: function (LoginService) {
                    return LoginService.getLoginForm();
                }
            },
            controller: function ($scope, loginForm) {
                $scope.loginForm = loginForm;
                $scope.title = 'Zaloguj się';
            }
        });
    }]);
