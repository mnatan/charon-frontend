/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signin', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signin', {
            url: '',
            templateUrl: '/app/components/login/login-signin.html',
            resolve: {
                form: function (FormService) {
                    return FormService.getForm("login");
                },
                formSchema: function (FormService) {
                    return FormService.getSchema();
                }
            },
            controller: function ($scope, form, formSchema, LoginService, $state) {
                $scope.title = 'Zaloguj się';
                $scope.$state = $state;

                $scope.schema = formSchema;
                $scope.form = form.form;
                $scope.model = {};
                $scope.onSubmit = function (form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        LoginService.login($scope.model);
                    }
                };
            }
        });
    }]);
