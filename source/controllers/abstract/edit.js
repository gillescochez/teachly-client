/**
 * Abstract edit controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param toasts {Object} toasts service
 * @param settings {Object} configuration
 */
controllers.abstract.edit = function($scope, $rootScope, permissions, i18n, toasts, settings) {

	controllers.abstract.init($scope, permissions, i18n, settings);

	/**
	 * Save action
	 */
	$scope.save = {

		label: i18n.fetch("save"),

		handler: function() {

			settings.service.save(settings.id, $scope.item).success(function() {
				toasts.success(i18n.fetch(settings.name + "_edit_success"));
				history.go(-1);
			}).error(function() {
				toasts.error(i18n.fetch(settings.name + "_edit_error"));
			});

		}
	};

	// query the item from the server
	settings.service.getById(settings.id).success(function(item) {
		$scope.item = item;
		$rootScope.$broadcast("breadcrumb:add", {
			label: settings.name,
			path: '/' + settings.name
		});
		$rootScope.$broadcast("breadcrumb:add", {
			label: "Edit " + (item.title || item.name || item.username)
		});
	}).error(function(err) {
		console.log(err);
	});

	if ($scope.types) {
		processTypes($scope.types);
	}

	function processTypes(types) {

		var key;

		for (key in types) {
			if (types[key].value === 'select' && types[key].provider) {
				loadSelectOptions(types[key], key);
			}
		}
	}

	function loadSelectOptions(type, key) {
		type.provider.getAll().success(function(items) {
			$scope.types[key].options = convertToOption(items);
		}).error(console.error);
	}

	function convertToOption(items) {

		var res = {};

		items.forEach(function(item, i) {
			res[item.id] = item.title || item.name || 'not found';
		});

		return res;
	}

};