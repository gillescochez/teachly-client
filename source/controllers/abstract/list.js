/**
 * Abstract list controller used as base for list view controllers.
 *
 * @depends service.permissions
 * @depends service.i18n
 *
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param settings {{service: Object, name: String, fields: String[]}} Database service for the given list
 *
 * @example
 *
 * // myService must provide a getAll method
 * function myListCtrl($scope, permissions, i18n, myService) {
 *
 * 		controllers.list($scope, permissions, i18n, {
 * 			service: myService,
 * 			name: "articles"
 *			fields: ["subject", "author"]
 * 		});
 *
 * }
 *
 * myListCtrl.$inject = ["$scope", "permissions", "i18n", "myService"];
 */
controllers.abstract.list = function($scope, $rootScope, permissions, i18n, settings) {

	controllers.abstract.init($scope, permissions, i18n, settings);

	$scope.headers.push(i18n.fetch("actions"));

	// query the list from the service provided
	settings.service[settings.serviceMethod || "getAll"](settings.serviceId)
		.success(function(items) {
			$scope.items = items;
			$rootScope.$broadcast("breadcrumb:add", {
				label: settings.name
			});
		})
		.error(function(err) {
			console.error(err);
		});
};