/**
 * Login service
 * @param restful {Object} restful service instance
 */
services.activities = function(restful) {

	return angular.extend(services.abstract.api(restful, "activities"));
};

/**
 * Dependencies
 * @type {string[]}
 */
services.activities.$inject = ["restful"];