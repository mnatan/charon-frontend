/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var login = require("./login.page");
var register = require("./login.register.page");

describe("Widoki logowania", function () {

    describe("Rejestracja", function () {

        beforeEach(function () {
            register.get_page();
        });

        xit("powinna sprawdzać potwierdzenie hasła", function () {
            // FIXME nie działa?
            register.password.sendKeys("dupadupa");
            register.password_check.sendKeys("dupadupadupa");
            register.submit.click().then(function () {
                browser.wait(function () {
                    return register.form.getInnerHtml().then(function (html) {
                        return !!html.indexOf("Wpisane hasła nie zgadzają się");
                    });
                }, 1000);
            })
        });

        xit("powinna rejestrować użytkownika", function () {
            // TODO: co gdy już istnieje zarejestrowany użytkownik?
            register.name.sendKeys("Marcin");
            register.surname.sendKeys("Natanek");
            register.email.sendKeys("mnatan@openmailbox.org");
            element(by.cssContainingText('option', 'Mężczyzna')).click();
            register.citizenship.sendKeys("Polskie");
            register.pesel.sendKeys("94092606257");
            register.phone.sendKeys("723408934");
            register.password.sendKeys("dupadupa");
            register.password_check.sendKeys("dupadupa");
            register.submit.click().then(function () {
                expect(browser.getCurrentUrl()).toMatch("#/katalog");
            })
        });
    });

    describe("Log in/out ", function () {
        xit("login", function () {
            // FIXME testy nie czekają na zalogowanie
            expect(login.navigation.konto_btn.getInnerHtml()).toMatch("Konto");
            login.login_test_user();
            browser.wait(function () {
                return login.navigation.konto_btn.getInnerHtml().then(function (html) {
                    return !html.indexOf("Konto")
                })
            }).then(function () {
                expect(login.navigation.konto_btn.getInnerHtml()).toMatch("Marcin Natanek");
            });
        });

        xit("logout", function () {
            // TODO test powyżej jest wymagany
            login.navigation.get_main_page();
            expect(login.navigation.konto_btn.getInnerHtml()).toMatch("Marcin Natanek");
            login.logout_test_user();
            expect(login.navigation.konto_btn.getInnerHtml()).toMatch("Konto");
        });
    });

});
