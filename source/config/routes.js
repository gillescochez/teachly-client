/**
 * Routing for the application
 * @param $routeProvider
 * @param $httpProvider
 */
config.routes = function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;

	$routeProvider.when("/login", {
		templateUrl: "partials/login.html",
		controller: "login"
	});

	$routeProvider.when("/dashboard", {
		templateUrl: "partials/dashboard.html",
		controller: "dashboard"
	});

	$routeProvider.when("/calendar", {
		templateUrl: "partials/calendar.html",
		controller: "calendar"
	});

	config.routes.api($routeProvider, "users");
	config.routes.api($routeProvider, "lessons", {
        list: "partials/lessons.html"
    });
	config.routes.api($routeProvider, "news");
	config.routes.api($routeProvider, "subjects");
	config.routes.api($routeProvider, "questions");
	config.routes.api($routeProvider, "answers");
	config.routes.api($routeProvider, "activities");
	config.routes.api($routeProvider, "results");
	config.routes.api($routeProvider, "logs");

	$routeProvider.when("/forums", {
		templateUrl: "partials/forums.html",
		controller: "forums"
	});

	$routeProvider.when("/lesson/:id", {
		templateUrl: "partials/lesson.html",
		controller: "lesson"
	});

	$routeProvider.when("/questions/list/:lesson_id", {
		templateUrl: "partials/section/list.html",
		controller: "questions"
	});

	$routeProvider.when("/questions/create/:lesson_id", {
		templateUrl: "partials/section/edit.html",
		controller: "questions"
	});

	$routeProvider.when("/questions/edit/:id/:lesson_id", {
		templateUrl: "partials/section/edit.html",
		controller: "questions"
	});

	$routeProvider.when("/answers/list/:question_id", {
		templateUrl: "partials/section/list.html",
		controller: "answers"
	});

	$routeProvider.when("/answers/create/:question_id", {
		templateUrl: "partials/section/edit.html",
		controller: "answers"
	});

	$routeProvider.when("/answers/edit/:id/:question_id", {
		templateUrl: "partials/section/edit.html",
		controller: "answers"
	});

    $routeProvider.when("/lessons/live/:id", {
        templateUrl: "partials/live.html",
        controller: "live"
    });

    $routeProvider.when("/results/:lesson_id", {
        templateUrl: "partials/results.html",
        controller: "results"
    });

	$routeProvider.otherwise({
		redirectTo: "/dashboard"
	});
};

/**
 * Set API routing for a given name
 * @param $routeProvider {Object} Angular route provider
 * @param name {String}
 * @param [partials] {Object} Map of partial to override defaults
 */
config.routes.api = function($routeProvider, name, partials) {

	var templates = {
        list: "partials/section/list.html",
        view: "partials/section/view.html",
        edit: "partials/section/edit.html",
        create: "partials/section/edit.html",
        remove: "partials/section/remove.html"
    };

	if (name === "logs") {
		templates.list = "partials/logs.html"
	}

    angular.extend(templates, partials);

    $routeProvider.when("/" + name, {
		templateUrl: templates.list,
		controller: name,
		data: {
			user_type: 1
		}
	});

	$routeProvider.when("/" + name + "/view/:id", {
		templateUrl: templates.view,
		controller: name,
		data: {
			user_type: 1
		}
	});

	$routeProvider.when("/" + name + "/edit/:id", {
		templateUrl: templates.edit,
		controller: name,
		data: {
			user_type: 1
		}
	});

	$routeProvider.when("/" + name + "/create", {
		templateUrl: templates.create,
		controller: name,
		data: {
			user_type: 1
		}
	});

	$routeProvider.when("/" + name + "/remove/:id", {
		templateUrl: templates.remove,
		controller: name,
		data: {
			user_type: 1
		}
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
config.routes.$inject = ["$routeProvider", "$httpProvider"];