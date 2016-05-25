/**
 * Answers controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location
 * @param i18n {Object} i18n service
 * @param permissions {Object} permissions service
 * @param toasts {Object} toasts service
 * @param activities {Object} activities service
 * @param registrations {Object} registrations service
 */
controllers.activities = function($scope, $rootScope, $location, $routeParams, i18n, permissions, toasts, activities, registrations) {

	var action = controllers.abstract.getAction($location.path());

	controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
		name: "activities",
		service: activities,
		serviceMethod: $routeParams.id ? "getForQuestion" : null,
		serviceId: $routeParams.id ? $routeParams.id : null,
		id: $routeParams.id,
		action: action,
		fields: {
			edit: ["name", "description", "days", "times"],
			create: ["name", "description", "days", "times"],
			list: ["name", "description", "days", "times"]
		},
		types: {
			days: {
				value: "days"
			},
			times: {
				value: "time"
			}
		}
	});

	$scope.register = function(activity) {
		registrations.add({activity_id: activity.id}).success(function() {
			toasts.success("Activity added to the calendar");
			activity.registered = true;
		}).error(function() {
			toasts.error("Failed to add activity to the calendar");
		});
	};

};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.activities.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "i18n", "permissions", "toasts", "activities", "registrations"];