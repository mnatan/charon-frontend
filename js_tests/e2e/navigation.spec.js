/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var menu = require("./navigation.page.js");

describe("Public Menu", function () {

    beforeEach(function () {
        menu.get_main_page();
    });

    it("Ma tytuł", function () {
        expect(browser.getTitle()).toContain("Charon");
    });

    it("UJ Logo odsyła na stronę UJ", function () {
        var logo = element(by.id("uj_logo"));
        expect(logo.isPresent).toBeTruthy();
        expect(logo.getAttribute('href')).toContain('uj.edu.pl');
    });

    it("Charon Logo odsyła na główną", function () {
        menu.site_logo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url + "#/katalog");
    });


    it("Guzik Katalog odsyła na główną", function () {
        menu.katalog_btn.click();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url + "#/katalog");
    });

    it("Guzik Konto odsyła do /login", function () {
        menu.konto_btn.click();
        menu.wait_for_loaidng();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url + "#/login");
    });

    it("Guzik Kontakt odsyła do /kontakt", function () {
        menu.kontakt_btn.click();
        menu.wait_for_loaidng();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url + "#/kontakt");
    });

    it("Guzik FAQ odsyła do /faq", function () {
        menu.faq_btn.click();
        menu.wait_for_loaidng();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url + "#/faq");
    });

    it("Guzik Konto otwiera submenu przy najechaniu i Logowanie odsyła do logowania", function () {
        browser.actions().mouseMove(menu.konto_btn).perform().then(function () {
            menu.login_btn.click();
            menu.wait_for_url("login");
        });
    });

    it("Guzik Konto otwiera submenu przy najechaniu i Rejestracja odsyła do rejstracji", function () {
        browser.actions().mouseMove(menu.konto_btn).perform().then(function () {
            menu.register_btn.click();
            menu.wait_for_url("login/register");
        });
    });

});

describe("Stopka", function () {

    it("Zawiera ceditsy dla uj", function () {
        var footer = element(by.tagName('footer'));
        var accepted_strings = [
            'Jagiellonian University',
            'Uniwersytet Jagielloński',
            'UJ'
        ];
        expect(footer.getInnerHtml())
            .toMatch(new RegExp(accepted_strings.join('|')));
    });

});
