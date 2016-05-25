describe("i18n service", function() {

    beforeEach(module("teachly.services"));

    it("should expose a fetch method", inject(function(i18n) {
        expect(i18n.fetch).toBeDefined();
    }));

    it("should return NOT_FOUND error when the string cannot be fetched", inject(function(i18n, constants) {

        var key = "qwerty";

        expect(i18n.fetch(key)).toEqual(constants.i18n.not_found + key);
    }));

});