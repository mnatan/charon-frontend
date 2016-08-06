/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront.navigation', [])
    .directive('navigationMenu', function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: '/front/static/app/components/navigation/navigation-menu.html',
            controller: function ($rootScope, $scope, navigation) {
                console.log("dupsztal");
                $scope.navigation = navigation;
            }
            // link: function (scope, element, attrs) {
            //     $(element).find(".dropdown").hover(
            //         function () {
            //             $(this).addClass('open')
            //         },
            //         function () {
            //             $(this).removeClass('open')
            //         }
            //     );
            // }
        };
    })
    .factory('navigation', function ($rootScope) {
        var timer;
        debugger;
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
