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
        element(by.id("main_logo")).click();
        expect(browser.getLocationAbsUrl()).toEqual(browser.params.front_url);
    });

    it("UJ Logo odsyła na stronę UJ", function () {
        element(by.id("uj_logo")).click();
        expect(browser.getLocationAbsUrl()).toEqual('www.uj.edu.pl');
    });

    it("Guzik Katalog odsyła na główną", function () {
        element(by.buttonText("Katalog")).click();
        expect(browser.getLocationAbsUrl()).toEqual(browser.params.front_url);
    });

});
