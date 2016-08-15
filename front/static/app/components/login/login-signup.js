/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signup', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signup', {
            url: '/register',
            templateUrl: '/front/static/app/components/login/login-signup.html',
            resolve: {
                signinForm: function (LoginService) {
                    return LoginService.getSigninForm();
                }
            },
            controller: function ($scope, signinForm) {
                $scope.title = 'Załóż nowe konto';

                $scope.schema = signinForm.schema;
                $scope.form = signinForm.form;
                $scope.model = {};
                $scope.onSubmit = function (form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        console.log(form);
                    }
                }
            }
        });
    }])
;
