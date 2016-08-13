/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";

angular.module('charonFront.katalog')
    .factory('KatalogService', function ($http) {
        return {
            getRegistrations: function () {
                return $http.get("/registrations").then(function (response) {
                    return response.data;
                });
            }
        };
    });
