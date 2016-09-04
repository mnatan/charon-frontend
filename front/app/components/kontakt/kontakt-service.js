/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";

angular.module('charonFront.kontakt')
    .factory('KontaktService', function ($http) {
        return {
            getKontakt: function () {
                return $http.get("/api/kontakt").then(function (response) {
                    return response.data;
                });
            }
        };
    });
