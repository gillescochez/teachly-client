describe("restful service", function() {

    beforeEach(module("teachly.services"));

    it("should expose a query method", inject(function(restful) {
        expect(restful.query).toBeDefined();
    }));

});