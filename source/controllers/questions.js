/**
 * Questions controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location
 * @param i18n {Object} i18n service
 * @param permissions {Object} permissions service
 * @param toasts {Object} toasts service
 * @param questions {Object} questions service
 */
controllers.questions = function($scope, $rootScope, $location, $routeParams, i18n, permissions, toasts, questions) {

	var action = controllers.abstract.getAction($location.path());

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "questions",
		service: questions,
		serviceMethod: $routeParams.lesson_id ? "getForLesson" : null,
		serviceId: $routeParams.lesson_id ? $routeParams.lesson_id : null,
		id: $routeParams.id,
		action: action,
		fields: {
			edit: ["question", "lesson_id"],
			create: ["question", "lesson_id"],
			list: ["question"]
		}
	});

	// filtered by lesson?
	if ($routeParams.lesson_id) {

		$scope.filter = "/" + $routeParams.lesson_id;

		if (action === "create" || action === "edit") {
			$scope.item.lesson_id = $routeParams.lesson_id;
			$scope.hiddenFields = {
				lesson_id: $routeParams.lesson_id
			}
		}
	}

	if (permissions.can("view", "answers")) {
		$scope.actions.extra = {
			getUrl: function(id) {
				return "/answers/list/" + id;
			},
			label: "View answers"
		}
	}
};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.questions.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "i18n", "permissions", "toasts", "questions"];