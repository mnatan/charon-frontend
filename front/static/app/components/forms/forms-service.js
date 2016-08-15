/**
 * Created by Marcin Natanek on 15.08.2016.
 */

angular.module('charonFront.forms', [])
    .factory('FormService', function ($http) {
        return {
            getForm: function (name) {
                return $http.get("/api/forms/" + name).then(function (response) {
                    return response.data;
                });
            },
            getSchema: function () {
                return $http.get("/api/forms/schema" + name).then(function (response) {
                    return response.data;
                });
            }
        };
    });
