describe("users service", function() {

    beforeEach(module("teachly.services"));

    it("should expose a login and getAll methods", inject(function(users) {
        expect(users.login).toBeDefined();
        expect(users.getAll).toBeDefined();
    }));

});