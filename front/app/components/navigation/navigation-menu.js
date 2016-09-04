/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront.navigation', [])
    .directive('navigationMenu', function (LoginService, $state) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/app/components/navigation/navigation-menu.html',
            controller: function ($rootScope, $scope, navigation) {
                $scope.logout = function () {
                    LoginService.set_user(null);
                    $state.go('katalog');
                };
                $scope.rootScope = $rootScope;
                $scope.navigation = navigation;
                $scope.debug = function () {
                    debugger;
                }
            }
        };
    })
    .factory('navigation', function ($rootScope) {
        var timer;
        return {
            status: 'ready',
            isLoading: function () {
                return this.status == 'loading';
            },
            loading: function () {
                clearTimeout(timer);
                this.status = 'loading';
            },
            ready: function () {
                clearTimeout(timer);
                this.status = 'ready';
            }
        };
    });
