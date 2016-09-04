/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";

angular.module('charonFront.faq')
    .factory('FaqService', function ($http) {
        return {
            getFaq: function () {
                return $http.get("/api/faq").then(function (response) {
                    return response.data;
                });
            }
        };
    });
