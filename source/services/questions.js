/**
 * Login service
 * @param restful {Object} restful service instance
 */
services.questions = function(restful) {

	return angular.extend(services.abstract.api(restful, "questions"), {

		getForLesson: function(lesson_id) {

			return restful.query("/questions", {
				lesson_id: lesson_id
			});
		}
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
services.questions.$inject = ["restful"];