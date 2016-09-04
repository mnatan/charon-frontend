/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

var menu = require("./navigation.page.js");

describe("Publiczne Menu", function () {

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
        expect(browser.getCurrentUrl()).toMatch("#/katalog");
        browser.wait(menu.isCssActive(menu.katalog_btn), 1000);
    });

    it("Guzik Login odsyła na główną", function () {
        menu.katalog_btn.click();
        expect(browser.getCurrentUrl()).toMatch("#/katalog");
        menu.takeScreenshot("home");
        browser.wait(menu.isCssActive(menu.katalog_btn), 1000);
    });

    it("Guzik Konto odsyła do /login", function () {
        menu.konto_btn.click();
        menu.wait_for_loaidng();
        browser.wait(menu.isCssActive(menu.konto_btn), 1000);
        expect(browser.getCurrentUrl()).toMatch("#/login");
    });

    it("Guzik Kontakt odsyła do /kontakt", function () {
        menu.kontakt_btn.click();
        menu.wait_for_loaidng();
        expect(browser.getCurrentUrl()).toMatch("#/kontakt");
        menu.takeScreenshot("kontakt");
        browser.wait(menu.isCssActive(menu.kontakt_btn), 1000);
    });

    it("Guzik FAQ odsyła do /faq", function () {
        menu.faq_btn.click();
        menu.wait_for_loaidng();
        expect(browser.getCurrentUrl()).toMatch("#/faq");
        menu.takeScreenshot("faq");
        browser.wait(menu.isCssActive(menu.faq_btn), 1000);
    });

    it("Guzik Konto > Logowanie odsyła do logowania", function () {
        browser.actions().mouseMove(menu.konto_btn).perform().then(function () {
            menu.login_btn.click();
            menu.wait_for_url("login");
            menu.takeScreenshot("login");
            browser.wait(menu.isCssActive(menu.konto_btn), 1000);
        });
    });

    it("Guzik Konto > Rejestracja odsyła do rejstracji", function () {
        browser.actions().mouseMove(menu.konto_btn).perform().then(function () {
            menu.register_btn.click();
            menu.wait_for_url("login/register");
            menu.takeScreenshot("register");
            browser.wait(menu.isCssActive(menu.konto_btn), 1000);
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
