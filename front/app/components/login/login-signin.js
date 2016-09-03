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
            controller: function ($scope, form, formSchema) {
                $scope.title = 'Zaloguj się';

                $scope.schema = formSchema;
                $scope.form = form.form;
                $scope.model = {};
                $scope.onSubmit = function (form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        if ($scope.model.password != $scope.model.password_check) {
                            $scope.$broadcast('schemaForm.error.password_check', 'passwordsDontMatch', 'Wpisane hasła nie zgadzają się');
                        } else {
                            console.log(form);
                            console.log($scope.model);
                        }
                    }
                };
            }
        });
    }]);
