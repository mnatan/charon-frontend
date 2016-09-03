/**
 * Created by Marcin Natanek on 07.08.2016.
 */

"use strict";
angular.module('charonFront.login')
    .factory('LoginService', function ($state, $http, $cookieStore, $rootScope) {
        var me = this;

        this.register = function (form) {
            return $http.post("/api/register", form).then(function (response) {
                // TODO messages service
                if (response) {
                    // TODO obsługa błędów
                    $state.go('login.signin');
                }
            });
        };
        this.login = function (form) {
            return $http.post("/api/auth", form).then(function (response) {
                // TODO messages service

                if (response) {
                    // TODO obsługa błędów
                    me.set_user(response.data).then(function () {
                        $state.go('katalog');
                    });
                }
            });
        };
        this.set_user = function (data) {
            // TODO: error handling - deauth when token expires
            if (data != null) {
                console.log(data);
                $cookieStore.put("user", data);
                return $http.get("/api/students/" + data.id).then(function (response) {
                    $rootScope.user = {
                        logged_in: true,
                        id: data.id,
                        token: data.token,
                        name: response.data.name,
                        surname: response.data.surname,
                        fullname: response.data.name + " " + response.data.surname
                    };
                });
            } else {
                $cookieStore.remove("user");
                $rootScope.user = {
                    logged_in: false
                }
            }
        };

        return me;
    });
