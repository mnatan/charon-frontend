/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.form', [])
    .directive('dynamicForm', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/front/static/app/components/forms/form.html',
            scope: {
                form: '=',
                ngModel: '='
            },
            controller: function ($rootScope, $scope) {
            }
        };
    });
