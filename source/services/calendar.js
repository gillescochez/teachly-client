services.calendar = function(restful, session) {

	return {

		query: function() {
			var user_type = parseInt(session.getUserType());

			if (user_type === 3) {
				return restful.query("/calendar/student?student_id=" + session.getId());
			}

			if (user_type === 2) {
				return restful.query("/calendar/teacher?user_id=" + session.getId());
			}

			if (user_type === 1) {

				return restful.query("/calendar/school?user_id=" + session.getId());
			}



		}

	};
};

services.calendar.$inject = ["restful", "session"];