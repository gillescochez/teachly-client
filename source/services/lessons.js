/**
 * Login service
 * @param restful {Object} restful service instance
 * @param session {Object} session service instance
 */
services.lessons = function(restful, session) {

	return angular.extend(services.abstract.api(restful, "lessons"), {

		add: function(params) {
			params.user_id = session.getId();
			return restful.query("/lessons/create", params);
		},

		single: function(id) {

			return restful.query("/lesson/" + id, {
				user_type: session.getUserType(),
				user_id: session.getId()
			});
		},

		save: function(id, params) {
			params.user_id = session.getId();
			return restful.query("/lessons/update/" + id, params);
		},

        register: function(params) {
            return restful.query("/registrations/create", params);
        },

		getAll: function() {

			// teachers can only see their own questions
			if (session.getUserType() == 2) {
				return restful.query("/lessons", {
                    user_type: session.getUserType(),
					user_id: session.getId()
				});
			} else {
				return restful.query("/lessons", {
                    user_type: session.getUserType(),
                    user_id: session.getId()
                });
			}
		},

        initialize: function(id) {
            return this.save(id, {
                initialized: true,
                id: id
            });
        },

        start: function(id) {
            return this.save(id, {
                started: true,
                id: id
            });
        }
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
services.lessons.$inject = ["restful", "session"];