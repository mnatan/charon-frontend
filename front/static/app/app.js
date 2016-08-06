/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront', [
    // 'ui.bootstrap',
    // 'ui.router',
    'charonFront.navigation'
]).value('$strap.config', {
    datepicker: {
        language: 'pl'
    }
}).run(function ($rootScope, $window) {

    $rootScope.$on('$stateChangeStart', function () {
        navigation.loading();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.title;
        navigation.ready();
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        throw error;
    });

    $rootScope.goBack = function () {
        $window.history.back();
    };

});

