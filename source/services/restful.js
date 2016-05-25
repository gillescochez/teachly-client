/**
 * Sails service which help communication with the sails back end
 * @param $http {Object} Angular http object
 * @returns {{query: query}}
 */
services.restful = function($http) {

    var domain = config.app.getServerUrl();

    /**
     * Query the sails server
     * @param path {String}
     * @param attributes {Object}
     */
    function query(path, attributes) {

		return $http({
			url: domain + path,
			params: attributes,
			method: "GET",
			widthCredentials: true
		});
    }

    return {

        query: query

    };

};

/**
 * Dependencies
 * @type {string[]}
 */
services.restful.$inject = ["$http"];