/**
 *
 * @param $scope
 * @param $rootScope
 * @param permissions
 * @param i18n
 * @param toasts
 * @param api
 */
controllers.abstract.router = function($scope, $rootScope, permissions, i18n, toasts, api) {

	var settings = {
		service: api.service,
		serviceMethod: api.serviceMethod,
		serviceId: api.serviceId,
		name: api.name,
		fields: api.fields.edit,
		types: api.types,
		id: api.id
	};

	if (api.id || api.action === "create") {

		if (controllers.abstract[api.action]) {

			if (api.action === "create") {
				settings.fields = api.fields.create;
			}

			controllers.abstract[api.action]($scope, $rootScope, permissions, i18n, toasts, settings);

		} else {
			// TODO redirect and throw BAD_REQUEST flash message
		}

	} else {

		settings.fields = api.fields.list;

		// simply list the items
		controllers.abstract.list($scope, $rootScope, permissions, i18n, settings);
	}

};