/**
 * Created by Marcin Natanek on 06.08.2016.
 */

"use strict";

describe("Widok menu", function () {


    beforeEach(function () {
        browser.get(browser.params.front_url);
    });

    it("Ma tytuł", function () {
        expect(browser.getTitle()).toContain("Charon");
    });

    it("Charon Logo odsyła na główną", function () {
        var logo = element(by.id("main_logo"));
        expect(logo.isPresent).toBeTruthy();
        logo.click();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url);
    });

    it("UJ Logo odsyła na stronę UJ", function () {
        var logo = element(by.id("uj_logo"));
        expect(logo.isPresent).toBeTruthy();
        expect(logo.getAttribute('href')).toContain('uj.edu.pl');
    });

    it("Guzik Katalog odsyła na główną", function () {
        element(by.partialLinkText("Katalog")).click();
        expect(browser.getCurrentUrl()).toEqual(browser.params.front_url);
    });
    
    // TODO reszta menu

});
