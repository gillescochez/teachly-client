describe("dashboard controller", function() {

    beforeEach(module("teachly.controllers"));
    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        $provide.value("$cookieStore", {
            get: function () {},
            put: function () {}
        });

    }));

    it("should have a list of sections reflecting the permissions object", inject(function($rootScope, $controller, session) {

        var scope = $rootScope.$new();

        session.create({user_type: 3});

        $controller("dashboard", {
            $scope: scope
        });

        expect(scope.sections).toEqual({
            lessons: ["view", "join", "results"]
        });

    }));

});