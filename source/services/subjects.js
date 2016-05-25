/**
 * News service
 * @param restful {Object} restful service instance
 */
services.subjects = function(restful) {
	return services.abstract.api(restful, "subjects");
};

/**
 * Dependencies
 * @type {string[]}
 */
services.subjects.$inject = ["restful"];