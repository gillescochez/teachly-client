/**
 * Common initialization between abstract controllers
 * @param $scope
 * @param permissions
 * @param i18n
 * @param settings
 */
controllers.abstract.init = function($scope, permissions, i18n, settings) {

	/**
	 * id for the requested item
	 * @type {{Array}|*}
	 */
	$scope.id = settings.id;

	/**
	 * Fields which are going to be displayed in the view
	 * @type {{Array}|*}
	 */
	$scope.fields = settings.fields;

	/**
	 * Path used as based for creating action links
	 * @type {string}
	 */
	$scope.path = "#/" + settings.name;

	/**
	 * Hold the item data when received from the server
	 * @type {{}}
	 */
	$scope.item = {};

	/**
	 * Hold the item data when received from the server
	 * @type {Array}
	 */
	$scope.items = [];

	/**
	 * Allowed actions map
	 * @type {{}}
	 */
	$scope.actions = {};

	/**
	 * Headers to display, automatically generated based on fields and allowed actions
	 * @type {Array}
	 */
	$scope.headers = [];

	/**
	 * Types used to convert thing like multi choice integers into labels
	 */
	$scope.types = settings.types;

	// generate headers
	$scope.fields.forEach(function(field) {
		$scope.headers.push(i18n.fetch(field));
		$scope.item[field] = "";
	});

	// grab the actions available for the user
	permissions.getAllowedActions(settings.name).forEach(function(action) {
		$scope.actions[action] = {
			label: i18n.fetch(settings.name + "_" + action)
		};
	});

};