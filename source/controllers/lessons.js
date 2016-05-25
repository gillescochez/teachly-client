/**
 * Lessons controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location
 * @param i18n {Object} i18n service
 * @param permissions {Object} permissions service
 * @param toasts {Object} toasts service
 * @param lessons {Object} lessons service
 * @param session {Object} session service
 * @param subjects {Object} subjects service
 */
controllers.lessons = function($scope, $rootScope, $location, $routeParams, i18n, permissions, toasts, lessons, session, subjects) {

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "lessons",
		service: lessons,
		id: $routeParams.id,
		action: controllers.abstract.getAction($location.path()),
		fields: {
			edit: ["title", "subject_id", "start_date", "start_time", "published"],
			create: ["title", "subject_id", "start_date", "start_time", "published"],
			list: ["title", "start_date", "start_time"]
		},
		types: {
            subject_id: {
                value: 'select',
                provider: subjects
            },
			start_date: {
				value: "date"
			},
			start_time: {
				value: "time"
			},
            published: {
                value: "checkbox"
            }
		}
	});

    $scope.signUp = function(id) {
        lessons.register({
            lesson_id: id,
            student_id: session.getId()
        }).success(function() {
            $scope.items.forEach(function(item) {
                if (item.id == id) {
                    item.signed = true;
                }
            });
        }).error(function() {
            toasts.error("Sign up failed!");
        });
    };

	if (permissions.can("view", "questions")) {

		$scope.actions.extra = {
			getUrl: function(id) {
				return "/questions/list/" + id;
			},
			label: "View questions"
		}

	}

		// if we can't see questions we subscribe so the lessons list is updated live
		io.socket.on("lessons", function(res) {

            var found = null;

            if (res.verb === "updated") {

                $scope.items.forEach(function(item, i) {

                    if (item.id == res.data.id) {

                        found = true;

                        if (res.data.published || res.data.initialized || res.data.started) {
                            angular.extend($scope.items[i], res.data);
                        } else {
                            if (!res.data.published || res.data.published == false) {
                                $scope.items.splice(i, 1);
                            }
                        }
                    }
                });

                if (!found) {
                    $scope.items.push(res.data);
                    found = null;
                }

                $scope.$apply();
            }

            if (res.verb === "created") {
                $scope.items.push(res.data);
                $scope.$apply();
            }

			if (res.verb === "destroyed") {
				$scope.items.forEach(function(item, i) {
					if (item.id === parseInt(res.id)) {
						$scope.items.splice(i, 1);
						$scope.$apply();
					}
				});
			}

		});

		io.socket.get("/lessons", function() {});


};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.lessons.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "i18n", "permissions", "toasts", "lessons", "session", "subjects"];