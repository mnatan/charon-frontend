/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signin', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signin', {
            url: '',
            templateUrl: '/front/static/app/components/login/login-signin.html',
            resolve: {
                form: function (FormService) {
                    return FormService.getForm("login");
                },
                formSchema: function (FormService) {
                    return FormService.getSchema();
                }
            },
            controller: function ($scope, form, formSchema) {
                $scope.title = 'Zaloguj się';

                $scope.schema = formSchema;
                $scope.form = form.form;
                $scope.model = {};
                $scope.onSubmit = function (form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        console.log(form);
                        console.log($scope.model);
                    }
                };
            }
        });
    }]);
