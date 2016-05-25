describe("toolbar controller", function() {

    beforeEach(module("teachly.controllers"));
    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        $provide.value("$cookieStore", {
            get: function () {},
            put: function () {}
        });

    }));

    it("should have an empty username and be hidden by default", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("toolbar", {
            $scope: scope
        });

        expect(scope.username).toEqual("");
        expect(scope.display).toEqual(false);

    }));

    it("should set the username and be displayed when login event get fired", inject(function($rootScope, $controller, constants, session) {

        var scope = $rootScope.$new();

        $controller("toolbar", {
            $scope: scope
        });

        session.create({username:"foo"});

        $rootScope.$broadcast(constants.events.user.login);

        expect(scope.username).toEqual("foo");
        expect(scope.display).toEqual(true);

    }));

    it("should be displayed and have the username set if the user is logged in", inject(function($rootScope, $controller, session) {

        var scope = $rootScope.$new();

        session.create({username:"foo"});

        $controller("toolbar", {
            $scope: scope
        });

        expect(scope.username).toEqual("foo");
//        expect(scope.display).toEqual(true);

    }));

    it("should be hide itself on logout and fire a logout event", inject(function($rootScope, $controller, session, constants) {

        var scope = $rootScope.$new();
        var fired = false;

        $rootScope.$on(constants.events.user.logout, function() {
            fired = true;
        });

        session.create({username:"foo"});

        $controller("toolbar", {
            $scope: scope
        });

        expect(scope.username).toEqual("foo");
//        expect(scope.display).toEqual(true);

        scope.logout();

        expect(scope.username).toEqual("");
//        expect(scope.display).toEqual(false);
        expect(fired).toEqual(true);

    }));

});