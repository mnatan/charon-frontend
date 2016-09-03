/**
 * Created by Marcin Natanek on 07.08.2016.
 */

angular.module('charonFront.faq', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('faq', {
            url: '/faq',
            templateUrl: '/app/components/faq/faq.html',
            resolve: {
                faq: function (FaqService) {
                    return FaqService.getFaq();
                }
            },
            controller: function ($scope, faq) {
                $scope.title = 'Najczęściej zadawane pytania';
                $scope.faq = faq;
            }
        });
    }]);
