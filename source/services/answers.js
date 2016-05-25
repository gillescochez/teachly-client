/**
 * Login service
 * @param restful {Object} restful service instance
 */
services.answers = function(restful) {

	return angular.extend(services.abstract.api(restful, "answers"), {

		getForQuestion: function(id) {

			return restful.query("/answers", {
				question_id: id
			});
		}
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
services.answers.$inject = ["restful"];