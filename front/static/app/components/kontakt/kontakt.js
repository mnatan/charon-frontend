/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.kontakt', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('kontakt', {
            url: '/kontakt',
            templateUrl: '/front/static/app/components/kontakt/kontakt.html',
            resolve: {
                contacts: function (KontaktService) {
                    return KontaktService.getKontakt();
                }
            },
            controller: function ($scope, contacts) {
                $scope.title = 'Kontakt';
                $scope.contacts = contacts;
            }
        });
    }]);
