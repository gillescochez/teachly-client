services.events = function(restful, session) {
	return angular.extend(services.abstract.api(restful, "events"), {
		getForUser: function() {
			return restful.query("/events?user_id=" + session.getId())
		}
	});
};

services.events.$inject = ["restful", "session"];