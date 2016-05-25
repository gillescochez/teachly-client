describe("permissions service", function() {

    beforeEach(module("teachly.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {
        $provide.value("$cookieStore", {
            get: function() {},
            put: function() {}
        });
    }));

    it("should expose a getAllowedSections method", inject(function(permissions) {
        expect(permissions.getAllowedSections).toBeDefined();
    }));

    it("should return the right rules for school user_type (1)", inject(function(permissions, session) {

        session.create({user_type: 1});

        expect(permissions.getAllowedSections()).toEqual({
            users: ["add", "edit", "remove", "view"],
            lessons: ["view"],
            questions: ["view"],
            answers: ["view"]
        });

    }));

    it("should return the right rules for teachers user_type (2)", inject(function(permissions, session) {

        session.create({user_type: 2});

        expect(permissions.getAllowedSections()).toEqual({
            lessons: ["add", "edit", "remove", "view", "start", "results"],
            questions: ["add", "edit", "remove", "view"],
            answers: ["add", "edit", "remove", "view"]
        });

    }));

    it("should return the right rules for students user_type (3)", inject(function(permissions, session) {

        session.create({user_type: 3});

        expect(permissions.getAllowedSections()).toEqual({
            lessons: ["view", "join", "results"]
        });

    }));

});