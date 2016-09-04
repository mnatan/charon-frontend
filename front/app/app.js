/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charonFront', [
   
    'httpBackendMock',
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'schemaForm',
    'charonFront.forms',
    'charonFront.navigation',
    'charonFront.katalog',
    'charonFront.faq',
    'charonFront.kontakt',
    'charonFront.login',
    'charonFront.login.signup',
    'charonFront.login.signin'

]).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/katalog"); // Login to nasz home page

}).run(function ($rootScope, $window, $state, navigation, LoginService, $cookieStore) {

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
    
    var user = $cookieStore.get('user');
    LoginService.set_user(user);

});
