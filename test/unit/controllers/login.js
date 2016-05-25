describe("login controller", function() {

    beforeEach(module("teachly.controllers"));
    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        $provide.value("$cookieStore", {
            get: function () {},
            put: function () {}
        });

    }));

    it("should have an empty username/password and no errors", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("login", {
            $scope: scope
        });

        expect(scope.username).toEqual("");
        expect(scope.password).toEqual("");
        expect(scope.errors.username).toEqual(false);
        expect(scope.errors.password).toEqual(false);

    }));

});