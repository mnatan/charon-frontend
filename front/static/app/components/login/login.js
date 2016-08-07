/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.login', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            abstract: true,
            template: "<div ui-view></div>",
            controller: function ($scope) {
            }
        });
    }]);
