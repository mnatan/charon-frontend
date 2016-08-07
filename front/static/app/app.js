/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront', [
    'ui.router',
    'ui.bootstrap',
    'charonFront.navigation',
    'charonFront.katalog',
    'charonFront.login',
    'charonFront.login.signup',
    'charonFront.login.signin',
    'charonFront.form'
]).config(function ($stateProvider, $urlRouterProvider, $interpolateProvider) {
    $urlRouterProvider.otherwise("/katalog"); // Katalog to nasz home page

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
}).value('$strap.config', {
    datepicker: {
        language: 'pl'
    }
}).run(function ($rootScope, $window, $state, navigation) {

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

    $rootScope.$state = $state;

});

