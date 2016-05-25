/**
 * News service
 * @param restful {Object} restful service instance
 * @param session {Object} session service instance
 */
services.news = function(restful, session) {

	return angular.extend(services.abstract.api(restful, "news"), {

		add: function(params) {
			params.user_id = session.getId();
			return restful.query("/news/create", params);
		},

		getForActivity: function(id) {

			return restful.query("/news", {
				activity_id: id
			});
		},

		getForLesson: function(id) {

			return restful.query("/news", {
				lesson_id: id
			});
		}
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
services.news.$inject = ["restful", "session"];