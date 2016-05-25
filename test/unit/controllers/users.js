describe("users controller", function() {

    beforeEach(module("teachly.controllers"));
    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

		$provide.value("$cookieStore", {
			get: function () {},
			put: function () {}
		});

		$provide.value("$routeParams", {});

    }));

    it("should convert fields into headers and add an Actions header", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("users", {
            $scope: scope
        });

        expect(scope.fields).toEqual(["first_name", "last_name", "username", "user_type"]);
        expect(scope.headers).toEqual(["First name", "Last name", "Username", "User type", "Actions"]);

    }));

});