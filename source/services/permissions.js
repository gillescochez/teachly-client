/**
 * Permissions service
 * @param session {Object} session service
 */
services.permissions = function(session) {

    /**
     * user types and their DB value
     * @type {}
     */
    var types = {
        "1": "school",
        "2": "teacher",
        "3": "student"
    };

    var rules = {
        school: {
            users: ["add", "edit", "remove", "view"],
            activities: ["add", "edit", "remove", "view"],
            subjects: ["add", "edit", "remove", "view"],
            news: ["add", "edit", "remove", "view"],
            lessons: ["view"],
            questions: ["view"],
            answers: ["view"],
            logs: ["view"]
        },
        teacher: {
            lessons: ["add", "edit", "remove", "view", "start", "results"],
	        activities: ["view"],
            news: ["view"],
            questions: ["add", "edit", "remove", "view"],
            answers: ["add", "edit", "remove", "view"]
        },
        student: {
            lessons: ["view", "join", "results"],
            news: ["view"],
	        activities: ["view", "register"]
        }
    };

    return {

        /**
         * Return the configuration map of rules for the session user_type
         * @returns {Object} Rule object or an empty object is no rules is found
         */
        getAllowedSections: function() {
            return rules[types[session.getUserType()]] || {};
        },

		/**
		 * Return an array of action allowed on a specific section for the current use
		 * @param section
		 */
		getAllowedActions: function(section) {

			var allowed = rules[types[session.getUserType()]];

			if (!allowed || !allowed[section]) {
				return [];
			} else {
				return allowed[section] || [];
			}
		},

		/**
		 * utility to check if a user can do a specific action to a section
		 * @param action {String}
		 * @param section {String}
		 * @returns {Boolean}
		 */
		can: function(action, section) {

			var can = false;
			var allowed = rules[types[session.getUserType()]];

			if (allowed[section]) {
				can = allowed[section].indexOf(action) !== -1;
			}

			return can;
		}
    };

};

/**
 *
 * @type {string[]}
 */
services.permissions.$inject = ["session"];