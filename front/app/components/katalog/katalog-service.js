/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";

angular.module('charonFront.katalog')
    .factory('KatalogService', function ($http) {
        return {
            getRegistrations: function (id) {
                if (id == null) {
                    console.log("id=null");
                    return $http.get("/api/registrations").then(function (response) {
                        return response.data;
                    });
                } else {
                    console.log("id=" + id);
                    return $http.get("/api/registrations/" + id).then(function (response) {
                        return response.data;
                    });
                }
            }
        };
    });
