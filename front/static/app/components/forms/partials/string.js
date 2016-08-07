/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.form.string', [])
    .directive('formString', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/front/static/app/components/forms/partials/string.html',
            controller: function ($rootScope, $scope, navigation) {
                $scope.navigation = navigation;
            }
        };
    });
