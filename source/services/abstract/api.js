/**
 * Abstract API class which provides default API hookup
 * @param restful {Object} Restful service
 * @param path {String}
 * @returns {{getAll: getAll, getById: getById, save: save, remove: remove}}
 */
services.abstract.api = function(restful, path) {

	return {

        raw: function(query) {
            return restful.query(query);
        },

		getAll: function() {
			return restful.query("/" + path);
		},

		getById: function(id) {
			return restful.query("/" + path + "/" + id);
		},

		add: function(params) {
			return restful.query("/" + path + "/create", params);
		},

		save: function(id, params) {
			return restful.query("/" + path + "/update/" + id, params);
		},

        remove: function(id) {
            return restful.query("/" + path + "/destroy/" + id);
        },

        getOverview: function(id) {
            return restful.query("/" + path + "/overview" + (id ? "?id=" + id : ""));
        }
	};
};