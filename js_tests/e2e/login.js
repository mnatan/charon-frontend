/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

describe("Serwis logujący", function () {
    it("Login", function () {
        inject(function (LoginService, $httpBackend) {

            $httpBackend.expect('POST', 'http://api.mydomain.com/login')
                .respond(200, "[{ success : 'true', id : 123 }]");

            LoginService.login('test@test.csom', 'password')
                .then(function (data) {
                    expect(data.success).toBeTruthy();
                });


            $httpBackend.flush();
        });
    });
});


describe("Widoki logowania", function () {

    it("Login", function () {
        browser().navigateTo('#/login');
        expect(browser().location().path()).toBe("/login");

        // assuming inputs have ng-model specified, and this conbination will successfully login
        input('email').enter('test@test.com');
        input('password').enter('password');
        element('submit').click();

        // logged in route
        expect(browser().location().path()).toBe("/dashboard");

        // my dashboard page has a label for the email address of the logged in user
        expect(element('#email').html()).toContain('test@test.com');
    });

    it("Logout", function () {
        // Arrange

        // Act

        // Assert
    });

});
