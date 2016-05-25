/**
 * Answers controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location
 * @param i18n {Object} i18n service
 * @param permissions {Object} permissions service
 * @param toasts {Object} toasts service
 * @param answers {Object} answers service
 */
controllers.answers = function($scope, $rootScope, $location, $routeParams, i18n, permissions, toasts, answers) {

	var action = controllers.abstract.getAction($location.path());

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "answers",
		service: answers,
		serviceMethod: $routeParams.question_id ? "getForQuestion" : null,
		serviceId: $routeParams.question_id ? $routeParams.question_id : null,
		id: $routeParams.id,
		action: action,
		fields: {
			edit: ["answer", "question_id", "is_valid"],
			create: ["answer", "question_id", "is_valid"],
			list: ["answer"]
		},
        types: {
            is_valid: {
                value: "checkbox"
            }
        }
	});

	// filtered by question?
	if ($routeParams.question_id) {

		$scope.filter = "/" + $routeParams.question_id;

		if (action === "create" || action === "edit") {
			$scope.item.question_id = $routeParams.question_id;
			$scope.hiddenFields = {
				question_id: $routeParams.question_id
			}
		}
	}

};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.answers.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "i18n", "permissions", "toasts", "answers"];