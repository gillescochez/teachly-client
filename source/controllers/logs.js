/**
 * Questions controller
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param $routeParams {Object} angular route parameters
 * @param $location {Object} angular location
 * @param i18n {Object} i18n service
 * @param permissions {Object} permissions service
 * @param toasts {Object} toasts service
 * @param logs {Object} questions service
 */
controllers.logs = function($scope, $rootScope, $location, $routeParams, i18n, permissions, toasts, logs) {

    controllers.abstract.router($scope, $rootScope, permissions, i18n, toasts, {
        name: "logs",
        service: logs,
        id: $routeParams.id,
        action: [],
        fields: {
            list: ["name", "user_type", "event", "lesson"]
        }
    });
};

/**
 * Dependencies
 * @type {String[]}
 */
controllers.logs.$inject = ["$scope", "$rootScope", "$location", "$routeParams", "i18n", "permissions", "toasts", "logs"];