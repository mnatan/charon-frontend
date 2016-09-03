/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login.signup', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login.signup', {
            url: '/register',
            templateUrl: '/app/components/login/login-signup.html',
            resolve: {
                form: function (FormService) {
                    return FormService.getForm("register");
                },
                formSchema: function (FormService) {
                    return FormService.getSchema();
                }
            },
            controller: function ($scope, form, formSchema, LoginService) {
                $scope.title = 'Załóż nowe konto';

                $scope.schema = formSchema;
                $scope.form = form.form;
                $scope.model = {};
                $scope.onSubmit = function (form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid) {
                        if ($scope.model.password != $scope.model.password_check) {
                            $scope.$broadcast('schemaForm.error.password_check', 'passwordsDontMatch', 'Wpisane nie zgadzają się');
                        } else {
                            LoginService.register($scope.model);
                        }
                    }
                }
            }
        });
    }])
;
