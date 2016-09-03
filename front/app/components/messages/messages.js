/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront.navigation', [])
    .directive('navigationMenu', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/app/components/messages/messages.html',
            controller: function ($rootScope, $scope, MessagesService) {
               
            }
        };
    })
    .factory('MessagesService', function ($rootScope) {
    });
