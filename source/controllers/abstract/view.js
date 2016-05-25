/**
 * Abstract view controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param toasts {Object} i18n service
 * @param settings {Object} configuration
 */
controllers.abstract.view = function($scope, $rootScope, permissions, i18n, toasts, settings) {

	controllers.abstract.init($scope, permissions, i18n, settings);

	// query the item from the server
	settings.service.getById(settings.id).success(function(item) {
		$scope.item = item;
		$rootScope.$broadcast("breadcrumb:add", {
			label: settings.name,
			path: '/' + settings.name
		});
		$rootScope.$broadcast("breadcrumb:add", {
			label: item.title || item.name || item.username
		});
	}).error(function(err) {
		console.log(err);
	});

};