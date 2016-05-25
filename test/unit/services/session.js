describe("session service", function() {

    var cookie;

    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        cookie = {};

        $provide.value("$cookieStore", {
            get: function(key) {
                return cookie[key];
            },
            put: function(key, value) {
                cookie[key] = value;
            }
        });

    }));

    it("should expose getters, create and destroy methods", inject(function(session) {
        expect(session.getId).toBeDefined();
        expect(session.getUsername).toBeDefined();
        expect(session.getUserType).toBeDefined();
        expect(session.create).toBeDefined();
        expect(session.destroy).toBeDefined();
    }));

    it("should return undefined through getters when no session is created", inject(function(session) {
        expect(session.getId()).toEqual(undefined);
        expect(session.getUsername()).toEqual(undefined);
        expect(session.getUserType()).toEqual(undefined);
    }));

    it("should return the right values through getters after a session is created", inject(function(session) {

        session.create({
            username: "foo",
            user_type: 1,
            id:1
        });

        expect(session.getId()).toEqual(1);
        expect(session.getUsername()).toEqual("foo");
        expect(session.getUserType()).toEqual(1);
    }));

    it("should return undefined through getters when after session is destroyed", inject(function(session) {

        session.create({
            username: "foo",
            user_type: 1,
            id:1
        });

        session.destroy();

        expect(session.getId()).toEqual(undefined);
        expect(session.getUsername()).toEqual(undefined);
        expect(session.getUserType()).toEqual(undefined);
    }));

    it("should update the cookie value on create and destroy", inject(function(session) {

        var user = {
            username: "foo",
            user_type: 1,
            id: 1
        };

        session.create(user);

        expect(cookie.user).toBeDefined();
        expect(cookie.user).toEqual(user);

        session.destroy();

        expect(cookie.user).toEqual(null);

    }));

});