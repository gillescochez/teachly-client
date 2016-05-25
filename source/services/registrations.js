/**
 * registrations service
 * @param restful {Object} restful service instance
 * @param session {Object} session service instance
 */
services.registrations = function(restful, session) {

	return angular.extend(services.abstract.api(restful, "registrations"), {

		add: function (params) {
			params.student_id = session.getId();
			return restful.query("/registrations/create", params);
		}
	});
};

services.registrations.$inject = ["restful", "session"];