/**
 * Abstract view controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param toasts {Object} toasts service
 * @param settings {Object} configuration
 */
controllers.abstract.remove = function($scope, $rootScope, permissions, i18n, toasts, settings) {

	controllers.abstract.init($scope, permissions, i18n, settings);

	/**
	 * Confirmation settings
	 * @type {{message: *, accept: *, refuse: *, yes: yes, no: no}}
	 */
	$scope.confirmation = {
		message: i18n.fetch(settings.name + "_confirm_remove"),
		accept: i18n.fetch(settings.name + "_accept_remove"),
		refuse: i18n.fetch(settings.name + "_refuse_remove"),
		yes: function() {
			settings.service.remove(settings.id).success(function() {
				toasts.success(i18n.fetch(settings.name + "_remove_success"));
				history.go(-1);
			}).error(function() {
				toasts.error(i18n.fetch(settings.name + "_remove_error"));
			});
		},
		no: function() {
			history.go(-1);
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
			label: "Remove " + (item.title || item.name || item.username)
		});
	}).error(function(err) {
		console.log(err);
	});

};