/**
 * News controller
 * @param $scope
 * @param $rootScope
 * @param $location
 * @param $routeParams
 * @param subjects
 * @param permissions
 * @param i18n
 * @param toasts
 */
controllers.subjects = function($scope, $rootScope, $location, $routeParams, subjects, permissions, i18n, toasts) {

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "subjects",
		service: subjects,
		id: $routeParams.id,
		action: controllers.abstract.getAction($location.path()),
		fields: {
			edit: ["title", "description"],
			create: ["title", "description"],
			list: ["title", "description"]
		},
		types: {
			description: {
				value: "textarea"
			}
		}
	});

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.subjects.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "subjects", "permissions", "i18n", "toasts"];