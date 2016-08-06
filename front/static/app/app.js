/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

angular.module('charon-front', [
    'ui.bootstrap',
    'ui.router',
    'charon-front.navigation'
]).config(function () {
    debugger;
});

angular.module('charon-front').config(function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
});

angular.module('charon-front').value('$strap.config', {
    datepicker: {
        language: 'pl'
    }
});

angular.module('charon-front').run(function ($rootScope, $location, $state, $stateParams, navigation, $window, Utility, messagesService, OAuth) {

    var path = function () {
        return $location.path();
    };

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

