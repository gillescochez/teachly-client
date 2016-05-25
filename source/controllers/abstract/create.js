/**
 * Abstract edit controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param toasts {Object} i18n service
 * @param settings {Object} configuration
 */
controllers.abstract.create = function($scope, $rootScope, permissions, i18n, toasts, settings) {

	controllers.abstract.init($scope, permissions, i18n, settings);

	$rootScope.$broadcast("breadcrumb:add", {
		label: settings.name,
		path: '/' + settings.name
	});
	$rootScope.$broadcast("breadcrumb:add", {
		label: "Add"
	});

	/**
	 * Save action
	 */
	$scope.save = {

		label: i18n.fetch("create"),

		handler: function() {

			settings.service.add($scope.item).success(function() {
				toasts.success(i18n.fetch(settings.name + "_create_success"));
				history.go(-1);
			}).error(function() {
				toasts.error(i18n.fetch(settings.name + "_create_error"));
			});

		}
	};

	delete $scope.actions["remove"];

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