describe("sections controller", function() {

	beforeEach(module("teachly.controllers"));
	beforeEach(module("teachly.services"));

	// fake $cookieStore for the session service
	beforeEach(module(function($provide) {

		$provide.value("$cookieStore", {
			get: function() {},
			put: function() {}
		});

	}));

	it("should have empty sections by default", inject(function($rootScope, $controller) {

		var scope = $rootScope.$new();

		$controller("sections", {
			$scope: scope
		});

		expect(scope.sections).toEqual([]);

	}));

	it("should have 4 sections for schools user_type:1", inject(function($rootScope, $controller, session) {

		var scope = $rootScope.$new();

		session.create({user_type:1});

		$controller("sections", {
			$scope: scope
		});

		expect(scope.sections.length).toEqual(2);
		expect(scope.sections[0]).toEqual({label: "Users", path: "/users"});
		expect(scope.sections[1]).toEqual({label: "Lessons", path: "/lessons"});

	}));

	it("should have 1 sections for teachers user_type:2", inject(function($rootScope, $controller, session) {

		var scope = $rootScope.$new();

		session.create({user_type:2});

		$controller("sections", {
			$scope: scope
		});

		expect(scope.sections.length).toEqual(1);
		expect(scope.sections[0]).toEqual({label: "Lessons", path: "/lessons"});

	}));

	it("should have 1 sections for students user_type:3", inject(function($rootScope, $controller, session) {

		var scope = $rootScope.$new();

		session.create({user_type:3});

		$controller("sections", {
			$scope: scope
		});

		expect(scope.sections.length).toEqual(1);
		expect(scope.sections[0]).toEqual({label: "Lessons", path: "/lessons"});

	}));

});