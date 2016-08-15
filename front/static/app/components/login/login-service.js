/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";
angular.module('charonFront.login')
    .factory('LoginService', function ($http) {
        return {
            getLoginForm: function () {
                return $http.get("/api/forms/login").then(function (response) {
                    return response.data;
                });
            },
            getSigninForm: function () {
                return $http.get("/api/forms/register").then(function (response) {
                    return response.data;
                });
            }
        }
    });
