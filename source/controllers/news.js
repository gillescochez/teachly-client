/**
 * News controller
 * @param $scope
 * @param $rootScope
 * @param $location
 * @param $routeParams
 * @param news
 * @param permissions
 * @param i18n
 * @param toasts
 * @param subjects
 * @param lessons
 */
controllers.news = function($scope, $rootScope, $location, $routeParams, news, permissions, i18n, toasts, subjects, lessons) {

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "news",
		service: news,
		id: $routeParams.id,
		action: controllers.abstract.getAction($location.path()),
		fields: {
			edit: ["title", "message", "subject_id", "user_type", "lesson_id"],
			create: ["title", "message", "subject_id", "user_type", "lesson_id"],
			list: ["title", "updatedAt"]
		},
		types: {
			message: {
				value: "textarea"
			},
			subject_id: {
				value: 'select',
				provider: subjects
			},
			lesson_id: {
				value: 'select',
				provider: lessons
			},
			user_type: {
				value: "select",
				options: {
					"1": i18n.fetch("school"),
					"2": i18n.fetch("teacher"),
					"3": i18n.fetch("student")
				}
			}
		}
	});

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.news.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "news", "permissions", "i18n", "toasts", "subjects", "lessons"];